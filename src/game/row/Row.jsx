import classes from "./Row.module.css";
import Tile from "../tile/Tile";

const Row = (props) => {
  const tiles = props.row.tiles.map((tile) => (
    <Tile key={tile.id} tile={tile} />
  ));
  return <div className={classes.row}>{tiles}</div>;
};

export default Row;
