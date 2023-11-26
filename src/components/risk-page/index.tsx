import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { riskServiceMock } from '../../service/risk-service';
import { RiskTable } from '../risk-form';

import './risk-page.scss';
import { gigachatService, gigachatServiceMock } from '../../service/gigachat-service';
import { Button, Col, Row, Space } from 'antd';
import { GigachatMessage } from '../gigachat-message';
import { ArrowLeftOutlined } from '@ant-design/icons';

export const RiskPage: React.FC = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const { data: riskInfo } = useQuery({
    queryKey: ['getRiskInfo', id],
    queryFn: (id) => riskServiceMock.getRiskInfo(String(id)),
  });

  const { data: riskInfoSummary } = useQuery({
    queryKey: ['getRiskInfoSummary', id],
    queryFn: () => gigachatServiceMock.getRiskInfoSummary(String(id)),
    retry: false,
  });

  return (
    <div className="sb-risk-page">
      <Space direction="vertical" size="middle" style={{ display: 'flex' }}>

        <p className="sb-risk-page__title">
          Расчет уровня риска
        </p>

        <Button
          size="large"
          onClick={() => {
            navigate(`/profile/${id}`);
          }}
        >
          <ArrowLeftOutlined />
          Вернуться к просмотру заявки
        </Button>

        <Row gutter={[16, 40]}>
          <Col span={16}>
            {riskInfo && (<RiskTable {...riskInfo} />)}
          </Col>
          <Col span={7}>
            <GigachatMessage label="Оценка риска:" message={riskInfoSummary?.answer || ''}/>
          </Col>
        </Row>
      </Space>
    </div>);
};
