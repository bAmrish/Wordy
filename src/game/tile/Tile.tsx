import classes from './Tile.module.css';

import { FC, useEffect, useState } from 'react';
import TileModel, { StatusType } from '../models/tile.model';
import { CSSTransition } from 'react-transition-group';
import usePrevious from '../../hooks/use-previous';
import { useAppSelector } from '../store/store.hooks';

const getTileClass = (status: StatusType): string => {
  let className = classes.tile;
  switch (status) {
    case 'SELECTED':
      className += ' ' + classes.selected;
      break;
    case 'INCORRECT':
      className += ' ' + classes.incorrect;
      break;
    case 'CORRECT':
      className += ' ' + classes.success;
      break;
    case 'WARN':
      className += ' ' + classes.warn;
      break;
    case 'DISABLED':
      className += ' ' + classes.disabled;
      break;
    default:
      break;
  }

  return className;
};
const getAnimationDetails = (tile: TileModel): [number, string] => {
  const idString = tile.id.match(/[0-9]+/);
  let delay = 0;
  let animationClass = classes['item-enter'];
  if (idString && idString.length > 0) {
    const id = parseInt(idString[0], 10);
    delay = 300 + id * 300;
    animationClass += ' ' + classes[`delay-${id}`];
  }
  return [delay, animationClass];
};

const Tile: FC<{ tile: TileModel }> = props => {
  const tile = props.tile;
  const prevTile = usePrevious(tile);
  const [animate, setAnimate] = useState(false);
  const [delay, animationClass] = getAnimationDetails(tile);
  const className = getTileClass(tile.status);
  const animationEnabled = useAppSelector(state => state.ui.animationsEnabled);
  useEffect(() => {
    if (
      prevTile.status !== props.tile.status &&
      props.tile.status !== 'NEW' &&
      props.tile.status !== 'SELECTED' &&
      props.tile.status !== 'DISABLED'
    ) {
      setAnimate(true);
    } else {
      setAnimate(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.tile]);

  return (
    <CSSTransition
      in={animationEnabled && animate}
      timeout={{ enter: delay }}
      classNames={{ enter: animationClass }}
    >
      <div id={tile.id} className={className}>
        {tile.value}
      </div>
    </CSSTransition>
  );
};
export default Tile;
