import classes from './Message.module.css';
import { FC } from 'react';
import MessageModel from '../models/message.model';

const Message: FC<{ message: MessageModel }> = props => {
  const message = props.message;
  const messageClass = message && `${classes.message} ${classes[message.type]}`;
  return <div className={messageClass}>{message.text}</div>;
};

export default Message;
