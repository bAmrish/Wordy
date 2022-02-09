import classes from './Header.module.css';
import HeaderStats from '../stats/stats-header/HeaderStats';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className={classes['header']}>
      <h1 className={classes.title}>
        <Link to={'/'}>Wordy</Link>
      </h1>
      <HeaderStats />
    </header>
  );
};

export default Header;
