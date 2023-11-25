import { MaritalStatus } from './common';

export enum CreditHistoryStatus {
  NONE = 'NONE',
  BAD = 'BAD',
  MEDIUM = 'MEDIUM',
  GOOD = 'GOOD'
}

export enum MainIncomeType {
  MAIN_WORK = 'MAIN_WORK',
  BUSINESS = 'BUSINESS',
  PENSION = 'PENSION',
  OTHER = 'OTHER'
}

export type RiskScore<T> = {
  value: T;
  scorePoints: number;
}

export type RiskInfo = {
  readonly id: RiskScore<string>;
  readonly maritalStatus: RiskScore<MaritalStatus>;
  readonly haveChildren: RiskScore<boolean>;
  readonly creditHistory: RiskScore<CreditHistoryStatus>;
  readonly mainIncomeType: RiskScore<MainIncomeType>;
  readonly currentJobSeniority: RiskScore<number>;
  readonly debtBurdenIndicator: RiskScore<number>; // Показатель долговой нагрузки
  readonly totalIncome: RiskScore<number>;
  readonly haveSavingsAccount: RiskScore<number>;
}
