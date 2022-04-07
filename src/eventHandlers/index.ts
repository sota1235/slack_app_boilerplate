import { App } from "@slack/bolt";
import { registerReactionAddedEventHandlers } from "./reactionAdded";
import { registerAppMentionEventHandlers } from "./appMention";

export type EventHandler = (app: App) => void;

const eventHandlers: EventHandler[] = [
  registerReactionAddedEventHandlers,
  registerAppMentionEventHandlers,
];

export const registerEventHandlers = (app: App): void => {
  for (const handler of eventHandlers) {
    handler(app);
  }
};
