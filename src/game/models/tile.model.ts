export type StatusType =
  | 'NEW'
  | 'CORRECT'
  | 'INCORRECT'
  | 'WARN'
  | 'SELECTED'
  | 'DISABLED';

class TileModel {
  id: string;
  value: string;
  status: StatusType;

  constructor(id: string, value: string, status: StatusType) {
    this.id = id;
    this.value = value;
    this.status = status;
  }
}

export default TileModel;
