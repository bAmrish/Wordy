import classes from './Game.module.css';
import { useCallback, useEffect } from 'react';
import Board from './board/Board';
import Message from './message/Message';
import Keyboard from './keyboard/Keyboard';
import { useAppDispatch, useAppSelector } from './store/store.hooks';
import gamesActions from './store/games/games.actions';
import { StatusType } from './models/tile.model';

const Game = () => {
  const game = useAppSelector(state => state.games.currentGame);
  const dispatch = useAppDispatch();
  const keyStatus: { [key: string]: StatusType } = {};

  const addChar = useCallback(
    (key: string) => {
      dispatch(gamesActions.addChar(key));
    },
    [dispatch]
  );

  const removeLastChar = useCallback(() => {
    dispatch(gamesActions.removeLastChar());
  }, [dispatch]);

  const checkAnswer = useCallback(() => {
    dispatch(gamesActions.checkAnswer());
  }, [dispatch]);

  const handleKey = useCallback(
    (key: string) => {
      const isAlpha = key.length === 1 && /[a-zA-Z]/i.test(key);
      const isBackspace = key === 'Backspace';
      const isEnter = key === 'Enter';

      if (game?.status === 'WON' || game?.status === 'LOST') {
        if (isEnter) {
          dispatch(gamesActions.newGame());
        }
        return;
      }

      if (isAlpha) {
        addChar(key);
      } else if (isBackspace) {
        removeLastChar();
      } else if (isEnter) {
        checkAnswer();
      }
    },
    [addChar, checkAnswer, game?.status, removeLastChar, dispatch]
  );

  useEffect(() => {
    dispatch(gamesActions.newGame());
  }, [dispatch]);

  useEffect(() => {
    const keydownListener = (event: KeyboardEvent) => {
      handleKey(event.key);
    };
    document.addEventListener('keydown', keydownListener);
    return () => {
      document.removeEventListener('keydown', keydownListener);
    };
  }, [handleKey]);

  if (game) {
    for (const row of game.rows) {
      if (row.status === 'UNSOLVED') {
        continue;
      }
      for (const tile of row.tiles) {
        const currentKeyStatus = keyStatus[tile.value];
        if (tile.status === 'CORRECT') {
          keyStatus[tile.value] = 'CORRECT';
        } else if (tile.status === 'WARN' && currentKeyStatus !== 'CORRECT') {
          keyStatus[tile.value] = 'WARN';
        } else if (
          tile.status === 'INCORRECT' &&
          currentKeyStatus !== 'CORRECT' &&
          currentKeyStatus !== 'WARN'
        ) {
          keyStatus[tile.value] = 'INCORRECT';
        }
      }
    }
  }

  let content;

  if (game) {
    content = (
      <>
        <div className={classes['board-container']}>
          <Board rows={game.rows} />
          <Message />
        </div>
        <Keyboard keyStatus={keyStatus} onKey={handleKey} />
      </>
    );
  } else {
    content = <div>Loading game. Please Wait...</div>;
  }

  return <div className={classes.game}> {content} </div>;
};

export default Game;
