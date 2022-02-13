import classes from './GameComplete.module.css';
import TileModel from '../../models/tile.model';
import GameModel, { GameStatus } from '../../models/game.model';
import { useAppDispatch, useAppSelector } from '../../store/store.hooks';
import gamesActions from '../../store/games/games.actions';

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

const share = (text: string) => {
  window.navigator.clipboard
    .writeText(text)
    .then(r => {
      console.log('Copied successfully to clipboard');
      console.log({ r });
    })
    .catch(e => {
      console.log('Failed to copy to clipboard!');
      console.log({ e });
    });
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
    .map(row => {
      return (
        <div className={classes.row}>
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

const GameComplete = () => {
  const game = useAppSelector(state => state.games.currentGame);
  const dispatch = useAppDispatch();
  if (!game) {
    return <></>;
  }

  const newGameHandler = () => {
    dispatch(gamesActions.newGame());
  };
  const answer = getAnswerTile(game.answer);
  const guessNode = getGuessNodes(game);
  const message = getMessage(game.status);
  const classNames = [classes['message-container']];

  if (game.status === 'WON') {
    classNames.push(classes.won);
    share(getGuessString(game));
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
      <div className={classes['actions']}>
        {game.status === 'WON' && (
          <button className={'text'}>Share Result</button>
        )}
        <button onClick={newGameHandler}>Start A New Game!</button>
      </div>
    </div>
  );
};

export default GameComplete;
