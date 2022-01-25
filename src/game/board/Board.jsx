import classes from "./Board.module.css";
import Row from "../row/Row";

const Board = (props) => {
  const rowNodes = props.rows.map((row) => <Row key={row.id} row={row} />);
  return <div className={classes.board}>{rowNodes}</div>;
};

export default Board;
