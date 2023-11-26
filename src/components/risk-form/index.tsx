import React from 'react';

import { Table } from 'antd';

export type RiskFormProps = {
  dataSource: {
    name: string;
    scorePoints: number;
    value: string | number;
  }[]
}
export const RiskTable: React.FC<RiskFormProps> = ({ dataSource }) => {
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
