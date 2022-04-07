import { App } from "@slack/bolt";

export type ViewHandler = (app: App) => void;

const viewHandlers: ViewHandler[] = [];

export const registerViewHandlers = (app: App) => {
  for (const handler of viewHandlers) {
    handler(app);
  }
};
