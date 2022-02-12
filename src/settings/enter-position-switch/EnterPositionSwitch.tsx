import classes from './EnterPositionSwitch.module.css';
import Toggle, { TogglePosition } from '../../ui/toggle/Toggle';
import { useAppDispatch, useAppSelector } from '../../game/store/store.hooks';
import { uiActions } from '../../game/store/ui/ui.store';

const EnterPositionSwitch = () => {
  const dispatch = useAppDispatch();
  const enterLeft = useAppSelector(state => state.ui.enterLeft);
  let toggleValue: TogglePosition = 'left';

  if (!enterLeft) {
    toggleValue = 'right';
  }

  const toggleSwitchHandler = (type: TogglePosition) => {
    switch (type) {
      case 'left':
        dispatch(uiActions.setEnterLeft(true));
        break;
      case 'right':
        dispatch(uiActions.setEnterLeft(false));
        break;
    }
  };
  return (
    <div className={classes['theme-switcher']}>
      <label>LEFT</label>
      <Toggle onSwitch={toggleSwitchHandler} value={toggleValue} />
      <label>RIGHT</label>
    </div>
  );
};

export default EnterPositionSwitch;
