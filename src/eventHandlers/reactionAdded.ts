import type { App } from "@slack/bolt";
import type { EventHandler } from "./index";
import reactionAddedHandlers from "./reactionAddedHandlers";

export const registerReactionAddedEventHandlers: EventHandler = (app: App) => {
  app.event<"reaction_added">("reaction_added", async (args) => {
    const { event } = args;
    const reactionName = event.reaction;

    for (const handler in reactionAddedHandlers) {
      if (handler === reactionName) {
        reactionAddedHandlers[handler](args);
      }
    }
  });
};
