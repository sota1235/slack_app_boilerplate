import type { App } from "@slack/bolt";

export type CommandHandler = (app: App) => void;

const commandHandlers: CommandHandler[] = [];

export const registerCommandHandlers = (app: App) => {
  for (const handler of commandHandlers) {
    handler(app);
  }
};
