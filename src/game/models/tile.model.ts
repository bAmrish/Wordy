export type StatusType =
  | 'NEW'
  | 'CORRECT'
  | 'INCORRECT'
  | 'WARN'
  | 'SELECTED'
  | 'DISABLED';

interface TileModel {
  id: string;
  value: string;
  status: StatusType;
}

export default TileModel;
