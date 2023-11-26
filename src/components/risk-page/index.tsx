import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { riskServiceMock } from '../../service/risk-service';
import { RiskTable } from '../risk-form';

import './risk-page.scss';
import { gigachatService, gigachatServiceMock } from '../../service/gigachat-service';
import { Button, Col, Form, Input, Modal, Row, Space } from 'antd';
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
    queryFn: () => gigachatService.getRiskInfoSummary(String(id)),
    retry: false,
  });

  const [isCloseModalOpen, setIsCloseModalOpen] = useState(false);

  return (
    <div className="sb-risk-page">
      <p className="sb-risk-page__title">
        Расчет уровня риска
      </p>

      <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
        <Row gutter={[16, 40]}>
          <Col span={16}>
            {riskInfo && (<RiskTable {...riskInfo} />)}
          </Col>
          <Col span={7}>
            <GigachatMessage message={riskInfoSummary?.answer || ''}/>
          </Col>
        </Row>

        <Row>
          <Col span={8}>
            <Button size="large" danger onClick={() => {setIsCloseModalOpen(true);}}>Отправить на доработку</Button>
          </Col>
          <Col span={16}>
            <Button size="large">Расчет рисков</Button>
          </Col>
        </Row>
      </Space>
      <Modal title="Подтвердите действие">
        <Form>
          <Form.Item>
            <Input/>
          </Form.Item>
        </Form>
      </Modal>
    </div>);
};
