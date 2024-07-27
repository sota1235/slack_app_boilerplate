import { Severity } from "@sentry/node";
import { App, ExpressReceiver, LogLevel } from "@slack/bolt";
import type { ExtendedErrorHandlerArgs } from "@slack/bolt/dist/App";
import { registerActionHandlers } from "./actionHandlers";
import { registerCommandHandlers } from "./commandHandlers";
import { AppError } from "./errors/appError";
import { registerEventHandlers } from "./eventHandlers";
import { registerMessageHandlers } from "./messageHandlers";
import { captureException, initSentry } from "./sentry";
import { registerViewHandlers } from "./viewHandlers";

// eslint-disable-next-line @typescript-eslint/no-var-requires
require("source-map-support").install();

// Sentry initialization
initSentry();

// App initialization
const receiver = new ExpressReceiver({
  signingSecret: process.env.SLACK_SIGNING_SECRET as string,
});

const app = new App({
  receiver,
  token: process.env.SLACK_BOT_TOKEN,
  logLevel:
    process.env.NODE_ENV === "production" ? LogLevel.WARN : LogLevel.DEBUG,
  extendedErrorHandler: true,
});

app.error(
  async ({ error, logger, body, context }: ExtendedErrorHandlerArgs) => {
    logger.error(error);

    const sentryTags = {
      body: JSON.stringify(body),
      retryNum: context.retryNum,
      retryReason: context.retryReason,
    };
    if (error.original instanceof AppError) {
      captureException(error, {
        level: error.original.errorLevel,
        extra: error.original.getExtras(),
        tags: sentryTags,
      });
    } else {
      captureException(error, {
        level: Severity.Critical,
        tags: sentryTags,
      });
    }
  },
);

receiver.router.get("/liveness_check", (_, res) => {
  res.send("OK");
});

// Register message handlers
registerMessageHandlers(app);

// Register event handlers
registerEventHandlers(app);

// Register action handlers
registerActionHandlers(app);

// Register view handlers
registerViewHandlers(app);

// Register command handlers
registerCommandHandlers(app);

// Start
(async () => {
  const port = process.env.PORT ?? 3000;
  // Start the app
  await app.start(port as number);

  console.log(`⚡️ Bolt app is running! Port: ${port}`);

  try {
    await app.client.chat.postMessage({
      channel: "general",
      text: `[${process.env.NODE_ENV}]Botがデプロイされました`,
      token: process.env.SLACK_BOT_TOKEN,
      icon_emoji: ":wrench:",
    });
  } catch (e) {
    if (e instanceof Error) {
      captureException(e);
    } else {
      console.error(e);
      captureException(new Error("unknown error"));
    }
  }
})();
