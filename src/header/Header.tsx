import classes from './Header.module.css';
import Stats from '../assets/stats/Stats';

const Header = () => {
  return (
    <header className={classes['header']}>
      <h1 className={classes.title}>Wordy</h1>
      <Stats />
    </header>
  );
};

export default Header;
