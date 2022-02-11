import classes from './Settings.module.css';
import ThemeSwitcher from './theme-switcher/ThemeSwitcher';
import PageClose from './close/PageClose';
import AnimationSwitch from './animation-switch/AnimationSwitch';

const Settings = () => {
  return (
    <div className={classes.settings}>
      <PageClose />
      <div className={classes['settings-title']}>
        <span className="material-icons">tune</span>&nbsp; Settings
      </div>
      <div className={classes.setting}>
        <div className={classes['setting-label']}>Select Your Theme</div>
        <div className={classes['setting-action']}>
          <ThemeSwitcher />
        </div>
      </div>
      <div className={classes.setting}>
        <div className={classes['setting-label']}>Tile Animations</div>
        <div className={classes['setting-action']}>
          <AnimationSwitch />
        </div>
      </div>
    </div>
  );
};

export default Settings;
