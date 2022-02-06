import classes from './Message.module.css';

import { useAppSelector } from '../store/store.hooks';

const Message = () => {
  const message = useAppSelector(state => state.ui.notification);
  // console.log(`[Rendering Message Component]`, message);

  let content;
  if (message) {
    const messageClass =
      message && `${classes.message} ${classes[message.type]}`;
    content = <div className={messageClass}>{message.text}</div>;
  } else {
    content = <></>;
  }
  return content;
};

export default Message;
