import classes from './Header.module.css';
import HeaderStats from '../stats/stats-header/HeaderStats';
import { Link } from 'react-router-dom';
import { uiActions } from '../game/store/ui/ui.store';
import { useAppDispatch, useAppSelector } from '../game/store/store.hooks';
import Toggle, { TogglePosition } from '../ui/toggle/Toggle';

const Header = () => {
  const dispatch = useAppDispatch();
  const selector = useAppSelector(state => state.ui.theme);
  let toggleValue: TogglePosition = 'left';

  if (selector === 'light') {
    toggleValue = 'right';
  }

  const toggleSwitchHandler = (type: TogglePosition) => {
    switch (type) {
      case 'left':
        dispatch(uiActions.setTheme('dark'));
        break;
      case 'right':
        dispatch(uiActions.setTheme('light'));
        break;
    }
  };
  return (
    <header className={classes['header']}>
      <div className={classes['main-container']}>
        <h1 className={classes.title}>
          <Link to={'/'}>Wordy</Link>
        </h1>
        <div className={classes['actions']}>
          <div className={classes['theme-switcher']}>
            <label>
              <span className="material-icons">nights_stay</span>
            </label>
            <Toggle onSwitch={toggleSwitchHandler} value={toggleValue} />
            <label>
              <span className="material-icons">light_mode</span>
            </label>
          </div>
          <HeaderStats />
        </div>
      </div>
    </header>
  );
};

export default Header;
