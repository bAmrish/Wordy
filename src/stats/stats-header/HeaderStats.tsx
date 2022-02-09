import classes from './stats.module.css';
import { useAppSelector } from '../../game/store/store.hooks';
import { Link } from 'react-router-dom';

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
        <Link to={'/stats'}>
          {gameWon} / {totalGames}
        </Link>
      </div>
    </div>
  );
};

export default HeaderStats;
