import React, { useEffect } from 'react';
import { Form, FormItemProps, Input, Select } from 'antd';
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

type ProfileFormItemProps<T> = FormItemProps & {
  doubtfulData?: Doubtful<T>,
  disabled?: boolean
};

const doubtfulStatusToValidateStatus: { [key in DoubtStatus]: 'success' | 'warning' | 'error' | 'validating' | undefined } = {
  [DoubtStatus.OK]: 'success',
  [DoubtStatus.WARN]: 'warning',
  [DoubtStatus.ERROR]: 'error',
};

const ProfileFormItemString: React.FC<ProfileFormItemProps<string>> = ({ doubtfulData, disabled = true, ...rest }) => {
  if (doubtfulData) {
    return (
      <Form.Item
        validateStatus={doubtfulStatusToValidateStatus[doubtfulData.status]}
        help={doubtfulData.status !== DoubtStatus.OK && doubtfulData.message}
        hasFeedback
        {...rest}>
        <Input disabled={disabled}/>
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

const ProfileFormItemMaritalStatus: React.FC<ProfileFormItemProps<MaritalStatus>> = ({ doubtfulData, disabled = false, ...rest }) => (
  <>
    { doubtfulData ?
    (<Form.Item
      validateStatus={doubtfulStatusToValidateStatus[doubtfulData.status]}
      help={doubtfulData.status !== DoubtStatus.OK && doubtfulData.message}
      hasFeedback
      {...rest}
    >
      <Select disabled={disabled}
        options={[
          { value: MaritalStatus.MARRIED, label: 'Женат / Замужем' },
          { value: MaritalStatus.SINGLE, label: 'Одинок / Одинока' },
          { value: MaritalStatus.WIDOW, label: 'Вдовец / Вдова' },
        ]}
      />
    </Form.Item>) :
      <></>
    }
  </>
);


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
      wrapperCol={{ span: 12 }}
      labelWrap
      labelAlign={'left'}
    >
      <ProfileFormItemString doubtfulData={profileData.secondName} label='Фамилия' name='secondName' />
      <ProfileFormItemString doubtfulData={profileData.firstName} label='Имя' name='firstName' />
      <ProfileFormItemString doubtfulData={profileData.middleName} label='Отчество' name='middleName' />
      <ProfileFormItemString doubtfulData={profileData.birthDate} label='Дата рождения' name='birthDate' />
      <ProfileFormItemString doubtfulData={profileData.passSeries} label='Серия паспорта' name='passSeries' />
      <ProfileFormItemString doubtfulData={profileData.passNumber} label='Номер паспорта' name='passNumber' />
      <ProfileFormItemString doubtfulData={profileData.registrationAddress} label='Адрес регистрации' name='registrationAddress' />
      <ProfileFormItemString doubtfulData={profileData.residenceAddress} label='Адрес проживания' name='residenceAddress' />
      <ProfileFormItemMaritalStatus doubtfulData={profileData.maritalStatus} label="Семейное положение" name="maritalStatus" />
      {/* haveChildren */}
      <ProfileFormItemString doubtfulData={profileData.jobPlace} label='Место работы' name='jobPlace' />
      <ProfileFormItemString doubtfulData={profileData.jobExperience} label='Стаж работы' name='jobExperience' />
      <ProfileFormItemString doubtfulData={profileData.jobPosition} label='Должность' name='jobPosition' />
      {/* <ProfileFormItemString doubtfulData={profileData.monthOfficialIncome} label='Ежемесячный подтвержденный доход по месту работы' name='jobPosition' />*/}
      <ProfileFormItemString doubtfulData={profileData.incomeDocument} label='Документ, подтверждающий доход' name='incomeDocument' labelCol={{ span: 6 }} wrapperCol={{ span: 10 }}/>
      <ProfileFormItemString doubtfulData={profileData.additionalIncomeSource} label='Источник дополнительного дохода' name='additionalIncomeSource' labelCol={{ span: 6 }} wrapperCol={{ span: 10 }}/>


    </Form>
  </div>;
};
