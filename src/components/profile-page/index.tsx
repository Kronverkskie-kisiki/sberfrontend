import { useMutation, useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { profileServiceMock } from '../../service/profile-service';
import { ProfileForm } from '../profile-form';
import './profile-page.scss';
import { gigachatService } from '../../service/gigachat-service';
import { GigachatMessage } from '../gigachat-message';
import { Button, Col, Form, Input, message, Modal, Row, Space } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { ArrowLeftOutlined } from '@ant-design/icons';

export const ProfilePage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();

  const [isCloseModalOpen, setIsCloseModalOpen] = useState(false);

  const { data: profileInfo } = useQuery({
    queryKey: ['getProfile', id],
    queryFn: () => {
      return profileServiceMock.getProfile(String(id));
    },
  });

  const { data: profileSummary } = useQuery({
    queryKey: ['getProfileSummary', id],
    queryFn: () => gigachatService.getProfileSummary('231806444'),
  });

  const { mutate: rejectProfile, isSuccess: isRejectSuccess } = useMutation({ mutationFn: profileServiceMock.rejectProfile });

  console.log(id);
  useEffect(() => {
    if (isRejectSuccess) {
      messageApi.success('Заявка удалена успешно!');
      setIsCloseModalOpen(false);
    }
  }, [isRejectSuccess]);

  return (
    <div className="sb-profile-page">
      {contextHolder}
      <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
        <p className="sb-profile-page__title">
        Анкета участника сделки
        </p>
        <Button
          className="sb-profile-page__back-button"
          size="large"
          onClick={() => {
            navigate(`/`);
          }}
        >
          <ArrowLeftOutlined />
        К списку заявок
        </Button>
        <Row gutter={16}>
          <Col span={16}>
            <ProfileForm {...profileInfo}/>
          </Col>
          <Col span={7}>
            <GigachatMessage label="Анализ соц. сетей:" message={profileSummary?.answer || ''}/>
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
      </Space>

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
                  onClick={() => {
                    rejectProfile(String(id));
                  }}
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
