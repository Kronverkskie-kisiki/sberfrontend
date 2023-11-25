import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useParams } from 'react-router-dom';
import { profileService, profileServiceMock } from '../../service/profile-service';
import { ProfileForm } from '../profile-form';
import './profile-page.scss';
import { gigachatServiceMock } from '../../service/gigachat-service';
import { GigachatMessage } from '../gigachat-message';
import { Col, Row } from 'antd';

export const ProfilePage: React.FC = () => {
  const { id } = useParams();
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
    </div>);
};
