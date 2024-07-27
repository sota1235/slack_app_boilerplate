import type { App } from "@slack/bolt";
import { registerAppMentionEventHandlers } from "./appMention";
import { registerReactionAddedEventHandlers } from "./reactionAdded";

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
