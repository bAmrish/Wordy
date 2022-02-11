import classes from './AnimationSwitch.module.css';
import Toggle, { TogglePosition } from '../../ui/toggle/Toggle';
import { useAppDispatch, useAppSelector } from '../../game/store/store.hooks';
import { uiActions } from '../../game/store/ui/ui.store';

const AnimationSwitch = () => {
  const dispatch = useAppDispatch();
  const enabled = useAppSelector(state => state.ui.animationsEnabled);
  let toggleValue: TogglePosition = 'left';

  if (enabled) {
    toggleValue = 'right';
  }

  const toggleSwitchHandler = (type: TogglePosition) => {
    switch (type) {
      case 'left':
        dispatch(uiActions.toggleAnimation(false));
        break;
      case 'right':
        dispatch(uiActions.toggleAnimation(true));
        break;
    }
  };
  return (
    <div className={classes['theme-switcher']}>
      <label>OFF</label>
      <Toggle onSwitch={toggleSwitchHandler} value={toggleValue} />
      <label>ON</label>
    </div>
  );
};

export default AnimationSwitch;
