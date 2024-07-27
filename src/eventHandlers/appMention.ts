import type { App } from "@slack/bolt";
import type { EventHandler } from "./index";

export const registerAppMentionEventHandlers: EventHandler = (app: App) => {
  app.event<"app_mention">("app_mention", async () => {
    // TODO: impl
  });
};
