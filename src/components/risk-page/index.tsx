import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useParams } from 'react-router-dom';
import { riskServiceMock } from '../../service/risk-service';
import { RiskTable } from '../risk-form';

import './risk-page.scss';
import { gigachatServiceMock } from '../../service/gigachat-service';
import { Col, Row } from 'antd';
import { ProfileForm } from '../profile-form';
import { GigachatMessage } from '../gigachat-message';

export const RiskPage: React.FC = () => {
  const { id } = useParams();

  const { data: riskInfo } = useQuery({
    queryKey: ['getRiskInfo', id],
    queryFn: (id) => riskServiceMock.getRiskInfo(String(id)),
  });

  const { data: riskInfoSummary } = useQuery({
    queryKey: ['getRiskInfoSummary', id],
    queryFn: () => gigachatServiceMock.getRiskInfoSummary(String(id)),
  });

  return (
    <div className="sb-risk-page">
      <p className="sb-risk-page__title">
        Расчет уровня риска
      </p>

      <Row gutter={16}>
        <Col span={16}>
          {riskInfo && (<RiskTable {...riskInfo} />)}
        </Col>
        <Col span={7}>
          <GigachatMessage message={riskInfoSummary?.answer || ''}/>
        </Col>
      </Row>
    </div>);
};
