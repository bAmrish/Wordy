import classes from './Dialog.module.css';
import { CSSTransition } from 'react-transition-group';
import { useEffect, useState } from 'react';
import GameComplete from '../../game/dialogs/game-complete/GameComplete';

const Dialog = () => {
  const [animate, setAnimate] = useState(false);
  const [show, setShow] = useState(true);
  const onClose = () => {
    setShow(false);
  };
  useEffect(() => {
    setTimeout(() => {
      setAnimate(true);
    }, 300);
  });
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
          <div className={classes.close} onClick={onClose}>
            <span className={'material-icons-sharp ' + classes.icon}>
              clear
            </span>
          </div>
          <div className={classes['dialog-title']}>You Win!</div>
          <div className={classes['dialog-content']}>
            <GameComplete />
          </div>
        </div>
      </CSSTransition>
    </>
  );
  return show ? mainContent : <> </>;
};

export default Dialog;
