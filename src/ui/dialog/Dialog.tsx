import classes from './Dialog.module.css';
import { CSSTransition } from 'react-transition-group';
import { createContext, FC, useEffect, useState } from 'react';

type DialogType = {
  open: (content: JSX.Element, title: string) => void;
  close: () => void;
};

const Dialog = createContext<DialogType>({
  open: () => {},
  close: () => {},
});

export const DialogProvider: FC = props => {
  const [animate, setAnimate] = useState(false);
  const [show, setShow] = useState(false);
  const [content, setContent] = useState<JSX.Element | null>(null);
  const [title, setTitle] = useState('');

  useEffect(() => {
    setTimeout(() => {
      setAnimate(true);
    }, 300);
  });

  const open = (content: JSX.Element, title: string) => {
    setContent(content);
    setShow(true);
    setTitle(title);
  };

  const close = () => {
    setContent(null);
    setShow(false);
    setTitle('');
  };
  const closeIcon = (
    <span className={'material-icons-sharp ' + classes.icon}>clear</span>
  );

  const mainContent = (
    <>
      <div className={classes.backdrop} />
      <CSSTransition
        mountOnEnter
        in={animate}
        timeout={{ enter: 500 }}
        classNames={{ enter: classes['animation-enter'] }}
      >
        <div className={classes.dialog}>
          <div className={classes.close} onClick={close}>
            {closeIcon}
          </div>
          <div className={classes['dialog-title']}>{title}</div>
          <div className={classes['dialog-content']}>{content}</div>
        </div>
      </CSSTransition>
    </>
  );

  return (
    <Dialog.Provider value={{ open, close }}>
      {show && mainContent}
      {props.children}
    </Dialog.Provider>
  );
};

export default Dialog;
