import classes from './Header.module.css';
import HeaderStats from '../assets/stats/HeaderStats';

const Header = () => {
  return (
    <header className={classes['header']}>
      <h1 className={classes.title}>Wordy</h1>
      <HeaderStats />
    </header>
  );
};

export default Header;
