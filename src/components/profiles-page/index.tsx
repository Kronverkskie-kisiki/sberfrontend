import React from 'react';
import { ProfileList } from '../profile-list';
import { useQuery } from '@tanstack/react-query';
import { profileServiceMock } from '../../service/profile-service';

import './profiles-page.scss';

export const ProfilesPage: React.FC = () => {
  const { data } = useQuery({
    queryFn: profileServiceMock.getProfiles,
    queryKey: ['getProfiles'],
  });

  const profileList = (data || []).map((element) => ({
    id: element.id,
    firstName: element.firstName.value,
    secondName: element.secondName.value,
    middleName: element.middleName.value,
  }));

  return (
    <div className="sb-profiles-page">
      <p className="sb-profiles-page__title">
        Список анкет
      </p>
      <ProfileList className="sb-profile-page__list" list={profileList}></ProfileList>
    </div>
  );
};
