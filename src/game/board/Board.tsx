import classes from './Board.module.css';
import Row from '../row/Row';
import { FC, memo } from 'react';
import RowModel from '../models/row.model';

const Board: FC<{ rows: RowModel[] }> = memo(props => {
  // console.log(`[Rendering Board Component]`, props.rows);
  const rowNodes = props.rows.map(row => <Row key={row.id} row={row} />);
  return <div className={classes.board}>{rowNodes}</div>;
});

export default Board;
