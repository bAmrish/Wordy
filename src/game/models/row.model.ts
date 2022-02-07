import TileModel from './tile.model';

export type RowStatusType = 'CURRENT' | 'EVALUATED' | 'UNSOLVED' | 'DISABLED';

interface RowModel {
  id: string;
  tiles: TileModel[];
  status: RowStatusType;
}

export default RowModel;
