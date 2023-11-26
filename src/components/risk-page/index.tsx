import { useQuery } from '@tanstack/react-query';
import React, { useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { riskServiceMock } from '../../service/risk-service';
import { RiskTable } from '../risk-form';

import './risk-page.scss';
import { gigachatService, gigachatServiceMock } from '../../service/gigachat-service';
import { Button, Col, Modal, Row, Space, message } from 'antd';
import { GigachatMessage } from '../gigachat-message';
import { ArrowLeftOutlined, CheckCircleOutlined } from '@ant-design/icons';
import { martialStatusDefinition } from '../../model/common';
import { creditHistoryDefinition, mainIncomeTypeDefinition } from '../../model/risk-info';
import { RiskScore } from '../risk-score';

export const RiskPage: React.FC = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const [messageApi, contextHolder] = message.useMessage();

  const { data: riskInfo } = useQuery({
    queryKey: ['getRiskInfo', id],
    queryFn: (id) => riskServiceMock.getRiskInfo(String(id)),
  });

  const { data: riskInfoSummary } = useQuery({
    queryKey: ['getRiskInfoSummary', id],
    queryFn: () => gigachatServiceMock.getRiskInfoSummary(String(id)),
    retry: false,
  });

  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

  const tableDataSource: {name: string; scorePoints: number; value: string | number}[] = useMemo(() => riskInfo ?
    [
      { name: 'Возраст клиента', ...riskInfo.age },
      { name: 'Семейное положение', ...riskInfo.maritalStatus, value: martialStatusDefinition[riskInfo.maritalStatus.value] },
      { name: 'Наличие детей', ...riskInfo.haveChildren, value: riskInfo.haveChildren.value ? 'Да' : 'Нет' },
      { name: 'Кредитная история клиента', ...riskInfo.creditHistory, value: creditHistoryDefinition[riskInfo.creditHistory.value] },
      { name: 'Основной источник получения дохода', ...riskInfo.mainIncomeType, value: mainIncomeTypeDefinition[riskInfo.mainIncomeType.value] },
      { name: 'Стаж клиента на текущем месте работы', ...riskInfo.currentJobSeniority, value: `${riskInfo.currentJobSeniority.value} лет` },
      { name: 'ПДН клиента (с учетом подтвержденного дохода)', ...riskInfo.debtBurdenIndicator, value: `${riskInfo.debtBurdenIndicator.value} %` },
      { name: 'Уровень доходов клиента (с учетом всех источников доходов)', ...riskInfo.totalIncome, value: `${riskInfo.totalIncome.value} ₽` },
      { name: 'У клиента имеются сбережения на счетах в Банке', ...riskInfo.haveSavingsAccount, value: riskInfo.haveSavingsAccount.value ? 'Да' : 'Нет' },
    ] : [], [riskInfo]);

  const totalRiskScore = useMemo(() => tableDataSource.reduce<number>((acc, row) => acc + row.scorePoints, 0), [tableDataSource]);

  return (
    <div className="sb-risk-page">
      {contextHolder}
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
            {riskInfo && (<RiskTable dataSource={tableDataSource} />)}
          </Col>
          <Col span={7}>
            <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
              <GigachatMessage label="Оценка риска:" message={riskInfoSummary?.answer || ''}/>
              <RiskScore riskScore={totalRiskScore}/>
              <Button type="primary" size="large" onClick={() => setIsConfirmModalOpen(true)}><CheckCircleOutlined/>Одобрить заявку</Button>
            </Space>
          </Col>
        </Row>
      </Space>

      <Modal open={isConfirmModalOpen} footer={null} onCancel={() => setIsConfirmModalOpen(false)}>
        <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
        Вы собираетесь одобрить заявку. Продолжить?
          <Row>
            <Col span={4}>
              <Button
                onClick={() => {
                  messageApi
                      .success('Заявка одобрена успешно!');
                  setIsConfirmModalOpen(false);
                }}
                type="primary"
              >
            Да
              </Button>
            </Col>
            <Col span={4}>
              <Button danger onClick={() => {setIsConfirmModalOpen(false);}}>
            Нет
              </Button>
            </Col>
          </Row>
        </Space>
      </Modal>
    </div>);
};
