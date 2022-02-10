import classes from './ThemeSwitcher.module.css';
import Toggle, { TogglePosition } from '../../ui/toggle/Toggle';
import { useAppDispatch, useAppSelector } from '../../game/store/store.hooks';
import { uiActions } from '../../game/store/ui/ui.store';

const ThemeSwitcher = () => {
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
    <div className={classes['theme-switcher']}>
      <label>
        <span className="material-icons">nights_stay</span>
      </label>
      <Toggle onSwitch={toggleSwitchHandler} value={toggleValue} />
      <label>
        <span className="material-icons">light_mode</span>
      </label>
    </div>
  );
};

export default ThemeSwitcher;
