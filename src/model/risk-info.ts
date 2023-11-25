import { MaritalStatus } from './common';

export enum CreditHistoryStatus {
  NONE = 'NONE',
  BAD = 'BAD',
  MEDIUM = 'MEDIUM',
  GOOD = 'GOOD'
}

export const creditHistoryDefinition = {
  [CreditHistoryStatus.NONE]: 'Отсутствует',
  [CreditHistoryStatus.BAD]: 'Плохая',
  [CreditHistoryStatus.MEDIUM]: 'Средняя',
  [CreditHistoryStatus.GOOD]: 'Хорошая',
};

export enum MainIncomeType {
  MAIN_WORK = 'MAIN_WORK',
  BUSINESS = 'BUSINESS',
  PENSION = 'PENSION',
  OTHER = 'OTHER'
}

export const mainIncomeTypeDefinition = {
  [MainIncomeType.MAIN_WORK]: 'Заработная плата по основному месту работы',
  [MainIncomeType.BUSINESS]: 'Доходы от предпринимательства',
  [MainIncomeType.PENSION]: 'Пенсия',
  [MainIncomeType.OTHER]: 'Иное',
};

export type RiskScore<T> = {
  value: T;
  scorePoints: number;
}

export type RiskInfo = {
  readonly id: string;
  readonly age: RiskScore<number>;
  readonly maritalStatus: RiskScore<MaritalStatus>;
  readonly haveChildren: RiskScore<boolean>;
  readonly creditHistory: RiskScore<CreditHistoryStatus>;
  readonly mainIncomeType: RiskScore<MainIncomeType>;
  readonly currentJobSeniority: RiskScore<number>;
  readonly debtBurdenIndicator: RiskScore<number>; // Показатель долговой нагрузки
  readonly totalIncome: RiskScore<number>;
  readonly haveSavingsAccount: RiskScore<boolean>;
}
