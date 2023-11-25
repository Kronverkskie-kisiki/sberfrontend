export enum DoubtStatus {
  OK = 'OK',
  WARN = 'WARN',
  ERROR = 'ERROR'
}
export enum MaritalStatus {
  MARRIED = 'MARRIED',
  SINGLE = 'SINGLE',
  WIDOW = 'WIDOW',
  DIVORCED = 'DIVORCED'
}

export const martialStatusDefinition = {
  [MaritalStatus.MARRIED]: 'Женат / замужем',
  [MaritalStatus.SINGLE]: 'Холост',
  [MaritalStatus.WIDOW]: 'Вдовец / вдова',
  [MaritalStatus.DIVORCED]: 'В разводе',
};

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
