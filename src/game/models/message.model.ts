export type MessageType = 'error' | 'warn' | 'success' | 'info';

class MessageModel {
  text: string;
  type: MessageType;

  constructor(text: string, type?: MessageType) {
    this.text = text;
    this.type = type || 'info';
  }
}

export default MessageModel;
