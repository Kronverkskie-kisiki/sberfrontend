import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useParams } from 'react-router-dom';
import { riskServiceMock } from '../../service/risk-service';
import { RiskTable } from '../risk-form';

export const RiskPage: React.FC = () => {
  const { id } = useParams();

  const { data: riskInfo } = useQuery({
    queryKey: ['getRiskInfo', id],
    queryFn: (id) => riskServiceMock.getRiskInfo(String(id)),
  });

  return (
    <div className="sb-risk-page">
      {riskInfo && (<RiskTable {...riskInfo} />)}
    </div>);
};
