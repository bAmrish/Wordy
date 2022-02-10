import classes from './Header.module.css';
import HeaderStats from '../stats/stats-header/HeaderStats';
import { Link } from 'react-router-dom';
import { ThemeOption, uiActions } from '../game/store/ui/ui.store';
import { useAppDispatch } from '../game/store/store.hooks';

const Header = () => {
  const dispatch = useAppDispatch();

  const setTheme = (theme: ThemeOption) => {
    console.log(theme);
    dispatch(uiActions.setTheme(theme));
  };
  return (
    <header className={classes['header']}>
      <div className={classes['main-container']}>
        <h1 className={classes.title}>
          <Link to={'/'}>Wordy</Link>
        </h1>
        <div className={classes['actions']}>
          <div className={classes['theme-switcher']}>
            <button onClick={setTheme.bind(null, 'dark')}>Dark</button>
            <button onClick={setTheme.bind(null, 'light')}>Light</button>
          </div>
          <HeaderStats />
        </div>
      </div>
    </header>
  );
};

export default Header;
