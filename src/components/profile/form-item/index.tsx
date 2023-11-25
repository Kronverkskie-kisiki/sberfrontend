import { Form, FormItemProps, Input, InputNumber, Select } from 'antd';
import { Doubtful, DoubtStatus } from '../../../model/common';
import React from 'react';
import { MaritalStatus } from '../../../model/profile';

export type ProfileFormItemProps<T> = FormItemProps & {
  doubtfulData?: Doubtful<T>,
  readOnly?: boolean
};

const doubtfulStatusToValidateStatus: { [key in DoubtStatus]: 'success' | 'warning' | 'error' | 'validating' | undefined } = {
  [DoubtStatus.OK]: 'success',
  [DoubtStatus.WARN]: 'warning',
  [DoubtStatus.ERROR]: 'error',
};

export const ProfileFormItemString: React.FC<ProfileFormItemProps<string>> = ({ doubtfulData, readOnly = true, ...rest }) => {
  if (doubtfulData) {
    return (
      <Form.Item
        validateStatus={doubtfulStatusToValidateStatus[doubtfulData.status]}
        help={doubtfulData.status !== DoubtStatus.OK && doubtfulData.message}
        hasFeedback
        {...rest}
      >
        <Input readOnly={readOnly}/>
      </Form.Item>
    );
  } else {
    return (
      <Form.Item {...rest}>
      </Form.Item>
    );
  }
};

export const ProfileFormItemBoolean: React.FC<ProfileFormItemProps<boolean>> = ({ doubtfulData, readOnly = true, ...rest }) => {
  if (doubtfulData) {
    return (
      <Form.Item
        validateStatus={doubtfulStatusToValidateStatus[doubtfulData.status]}
        help={doubtfulData.status !== DoubtStatus.OK && doubtfulData.message}
        hasFeedback
        {...rest}
      >
        <Select
          dropdownRender={readOnly ? () => (<></>) : undefined}
          options={[
            { value: true, label: 'Да' },
            { value: false, label: 'Нет' },
          ]}
        />
      </Form.Item>
    );
  } else {
    return (
      <Form.Item {...rest}/>
    );
  }
};

export const ProfileFormItemNumber: React.FC<ProfileFormItemProps<number>> = ({ doubtfulData, readOnly = true, ...rest }) => {
  if (doubtfulData) {
    return (
      <Form.Item
        validateStatus={doubtfulStatusToValidateStatus[doubtfulData.status]}
        help={doubtfulData.status !== DoubtStatus.OK && doubtfulData.message}
        hasFeedback
        {...rest}
      >
        <InputNumber step="0.01" readOnly={readOnly}/>
      </Form.Item>
    );
  } else {
    return (<Form.Item {...rest}/>);
  }
};

export const ProfileFormItemMaritalStatus: React.FC<ProfileFormItemProps<MaritalStatus>> = ({ doubtfulData, readOnly = true, ...rest }) => (
  <>
    { doubtfulData ?
      (<Form.Item
        validateStatus={doubtfulStatusToValidateStatus[doubtfulData.status]}
        help={doubtfulData.status !== DoubtStatus.OK && doubtfulData.message}
        hasFeedback
        {...rest}
      >
        <Select
          dropdownRender={readOnly ? () => (<></>) : undefined}
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
