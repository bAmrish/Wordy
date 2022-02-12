import classes from './Keyboard.module.css';
import { FC, memo } from 'react';
import { StatusType } from '../models/tile.model';
import { useAppSelector } from '../store/store.hooks';

class KeyModel {
  value: string;
  text: string;
  className?: string | null = null;
  status?: StatusType | null = null;

  constructor(
    value: string,
    text?: string | null,
    className?: string | null,
    status?: StatusType | null
  ) {
    this.value = value;
    this.text = text ? text : value;
    this.className = className;
    this.status = status;
  }
}

class KeyboardRowModel {
  name: string;
  keys: KeyModel[];

  constructor(name: string, keys: KeyModel[]) {
    this.name = name;
    this.keys = keys;
  }
}

const topRow = new KeyboardRowModel('top-row', [
  new KeyModel('q', 'q'),
  new KeyModel('w', 'w'),
  new KeyModel('e', 'e'),
  new KeyModel('r', 'r'),
  new KeyModel('t', 't'),
  new KeyModel('y', 'y'),
  new KeyModel('u', 'u'),
  new KeyModel('i', 'i'),
  new KeyModel('o', 'o'),
  new KeyModel('p', 'p'),
]);
const middleRow = new KeyboardRowModel('middle-row', [
  new KeyModel('a', 'a'),
  new KeyModel('s', 's'),
  new KeyModel('d', 'd'),
  new KeyModel('f', 'f'),
  new KeyModel('g', 'g'),
  new KeyModel('h', 'h'),
  new KeyModel('j', 'j'),
  new KeyModel('k', 'k'),
  new KeyModel('l', 'l'),
]);
const bottomRowEnterRight = new KeyboardRowModel('bottom-row', [
  new KeyModel('Backspace', '\u21E6', 'backspace'),
  new KeyModel('z', 'z'),
  new KeyModel('x', 'x'),
  new KeyModel('c', 'c'),
  new KeyModel('v', 'v'),
  new KeyModel('b', 'b'),
  new KeyModel('n', 'n'),
  new KeyModel('m', 'm'),
  new KeyModel('Enter', 'ENTER', 'enter'),
]);
const bottomRowEnterLeft = new KeyboardRowModel('bottom-row', [
  new KeyModel('Enter', 'ENTER', 'enter'),
  new KeyModel('z', 'z'),
  new KeyModel('x', 'x'),
  new KeyModel('c', 'c'),
  new KeyModel('v', 'v'),
  new KeyModel('b', 'b'),
  new KeyModel('n', 'n'),
  new KeyModel('m', 'm'),
  new KeyModel('Backspace', '\u21E6', 'backspace'),
]);

const Keyboard: FC<{
  onKey: (key: string) => void;
  keyStatus: { [key: string]: StatusType };
}> = memo(props => {
  const keyHandler = (key: string) => {
    props.onKey(key);
  };

  const enterLeft = useAppSelector(state => state.ui.enterLeft);
  const bottomRow = enterLeft ? bottomRowEnterLeft : bottomRowEnterRight;

  topRow.keys.forEach(key => (key.status = props.keyStatus[key.value]));
  middleRow.keys.forEach(key => (key.status = props.keyStatus[key.value]));
  bottomRow.keys.forEach(key => (key.status = props.keyStatus[key.value]));
  return (
    <div className={classes.keyboard}>
      <Row row={topRow} onKey={keyHandler} />
      <Row row={middleRow} onKey={keyHandler} />
      <Row row={bottomRow} onKey={keyHandler} />
    </div>
  );
});

const Row: FC<{
  row: KeyboardRowModel;
  onKey: (key: string) => void;
}> = props => {
  const row = props.row;

  const keyHandler = (key: string) => {
    props.onKey(key);
  };

  const className = `${classes.row} ${classes[row.name]}`;
  const rowNodes = row.keys.map((key: KeyModel) => {
    const isBackspace = key.value === 'Backspace';
    return (
      <Key
        key={key.text}
        theKey={key}
        onKey={keyHandler}
        isBackspace={isBackspace}
      />
    );
  });
  return <div className={className}>{rowNodes}</div>;
};

const Key: FC<{
  theKey: KeyModel;
  onKey: (key: string) => void;
  isBackspace?: boolean;
}> = props => {
  const { className, text, value, status } = props.theKey;
  const isBackspace = props.isBackspace || false;
  let keyClasses = classes.key;

  if (className) {
    keyClasses += ' ' + classes[className];
  }

  if (status) {
    switch (status) {
      case 'CORRECT':
        keyClasses += ' ' + classes['success'];
        break;
      case 'WARN':
        keyClasses += ' ' + classes['warn'];
        break;
      case 'INCORRECT':
        keyClasses += ' ' + classes['incorrect'];
        break;
      default:
        console.log('In default');
        break;
    }
  }

  const keyHandler = () => {
    props.onKey(value);
  };
  return (
    <button className={keyClasses} onClick={keyHandler}>
      {!isBackspace ? (
        text.toUpperCase()
      ) : (
        <span className={'material-icons-sharp ' + classes.icon}>
          backspace
        </span>
      )}
    </button>
  );
};

export default Keyboard;
