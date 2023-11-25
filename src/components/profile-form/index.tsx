import React, { useEffect } from 'react';
import { Form } from 'antd';
import { Doubtful, MaritalStatus } from '../../model/common';
import {
  ProfileFormItemBoolean,
  ProfileFormItemMaritalStatus,
  ProfileFormItemNumber,
  ProfileFormItemString,
} from './form-item';

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
  jobPlace?: Doubtful<string>; // Место работы
  jobExperience?: Doubtful<string>; // Стаж работы
  jobPosition?: Doubtful<string>; // Должность
  monthOfficialIncome?: Doubtful<number>; // Ежемесячный подтвержденный доход по месту работы
  incomeDocument?: Doubtful<string>; // Документ, подтверждающий доход
  monthAdditionalIncome?: Doubtful<number>; // Ежемесячный дополнительный доход
  isAdditionalIncomeApproved?: Doubtful<boolean>; // Дополнительный доход подтвержден документально
  additionalIncomeSource?: Doubtful<string>; // Источник дополнительного дохода
  haveBankSavings?: Doubtful<boolean>; // Наличие сбережений на счетах в Банке
}


export const ProfileForm: React.FC<ProfileProps> = (profileData) => {
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

  return (
    <Form
      form={form}
      onFinish={(formData) => {
        console.log(formData);
      }}
      labelCol={{ span: 10 }}
      wrapperCol={{ span: 14 }}
      labelWrap
      labelAlign={'left'}
    >
      <ProfileFormItemString
        doubtfulData={profileData.secondName}
        label='Фамилия'
        name='secondName' />
      <ProfileFormItemString
        doubtfulData={profileData.firstName}
        label='Имя'
        name=
          'firstName' />
      <ProfileFormItemString
        doubtfulData={profileData.middleName}
        label='Отчество'
        name='middleName' />
      <ProfileFormItemString
        doubtfulData={profileData.birthDate}
        label='Дата рождения'
        name='birthDate' />
      <ProfileFormItemString
        doubtfulData={profileData.passSeries}
        label='Серия паспорта'
        name='passSeries' />
      <ProfileFormItemString
        doubtfulData={profileData.passNumber}
        label='Номер паспорта'
        name='passNumber' />
      <ProfileFormItemString
        doubtfulData={profileData.registrationAddress}
        label='Адрес регистрации'
        name='registrationAddress' />
      <ProfileFormItemString
        doubtfulData={profileData.residenceAddress}
        label='Адрес проживания'
        name='residenceAddress' />
      <ProfileFormItemMaritalStatus
        doubtfulData={profileData.maritalStatus}
        label="Семейное положение"
        name="maritalStatus" />
      <ProfileFormItemBoolean
        doubtfulData={profileData.haveChildren}
        label="Наличие детей"
        name="haveChildren"/>
      <ProfileFormItemString
        doubtfulData={profileData.jobPlace}
        label='Место работы'
        name='jobPlace' />
      <ProfileFormItemString
        doubtfulData={profileData.jobExperience}
        label='Стаж работы'
        name='jobExperience' />
      <ProfileFormItemString
        doubtfulData={profileData.jobPosition}
        label='Должность'
        name='jobPosition' />
      <ProfileFormItemNumber
        doubtfulData={profileData.monthOfficialIncome}
        label='Ежемесячный подтвержденный доход по месту работы'
        name='monthOfficialIncome'
        labelCol={{ span: 10 }}
        wrapperCol={{ span: 14 }}
      />
      <ProfileFormItemString
        doubtfulData={profileData.incomeDocument}
        label='Документ, подтверждающий доход'
        name='incomeDocument'
        labelCol={{ span: 10 }}
        wrapperCol={{ span: 14 }}
      />
      <ProfileFormItemNumber
        doubtfulData={profileData.monthAdditionalIncome}
        label='Ежемесячный дополнительный доход'
        name='monthAdditionalIncome'
        labelCol={{ span: 10 }}
        wrapperCol={{ span: 14 }}
      />
      <ProfileFormItemBoolean
        doubtfulData={profileData.isAdditionalIncomeApproved}
        label={'Дополнительный доход подтвержден документально'}
        name="isAdditionalIncomeApproved"
        labelCol={{ span: 10 }}
        wrapperCol={{ span: 14 }}
      />
      <ProfileFormItemString
        doubtfulData={profileData.additionalIncomeSource}
        name='additionalIncomeSource'
        label='Источник дополнительного дохода'
        labelCol={{ span: 10 }}
        wrapperCol={{ span: 14 }}/>
      <ProfileFormItemBoolean
        doubtfulData={profileData.haveBankSavings}
        name="haveBankSavings"
        label="Наличие сбережений на счетах в Банке"
        labelCol={{ span: 10 }}
        wrapperCol={{ span: 14 }}/>
    </Form>
  );
};
