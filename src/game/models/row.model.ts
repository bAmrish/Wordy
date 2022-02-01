import TileModel from './tile.model';

export type RowStatusType = 'CURRENT' | 'EVALUATED' | 'UNSOLVED' | 'DISABLED';

class RowModel {
  id: string;
  tiles: TileModel[];
  status: RowStatusType;

  constructor(id: string, tiles: TileModel[] = [], status: RowStatusType) {
    this.id = id;
    this.tiles = tiles;
    this.status = status;
  }
}

export default RowModel;
