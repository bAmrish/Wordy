import classes from './TileDesignSwitch.module.css';
import Toggle, { TogglePosition } from '../../ui/toggle/Toggle';
import { useAppDispatch, useAppSelector } from '../../game/store/store.hooks';
import { uiActions } from '../../game/store/ui/ui.store';

const TileDesignSwitch = () => {
  const dispatch = useAppDispatch();
  const rounded = useAppSelector(state => state.ui.roundedTile);
  let toggleValue: TogglePosition = 'left';

  if (rounded) {
    toggleValue = 'right';
  }

  const toggleSwitchHandler = (type: TogglePosition) => {
    switch (type) {
      case 'left':
        dispatch(uiActions.setRoundedTile(false));
        break;
      case 'right':
        dispatch(uiActions.setRoundedTile(true));
        break;
    }
  };
  return (
    <div className={classes['theme-switcher']}>
      <label>
        <span className="material-icons-outlined">crop_square</span>
      </label>
      <Toggle onSwitch={toggleSwitchHandler} value={toggleValue} />
      <label>
        <span className="material-icons-outlined">circle</span>
      </label>
    </div>
  );
};

export default TileDesignSwitch;
