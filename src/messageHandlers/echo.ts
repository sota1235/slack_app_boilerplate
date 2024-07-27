import type { App } from "@slack/bolt";
import type { MessageHandler } from "./index";

export const registerEchoHandler: MessageHandler = (app: App) => {
  app.message(/echo (.*)/i, async ({ say, context }) => {
    await say(context.matches[1]);
  });

  return {
    command: "echo",
    description: "echo command",
  };
};
