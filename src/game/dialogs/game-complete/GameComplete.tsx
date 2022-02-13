import classes from './GameComplete.module.css';
import TileModel from '../../models/tile.model';
import GameModel from '../../models/game.model';
import { useAppSelector } from '../../store/store.hooks';

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

const GameComplete = () => {
  const game = useAppSelector(state => state.games.currentGame);
  let content = <></>;
  if (game) {
    const answer = getAnswerTile(game.answer);
    const guessNode = getGuessNodes(game);

    share(getGuessString(game));

    content = (
      <div className={classes['success-message-container']}>
        <div className={classes['message-row']}>
          <span className={'material-icons-outlined ' + classes.icon}>
            celebration
          </span>
          &nbsp; Congratulations!
        </div>
        <div className={classes['message-row']}>
          You guessed the word correctly!
        </div>
        <div className={classes.answer}>{answer}</div>
        <div className={classes.replay}>{guessNode}</div>
        <div className={classes['actions']}>
          <button className={'text'}>Share Result</button>
          <button>Start A New Game!</button>
        </div>
      </div>
    );
  }
  return content;
};

export default GameComplete;
