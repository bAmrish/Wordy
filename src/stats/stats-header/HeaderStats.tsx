import classes from './stats.module.css';
import { Link } from 'react-router-dom';

const HeaderStats = () => {
  return (
    <div className={classes.stats}>
      <div>
        <Link to={'/stats'}>
          <span className="material-icons">leaderboard</span>
        </Link>
      </div>
    </div>
  );
};

export default HeaderStats;
