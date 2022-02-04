import classes from './stats.module.css';
import { useAppSelector } from '../../game/store/store.hooks';

const HeaderStats = () => {
  const totalGames = useAppSelector(
    state => state.games.games.filter(game => game.status !== 'PLAYING').length
  );
  const gameWon = useAppSelector(
    state => state.games.games.filter(game => game.status === 'WON').length
  );
  return (
    <div className={classes.stats}>
      <div>
        {gameWon} / {totalGames}
      </div>
      <div className={classes.tooltip}>
        <div className={classes['game-stats']}>
          <span className={classes['stats-label']}>Played :</span>
          <span className={classes['stats-value']}>{totalGames}</span>
        </div>
        <div className={classes['game-stats']}>
          <span className={classes['stats-label']}>Won :</span>
          <span className={classes['stats-value']}>{gameWon}</span>
        </div>
        <div className={classes['game-stats']}>
          <span className={classes['stats-label']}>Lost :</span>
          <span className={classes['stats-value']}>{totalGames - gameWon}</span>
        </div>
      </div>
    </div>
  );
};

export default HeaderStats;
