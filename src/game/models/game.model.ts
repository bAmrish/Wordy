import RowModel from './row.model';

export type GameStatus = 'INIT' | 'PLAYING' | 'LOST' | 'WON';

interface GameModel {
  id: string;
  rows: RowModel[];
  status: GameStatus;
  answer: string;
  seed: number;
  createdOn: Date;
}

export default GameModel;
