import classes from "./Keyboard.module.css";

const topRow = {
  name: "top-row",
  keys: [
    { value: "q", text: "q" },
    { value: "w", text: "w" },
    { value: "e", text: "e" },
    { value: "r", text: "r" },
    { value: "t", text: "t" },
    { value: "y", text: "y" },
    { value: "u", text: "u" },
    { value: "i", text: "i" },
    { value: "o", text: "o" },
    { value: "p", text: "p" },
  ],
};
const middleRow = {
  name: "middle-row",
  keys: [
    { value: "a", text: "a" },
    { value: "s", text: "s" },
    { value: "d", text: "d" },
    { value: "f", text: "f" },
    { value: "g", text: "g" },
    { value: "h", text: "h" },
    { value: "j", text: "j" },
    { value: "k", text: "k" },
    { value: "l", text: "l" },
  ],
};
const bottomRow = {
  name: "bottom-row",
  keys: [
    { value: "Enter", text: "\u21B3", className: "enter" },
    { value: "z", text: "z" },
    { value: "x", text: "x" },
    { value: "c", text: "c" },
    { value: "v", text: "v" },
    { value: "b", text: "b" },
    { value: "n", text: "n" },
    { value: "m", text: "m" },
    { value: "Backspace", text: "\u21E6", className: "backspace" },
  ],
};

const Keyboard = (props) => {
  const keyHandler = (key) => {
    props.onKey(key);
  };

  return (
    <div className={classes.keyboard}>
      <Row keyStatus={props.keyStatus} row={topRow} onKey={keyHandler} />
      <Row keyStatus={props.keyStatus} row={middleRow} onKey={keyHandler} />
      <Row keyStatus={props.keyStatus} row={bottomRow} onKey={keyHandler} />
    </div>
  );
};

const Row = (props) => {
  const row = props.row;

  const keyHandler = (key) => {
    props.onKey(key);
  };

  const className = `${classes.row} ${classes[row.name]}`;
  const rowNodes = row.keys.map((key) => (
    <Key
      key={key.value}
      text={key.text}
      value={key.value}
      className={key.className}
      status={props.keyStatus[key.value.toUpperCase()]}
      onKey={keyHandler}
    />
  ));
  return <div className={className}>{rowNodes}</div>;
};

const Key = (props) => {
  let className = classes.key;

  if (props.className) {
    className += " " + classes[props.className];
  }

  if (props.status) {
    switch (props.status) {
      case "CORRECT":
        className += " " + classes["success"];
        break;
      case "WARN":
        className += " " + classes["warn"];
        break;
      case "INCORRECT":
        className += " " + classes["incorrect"];
        break;
      default:
        console.log("In default");
        break;
    }
  }

  const keyHandler = () => {
    props.onKey(props.value);
  };
  return (
    <button className={className} onClick={keyHandler}>
      {props.text.toUpperCase()}
    </button>
  );
};

export default Keyboard;
