import RowModel from './row.model';

class BoardModel {
  rows: RowModel[];

  constructor(id: string, rows: RowModel[]) {
    this.rows = rows;
  }
}

export default BoardModel;
