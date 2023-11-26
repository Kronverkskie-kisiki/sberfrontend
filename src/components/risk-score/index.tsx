import React from 'react';
import { Progress } from 'antd';

export type RiskScoreProps = {
  riskScore: number;
}
export const RiskScore: React.FC<RiskScoreProps> = ({ riskScore }) => {
  const getRiscScoreStatus = (riskScore: number) => {
    if (riskScore < 30) {
      return 'success';
    }
    if (riskScore <= 70 ) {
      return 'normal';
    }
    return 'exception';
  };

  const getRiskScoreDefinition = (riskScore: number) => {
    if (riskScore < 30) {
      return 'Низкий';
    }
    if (riskScore <= 70 ) {
      return 'Средний';
    }
    return 'Высокий';
  };

  return (
    <div>
      <p>Oценка риска: <span>{getRiskScoreDefinition(riskScore)}</span></p>
      <Progress percent={riskScore} status={getRiscScoreStatus(riskScore)} ></Progress>
    </div>
  );
};
