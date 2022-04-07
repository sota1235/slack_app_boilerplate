import { ReactionAddedHandler } from "./index";

const checked: ReactionAddedHandler = () => {
  console.log("checked dispatched!");
};

export { checked };
