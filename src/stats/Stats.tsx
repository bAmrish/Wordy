import classes from './Stats.module.css';
import { useAppSelector } from '../game/store/store.hooks';
import GuessDistributionBar from './guess-distribution/GuessDistributionBar';
import PlayStatistics from './play-statistics/PlayStatistics';
import PageClose from '../settings/close/PageClose';

const Stats = () => {
  const games = useAppSelector(state => state.games.games);

  return (
    <div className={classes.stats}>
      <PageClose />
      <PlayStatistics games={games} />
      <GuessDistributionBar games={games} />
    </div>
  );
};

export default Stats;
