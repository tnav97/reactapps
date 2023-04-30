import React from 'react';
import { Story } from '@storybook/react';
import RegisterForm, { RegisterFormProps } from './RegisterForm';

export default {
  component: RegisterForm,
  title: 'Components/RegisterForm',
};

const template: Story<RegisterFormProps> = (args) => <RegisterForm {...args} />;

export const validatingFormData = template.bind({});
validatingFormData.args = {
  form: {
    firstName: 'John',
    lastName: 'Smith',
    email: 'john@company.ca',
    companyName: 'company',
    password: 'zxcv234!8hfbdirog^^mDSW',
  },
  t: (x) => (x === 'tooltips.password.tips' ? [] : x),
};

export const validForm = template.bind({});
validForm.args = {
  form: {
    firstName: 'John',
    lastName: 'Smith',
    email: 'john@company.ca',
    companyName: 'company',
    password: 'zxcv234!8hfbdirog^^mDSW',
  },
  t: (x) => (x === 'tooltips.password.tips' ? [] : x),
};
