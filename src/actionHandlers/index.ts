import { App } from '@slack/bolt';

export type ActionHandler = (app: App) => void;

const actionHandlers: ActionHandler[] = [];

export const registerActionHandlers = (app: App) => {
  for (const handler of actionHandlers) {
    handler(app);
  }
};
