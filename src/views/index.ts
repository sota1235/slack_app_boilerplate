import { MessageAttachment } from '@slack/types';

export interface View {
  blocks: any;
  // About: https://api.slack.com/messaging/composing/layouts#:~:text=When%20you%27re%20using,desired%20visible%20message.
  fallbackText: string;
}

export interface ViewWithAttachments extends View {
  attachments: MessageAttachment[];
}
