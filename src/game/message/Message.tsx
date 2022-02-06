import classes from './Message.module.css';

import { useAppSelector } from '../store/store.hooks';
import { FC, memo } from 'react';

const Message: FC = memo(() => {
  const message = useAppSelector(state => state.ui.notification);

  let content;
  if (message) {
    const messageClass =
      message && `${classes.message} ${classes[message.type]}`;
    content = <div className={messageClass}>{message.text}</div>;
  } else {
    content = <></>;
  }
  return content;
});

export default Message;
