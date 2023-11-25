import React, { useEffect, useState } from 'react';
import { MaritalStatus, martialStatusDefinition } from '../../model/common';
import {
  creditHistoryDefinition,
  CreditHistoryStatus,
  MainIncomeType,
  mainIncomeTypeDefinition,
  RiskScore,
} from '../../model/risk-info';
import { Form, Table } from 'antd';

export type RiskFormProps = {
  age: RiskScore<number>;
  maritalStatus: RiskScore<MaritalStatus>;
  haveChildren: RiskScore<boolean>;
  creditHistory: RiskScore<CreditHistoryStatus>;
  mainIncomeType: RiskScore<MainIncomeType>;
  currentJobSeniority: RiskScore<number>;
  debtBurdenIndicator: RiskScore<number>; // Показатель долговой нагрузки
  totalIncome: RiskScore<number>;
  haveSavingsAccount: RiskScore<boolean>;
}
export const RiskTable: React.FC<RiskFormProps> = ({ age, maritalStatus, haveChildren, creditHistory, mainIncomeType, currentJobSeniority, totalIncome, haveSavingsAccount, debtBurdenIndicator }) => {
  const [form] = Form.useForm();

  const [dataSource, setDataSource] = useState<(RiskScore<any> & {name: string; })[]>();

  useEffect(() => {
    const rows = [
      { name: 'Возраст клиента', ...age },
      { name: 'Семейное положение', ...maritalStatus, value: martialStatusDefinition[maritalStatus.value] },
      { name: 'Наличие детей', ...haveChildren, value: haveChildren.value ? 'Да' : 'Нет' },
      { name: 'Кредитная история клиента', ...creditHistory, value: creditHistoryDefinition[creditHistory.value] },
      { name: 'Основной источник получения дохода', ...mainIncomeType, value: mainIncomeTypeDefinition[mainIncomeType.value] },
      { name: 'Стаж клиента на текущем месте работы', ...currentJobSeniority, value: `${currentJobSeniority.value} лет` },
      { name: 'ПДН клиента (с учетом подтвержденного дохода)', ...debtBurdenIndicator, value: `${debtBurdenIndicator.value} %` },
      { name: 'Уровень доходов клиента (с учетом всех источников доходов)', ...totalIncome, value: `${totalIncome.value} ₽` },
      { name: 'У клиента имеются сбережения на счетах в Банке', ...haveSavingsAccount, value: haveSavingsAccount.value ? 'Да' : 'Нет' },
    ];
    setDataSource(rows);
  }, [age, maritalStatus, haveChildren, creditHistory, mainIncomeType, currentJobSeniority, totalIncome, haveSavingsAccount, debtBurdenIndicator]);


  return (<Table
    columns={[
      {
        title: 'Параметр',
        render: (row) => (row.name),
      },
      {
        title: 'Значение',
        render: (row) => row.value,
      },
      {
        title: 'Количество риск-баллов',
        render: (row) => row.scorePoints,
      },
    ]}
    dataSource={dataSource}
    pagination={false}
  />);
};
