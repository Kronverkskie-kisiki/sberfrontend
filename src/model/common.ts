export enum DoubtStatus {
  OK = 'OK',
  WARN = 'WARN',
  ERROR = 'ERROR'
}
export enum MaritalStatus {
  MARRIED = 'MARRIED', // Женат/замужем
  SINGLE = 'SINGLE', // Одинок
  WIDOW = 'WIDOW' // Вдовец / вдова
}

type DoubtOk<T> = {
  value: T;
  status: DoubtStatus.OK;
}

type DoubtWarn<T> = {
  value: T;
  status: DoubtStatus.WARN;
  message: string;
}

type DoubtError<T> = {
  value: T;
  status: DoubtStatus.ERROR;
  message: string;
}

export type Doubtful<T> = DoubtOk<T> | DoubtWarn<T> | DoubtError<T>;
