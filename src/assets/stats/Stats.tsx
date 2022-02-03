import classes from './stats.module.css';
import { useAppSelector } from '../../game/store/store.hooks';

const Stats = () => {
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
        <div>Total Played: {totalGames}</div>
        <div>Total Won: {gameWon}</div>
        <div>Total Lost: {totalGames - gameWon}</div>
      </div>
    </div>
  );
};

export default Stats;
