/* eslint @typescript-eslint/naming-convention: 0 */
import { SlackEventMiddlewareArgs } from '@slack/bolt';
import { checked } from './checked';

export type ReactionAddedHandler = (
  args: SlackEventMiddlewareArgs<'reaction_added'>,
) => void;

const handlerMappings: Record<string, ReactionAddedHandler> = {
  white_check_mark: checked,
};

export default handlerMappings;
