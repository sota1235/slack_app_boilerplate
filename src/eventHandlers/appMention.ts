import { EventHandler } from "./index";
import { App } from "@slack/bolt";

export const registerAppMentionEventHandlers: EventHandler = (app: App) => {
  app.event<"app_mention">("app_mention", async () => {
    // TODO: impl
  });
};
