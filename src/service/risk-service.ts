import { CreditHistoryStatus, MainIncomeType, RiskInfo } from '../model/risk-info';
import { MaritalStatus } from '../model/common';
import { fetchServer } from './fetch-server';

const riskInfoMockData: readonly RiskInfo[] = [
  {
    id: '1',
    age: { value: 38, scorePoints: 3 },
    maritalStatus: { value: MaritalStatus.MARRIED, scorePoints: 2 },
    haveChildren: { value: true, scorePoints: 3 },
    creditHistory: { value: CreditHistoryStatus.GOOD, scorePoints: 1 },
    mainIncomeType: { value: MainIncomeType.MAIN_WORK, scorePoints: 2 },
    currentJobSeniority: { value: 12, scorePoints: 2 },
    debtBurdenIndicator: { value: 63, scorePoints: 1 },
    totalIncome: { value: 123000, scorePoints: 5 },
    haveSavingsAccount: { value: false, scorePoints: 5 },
  },
  {
    id: '2',
    age: { value: 51, scorePoints: 1 },
    maritalStatus: { value: MaritalStatus.DIVORCED, scorePoints: 5 },
    haveChildren: { value: true, scorePoints: 3 },
    creditHistory: { value: CreditHistoryStatus.BAD, scorePoints: 15 },
    mainIncomeType: { value: MainIncomeType.OTHER, scorePoints: 15 },
    currentJobSeniority: { value: 12, scorePoints: 2 },
    debtBurdenIndicator: { value: 63, scorePoints: 1 },
    totalIncome: { value: 39500, scorePoints: 15 },
    haveSavingsAccount: { value: false, scorePoints: 5 },
  },
  {
    id: '3',
    age: { value: 35, scorePoints: 1 },
    maritalStatus: { value: MaritalStatus.SINGLE, scorePoints: 3 },
    haveChildren: { value: false, scorePoints: 5 },
    creditHistory: { value: CreditHistoryStatus.MEDIUM, scorePoints: 8 },
    mainIncomeType: { value: MainIncomeType.BUSINESS, scorePoints: 7 },
    currentJobSeniority: { value: 12, scorePoints: 2 },
    debtBurdenIndicator: { value: 63, scorePoints: 1 },
    totalIncome: { value: 198615, scorePoints: 5 },
    haveSavingsAccount: { value: false, scorePoints: 5 },
  },
];

export const riskServiceMock = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getRiskInfo: (id: string) => new Promise<RiskInfo>((resolve) => {
    setTimeout(() => {
      resolve(riskInfoMockData[Number(id) - 1]);
    });
  }),
};
export const riskService = {
  gerRiskInfo: (id: string) =>
    fetchServer<RiskInfo>(
        `http://localhost:5005/api/get_risk_info?id=${id}`,
    ),
};
