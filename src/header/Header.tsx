import classes from './Header.module.css';
import HeaderStats from '../assets/stats/HeaderStats';

const Header = () => {
  // console.log(`[Rendering Header Component]`);

  return (
    <header className={classes['header']}>
      <h1 className={classes.title}>Wordy</h1>
      <HeaderStats />
    </header>
  );
};

export default Header;
