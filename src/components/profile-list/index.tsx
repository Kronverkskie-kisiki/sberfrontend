import React from 'react';
import { Card } from 'antd';
import { StandardProps } from '../../util/props';
import { useNavigate } from 'react-router-dom';
import { FileTextOutlined } from '@ant-design/icons';
import './profile-list.scss';

export type ProfileListElementProps = StandardProps & {
  id: string;
  firstName: string;
  secondName: string;
  middleName: string;
}
const ProfileListElement: React.FC<ProfileListElementProps> = ({ id, firstName, secondName, middleName, ...rest }) => {
  return (
    <Card {...rest} title={<><FileTextOutlined />{`  Заявка №${id}`}</>}>
      <table className="sb-profile-list-element__client-info">
        <tbody>
          <tr>
            <td>Фамилия:</td>
            <td>{secondName}</td>
          </tr>
          <tr>
            <td>Имя:</td>
            <td>{firstName}</td>
          </tr>
          <tr>
            <td>Отчество:</td>
            <td>{middleName}</td>
          </tr>
        </tbody>
      </table>
    </Card>
  );
};

export type ProfileListProps = StandardProps & {
  list: ProfileListElementProps[];
}
export const ProfileList: React.FC<ProfileListProps> = ({ list, ...rest }) => {
  const navigate = useNavigate();
  return (
    <div className="sb-profile-list" {...rest}>
      {list.map((element) =>
        <ProfileListElement
          key={element.id}
          className="sb-profile-list__element"
          onClick={() => {
            navigate(`./${element.id}`);
          }}
          {...element}/>)}
    </div>
  );
};
