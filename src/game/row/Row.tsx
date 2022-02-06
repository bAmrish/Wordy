import classes from './Row.module.css';
import Tile from '../tile/Tile';
import RowModel from '../models/row.model';
import TileModel from '../models/tile.model';
import { FC } from 'react';

const Row: FC<{ row: RowModel }> = props => {
  // console.log(`[Rendering Row Component]`, props.row);
  const tiles = props.row.tiles.map((tile: TileModel) => (
    <Tile key={tile.id} tile={tile} />
  ));
  return <div className={classes.row}>{tiles}</div>;
};

export default Row;
