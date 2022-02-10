import classes from './Toggle.module.css';
import { FC, useState } from 'react';

export type TogglePosition = 'left' | 'right';

const Toggle: FC<{
  onSwitch?: (position: TogglePosition) => void;
  value?: TogglePosition;
}> = props => {
  const [position, setPosition] = useState<TogglePosition>(
    props.value || 'left'
  );
  const containerClass = classes['toggle-container'] + ' ' + classes[position];

  const toggle = () => {
    setPosition(prevPosition => {
      if (prevPosition === 'left') {
        if (props.onSwitch) {
          props.onSwitch('right');
        }

        return 'right';
      }
      if (props.onSwitch) {
        props.onSwitch('left');
      }
      return 'left';
    });
  };
  return (
    <div className={containerClass} onClick={toggle}>
      <div className={classes['toggle-knob']}>&nbsp;</div>
    </div>
  );
};

export default Toggle;
