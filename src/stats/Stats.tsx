import classes from './Stats.module.css';
import { useAppSelector } from '../game/store/store.hooks';
import GuessDistributionBar from './guess-distribution/GuessDistributionBar';
import PlayStatistics from './play-statistics/PlayStatistics';

const Stats = () => {
  const games = useAppSelector(state => state.games.games);

  return (
    <div className={classes.stats}>
      <PlayStatistics games={games} />
      <GuessDistributionBar games={games} />
    </div>
  );
};

export default Stats;
