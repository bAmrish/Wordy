import RowModel from './row.model';

export type GameStatus = 'INIT' | 'PLAYING' | 'LOST' | 'WON';

class GameModel {
  id: string;
  rows: RowModel[];
  status: GameStatus;
  answer: string;
  seed: number;
  createdOn: Date;

  constructor(
    id: string,
    rows?: RowModel[],
    status?: GameStatus,
    answer?: string,
    seed?: number,
    createdOn?: Date
  ) {
    this.id = id;
    this.rows = rows || [];
    this.status = status || 'INIT';
    this.answer = answer || '';
    this.seed = seed || 0;
    this.createdOn = createdOn || new Date();
  }

  clone(): GameModel {
    const clone = new GameModel(this.id);
    clone.rows = [...this.rows];
    // noinspection TypeScriptValidateTypes
    // @ts-ignore
    clone.status = this.status.toString();
    clone.answer = this.answer;
    clone.seed = this.seed;
    clone.createdOn = new Date(this.createdOn.toString());
    return clone;
  }
}

export default GameModel;
