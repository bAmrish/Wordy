import classes from "./Message.module.css";

const Message = (props) => {
  const message = props.message;
  const messageClass = message && `${classes.message} ${classes[message.type]}`;
  return <div className={messageClass}>{message.text}</div>;
};

export default Message;
