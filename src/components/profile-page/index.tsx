import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { profileService, profileServiceMock } from '../../service/profile-service';
import { ProfileForm } from '../profile-form';
import './profile-page.scss';
import { gigachatServiceMock } from '../../service/gigachat-service';
import { GigachatMessage } from '../gigachat-message';
import { Button, Col, Form, Input, Modal, Row } from 'antd';
import TextArea from 'antd/es/input/TextArea';

export const ProfilePage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();


  const [isCloseModalOpen, setIsCloseModalOpen] = useState(false);

  const { data: profileInfo } = useQuery({
    queryKey: ['getProfile', id],
    queryFn: (id) => profileServiceMock.getProfile(String(id)),
  });

  const { data: profileSummary } = useQuery({
    queryKey: ['getProfileSummary', id],
    queryFn: () => gigachatServiceMock.getProfileSummary(String(id)),
  });

  return (
    <div className="sb-profile-page">
      <p className="sb-profile-page__title">
        Анкета участника сделки
      </p>
      <Row gutter={16}>
        <Col span={16}>
          <ProfileForm {...profileInfo}/>
        </Col>
        <Col span={7}>
          <GigachatMessage message={profileSummary?.answer || ''}/>
        </Col>
      </Row>

      <Row>
        <Col span={8}>
          <Button size="large" danger onClick={() => {setIsCloseModalOpen(true);}}>Отправить на доработку</Button>
        </Col>
        <Col span={8} offset={4}>
          <Button
            size="large"
            onClick={() => {
              navigate(`/risk/${id}`);
            }}>Расчет рисков</Button>
        </Col>
      </Row>

      <Modal title="Подтвердите действие" open={isCloseModalOpen} footer={null} onCancel={() => {setIsCloseModalOpen(false);}}>
        <Form layout="vertical">
          <Form.Item label="Причина отправки">
            <Input/>
          </Form.Item>
          <Form.Item label="Описание проблемы">
            <TextArea/>
          </Form.Item>
          <Form.Item>
            <Row>
              <Col span={8}>
                <Button
                  onClick={() => {}}
                  danger
                >
                  Отправить на доработку
                </Button>
              </Col>
              <Col span={8} offset={6}>
                <Button onClick={() => {setIsCloseModalOpen(false);}}>
                  Продолжить просмотр
                </Button>
              </Col>
            </Row>
          </Form.Item>
        </Form>
      </Modal>
    </div>);
};
