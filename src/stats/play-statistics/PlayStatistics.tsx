import classes from './PlayStatistics.module.css';
import GameModel from '../../game/models/game.model';
import { FC } from 'react';

const getLongestStreak = (allGames: GameModel[]): number => {
  const games = allGames.slice();
  let longestStreak = games.findIndex(game => game.status === 'LOST');

  if (longestStreak === -1) {
    return games.length;
  }

  while (games.length > 0) {
    const currentStreak = games.findIndex(game => game.status === 'LOST');
    if (currentStreak > longestStreak) {
      longestStreak = currentStreak;
    }

    if (currentStreak === -1) {
      if (games.length > longestStreak) {
        longestStreak = games.length;
      }
      break;
    }
    games.splice(0, currentStreak + 1);
  }

  return longestStreak;
};

const getCurrentStreak = (games: GameModel[]): number => {
  // Games are by default sorted by ascending order of created date.
  // If this assumption changes, change the reverse call to `sort` call.
  const currentStreak = games
    .slice()
    .reverse()
    .findIndex(game => game.status === 'LOST');
  if (currentStreak === -1) {
    return games.length;
  }
  return currentStreak;
};

const PlayStatistics: FC<{ games: GameModel[] }> = props => {
  const games = props.games.filter(game => game.status !== 'PLAYING');

  const played = games.length;
  const won = games.filter(game => game.status === 'WON').length;
  const lost = games.filter(game => game.status === 'LOST').length;
  const percentWon = played > 0 ? (won * 100) / played : 0;

  const longestStreak = getLongestStreak(games.slice());
  const currentStreak = getCurrentStreak(games.slice());

  return (
    <div className={classes['play-statistics']}>
      <div className={classes['cards']}>
        <Card value={played} title="Played" />
        <Card value={won} title="Won" className={classes.won} />
        <Card value={lost} title="Lost" className={classes.lost} />
        <Card value={percentWon.toFixed(2) + ' %'} title="% Won" />
      </div>
      <div className={classes['cards']}>
        <Card value={currentStreak} title="Current Streak" />
        <Card value={longestStreak} title="Longest Streak" />
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
      <div className={classes['card-title']}>{title}</div>
    </div>
  );
};

export default PlayStatistics;
