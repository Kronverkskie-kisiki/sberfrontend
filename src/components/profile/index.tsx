import React, { useEffect } from 'react';
import { Form, FormItemProps, Input } from 'antd';
import { Doubtful, DoubtStatus } from '../../model/common';
import { MaritalStatus } from '../../model/profile';

export type ProfileProps = {
  firstName?: Doubtful<string>; // Имя
  secondName?: Doubtful<string>; // Фамилия
  middleName?: Doubtful<string>; // Отчество
  birthDate?: Doubtful<string>; // Дата рождения
  passSeries?: Doubtful<string>; // Серия паспорта
  passNumber?: Doubtful<string>; // Номер паспорта
  registrationAddress?: Doubtful<string>; // Адрес регистрации
  residenceAddress?: Doubtful<string>; // Адрес проживания
  maritalStatus?: Doubtful<MaritalStatus>; // Семейное положение
  haveChildren?: Doubtful<boolean>; // Наличие детей
  jopPlace?: Doubtful<string>; // Место работы
  jobExperience?: Doubtful<string>; // Стаж работы
  jobPosition?: Doubtful<string>; // Должность
  monthOfficialIncome?: Doubtful<number>; // Ежемесячный подтвержденный доход по месту работы
  incomeDocument?: Doubtful<string>; // Документ, подтверждающий доход
  monthAdditionalIncome?: Doubtful<number>; // Ежемесячный дополнительный доход
  isAdditionalIncomeApproved?: Doubtful<boolean>; // Дополнительный доход подтвержден документально
  additionalIncomeSource?: Doubtful<string>; // Источник дополнительного дохода
  haveBankSavings?: Doubtful<boolean>; // Наличие сбережений на счетах в Банке
}

type ProfileFormItemProps<T> = FormItemProps & { doubtfulData?: Doubtful<T> };

const ProfileFormItemString: React.FC<ProfileFormItemProps<string>> = ({ doubtfulData, ...rest }) => {
  const doubtfulStatusToValidateStatus: { [key in DoubtStatus]: 'success' | 'warning' | 'error' | 'validating' | undefined } = {
    [DoubtStatus.OK]: 'success',
    [DoubtStatus.WARN]: 'warning',
    [DoubtStatus.ERROR]: 'error',
  };

  if (doubtfulData) {
    return (
      <Form.Item
        validateStatus={doubtfulStatusToValidateStatus[doubtfulData.status]}
        help={doubtfulData.status !== DoubtStatus.OK && doubtfulData.message}
        hasFeedback
        {...rest}>
        <Input />
      </Form.Item>
    );
  } else {
    return (
      <Form.Item {...rest}>
        <Input />
      </Form.Item>
    );
  }
};


export const Profile: React.FC<ProfileProps> = (profileData) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (profileData) {
      const values = Object.entries(profileData).reduce<{ [key in string]: string | number | boolean }>((accumulator, pair) => {
        const [key, value] = pair;
        accumulator[key] = value.value;
        return accumulator;
      }, {});
      form.setFieldsValue(values);
    }
  }, [profileData]);

  return <div className='sb-profile'>
    <p>Анкета участника сделки</p>
    <Form
      form={form}
      onFinish={(formData) => {
        console.log(formData);
      }}
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 12 }}>
      <ProfileFormItemString doubtfulData={profileData.secondName} label='Фамилия' name='secondName' />
      <ProfileFormItemString doubtfulData={profileData.firstName} label='Имя' name='firstName' />
      <ProfileFormItemString doubtfulData={profileData.middleName} label='Отчество' name='middleName' />
    </Form>
  </div>;
};
