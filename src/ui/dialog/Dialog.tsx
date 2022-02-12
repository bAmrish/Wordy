import classes from './Dialog.module.css';
import { CSSTransition } from 'react-transition-group';
import { useEffect, useState } from 'react';
import { useAppSelector } from '../../game/store/store.hooks';

const SuccessMessage = () => {
  const game = useAppSelector(state => state.games.currentGame);
  let content = <></>;
  if (game) {
    const answer = game.answer.split('').map((l, i) => (
      <div key={i} className={classes['answer-tile']}>
        {l}
      </div>
    ));
    content = (
      <div className={classes['success-message-container']}>
        <div className={classes['message-row']}>
          <span className={'material-icons-outlined ' + classes.icon}>
            celebration
          </span>
          &nbsp; Congratulations!
        </div>
        <div className={classes['message-row']}>You guessed it word!</div>
        <div className={classes.answer}>{answer}</div>
      </div>
    );
  }
  return content;
};

const Dialog = () => {
  const show = true;
  const [animate, setAnimate] = useState(false);
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
          <div className={classes['dialog-title']}>You Win!</div>
          <div className={classes['dialog-content']}>
            <SuccessMessage />
          </div>
          <div className={classes['dialog-actions']}>
            <button>Start A New Game!</button>
          </div>
        </div>
      </CSSTransition>
    </>
  );
  return show ? mainContent : <> </>;
};

export default Dialog;
