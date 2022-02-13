import classes from './GameComplete.module.css';
import TileModel from '../../models/tile.model';
import GameModel, { GameStatus } from '../../models/game.model';
import { FC, useState } from 'react';

const SUCCESS = '🟩';
const WARN = '🟧';
const INCORRECT = '⬛';

const getSquare = (tile: TileModel) => {
  switch (tile.status) {
    case 'CORRECT':
      return SUCCESS;
    case 'WARN':
      return WARN;
    default:
      return INCORRECT;
  }
};

const getAnswerTile = (answer: string) => {
  return answer.split('').map((l, i) => (
    <div key={i} className={classes['answer-tile']}>
      {l}
    </div>
  ));
};

const getGuessString = (game: GameModel) => {
  return game.rows
    .filter(row => row.status !== 'DISABLED')
    .reduce((acc, row) => {
      return (
        acc +
        row.tiles.reduce((a, tile) => {
          return a + getSquare(tile);
        }, '') +
        '\n'
      );
    }, '');
};

const getGuessNodes = (game: GameModel) => {
  return game.rows
    .filter(row => row.status !== 'DISABLED')
    .map((row, ri) => {
      return (
        <div className={classes.row} key={ri}>
          <span>{row.tiles.map(tile => getSquare(tile))}</span>
          <br />
        </div>
      );
    });
};

const getMessage = (type: GameStatus): JSX.Element => {
  switch (type) {
    case 'WON':
      return (
        <>
          <span className={'material-icons-outlined ' + classes.icon}>
            celebration
          </span>
          &nbsp;Congratulations! You guessed the word correctly!
        </>
      );
    case 'LOST':
      return (
        <>
          <span className={'material-icons-outlined ' + classes.icon}>
            mood_bad
          </span>
          &nbsp; Sorry! The word was
        </>
      );
    default:
      return <></>;
  }
};

const GameComplete: FC<{ game: GameModel; onNewGame: () => void }> = props => {
  const game = props.game;
  const [notifyMessage, setNotifyMessage] = useState<string | null>();

  const newGameHandler = () => {
    props.onNewGame();
  };
  const answer = getAnswerTile(game.answer);
  const guessNode = getGuessNodes(game);
  const message = getMessage(game.status);
  const classNames = [classes['message-container']];

  const shareResultsHandler = async () => {
    const url = window.location.toString();
    const text = url + '\n\n' + getGuessString(game);
    let shared = false;
    const isFirefox = /firefox/i.test(navigator.userAgent);

    try {
      const canShare =
        navigator.canShare && navigator.canShare({ text }) && !isFirefox;
      if (canShare) {
        await navigator.share({
          title: 'Wordy Puzzle',
          text: `\n\n ${text}`,
        });
        setNotifyMessage('Results Shared.');
        shared = true;
      }
    } catch (error) {
      console.log(error);
    }
    if (!shared) {
      try {
        await window.navigator.clipboard.writeText(text);
        setNotifyMessage('Results Copied to Clipboard.');
      } catch (error) {
        setNotifyMessage(
          'Unable to share results. Your browser may not support it.'
        );
      }
    }
  };

  if (game.status === 'WON') {
    classNames.push(classes.won);
  }

  if (game.status === 'LOST') {
    classNames.push(classes.lost);
  }
  return (
    <div className={classNames.join(' ')}>
      <div className={classes['message-row']}>{message}</div>
      <div className={classes.answer}>{answer}</div>
      {game.status === 'WON' && (
        <div className={classes.replay}>{guessNode}</div>
      )}
      {notifyMessage && <div className={classes.message}>{notifyMessage}</div>}
      <div className={classes['actions']}>
        {game.status === 'WON' && (
          <button className={'text'} onClick={shareResultsHandler}>
            Share Result
          </button>
        )}
        <button onClick={newGameHandler}>Start A New Game!</button>
      </div>
    </div>
  );
};

export default GameComplete;
