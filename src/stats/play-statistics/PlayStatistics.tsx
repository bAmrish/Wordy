import classes from './PlayStatistics.module.css';
import GameModel from '../../game/models/game.model';
import { FC } from 'react';

const PlayStatistics: FC<{ games: GameModel[] }> = props => {
  const games = props.games;

  const played = games.length;
  const won = games.filter(game => game.status === 'WON').length;
  const lost = games.filter(game => game.status === 'LOST').length;

  return (
    <div className={classes['play-statistics']}>
      <div className={classes['title']}>Play Statistics</div>
      <div className={classes['cards']}>
        <div className={classes['card']}>
          <div className={`${classes['card-value']}`}>{played}</div>
          <div className={classes['card-title']}>Played</div>
        </div>
        <div className={classes['card']}>
          <div className={`${classes['card-value']} ${classes['won']}`}>
            {won}
          </div>
          <div className={classes['card-title']}>Won</div>
        </div>
        <div className={classes['card']}>
          <div className={`${classes['card-value']} ${classes['lost']}`}>
            {lost}
          </div>
          <div className={classes['card-title']}>Lost</div>
        </div>
      </div>
    </div>
  );
};

export default PlayStatistics;
