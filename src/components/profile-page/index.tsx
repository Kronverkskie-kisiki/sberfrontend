import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useParams } from 'react-router-dom';
import { profileService } from '../../service/profile-service';
import { Profile } from '../profile';

export const ProfilePage: React.FC = () => {
  const { id } = useParams();
  // eslint-disable-next-line no-unused-vars
  const { data: profileInfo } = useQuery({
    queryKey: ['getProfile', id],
    queryFn: (id) => profileService.getProfile(String(id)),
  });
  return (<div><Profile {...profileInfo}/></div>);
};
