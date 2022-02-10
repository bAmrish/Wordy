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
      <div className={classes['title']}>
        <span className="material-icons">leaderboard</span> &nbsp; Your Play
        Stats
      </div>
      <div className={classes['stats-row']}>
        <PlayStatistics games={games} />
      </div>
      <div className={classes['stats-row']}>
        <GuessDistributionBar games={games} />
      </div>
    </div>
  );
};

export default Stats;
