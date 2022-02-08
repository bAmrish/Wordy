import classes from './PlayStatistics.module.css';
import GameModel from '../../game/models/game.model';
import { FC } from 'react';

const PlayStatistics: FC<{ games: GameModel[] }> = props => {
  const games = props.games.filter(game => game.status !== 'PLAYING');

  const played = games.length;
  const won = games.filter(game => game.status === 'WON').length;
  const lost = games.filter(game => game.status === 'LOST').length;
  const percentWon = played > 0 ? (won * 100) / played : 0;

  return (
    <div className={classes['play-statistics']}>
      <div className={classes['title']}>Play Statistics</div>
      <div className={classes['cards']}>
        <Card value={played} title="played" />
        <Card value={won} title="won" className={classes.won} />
        <Card value={lost} title="lost" className={classes.lost} />
        <Card value={percentWon.toFixed(2) + ' %'} title="% Won" />
      </div>
    </div>
  );
};

const Card: FC<{
  title: string;
  value: number | string;
  className?: string;
}> = props => {
  const { title, value, className } = props;
  let cardValueClass = classes['card-value'];
  if (className) {
    cardValueClass += ' ' + className;
  }

  return (
    <div className={classes['card']}>
      <div className={cardValueClass}>{value}</div>
      <div className={classes['card-title']}>{title.toUpperCase()}</div>
    </div>
  );
};

export default PlayStatistics;
