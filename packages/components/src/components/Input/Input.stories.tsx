import React from 'react';
import { Story } from '@storybook/react';
import Input, { InputProps } from './Input';

export default {
  title: 'Components/Input',
  component: Input,
};

const InputTemplate: Story<InputProps> = (props) => (
  <div style={{ width: '300px' }}>
    <Input {...props} />
  </div>
);

export const Empty = InputTemplate.bind({});
Empty.args = {
  label: 'First name',
  value: '',
  placeholder: 'Placeholder',
};

export const Password = InputTemplate.bind({});
Password.args = {
  label: 'Password',
  value: 'P@ssword!',
  type: 'password',
  isValid: true,
};

export const WithTooltip = InputTemplate.bind({});
WithTooltip.args = {
  label: 'Email',
  value: 'test@test.com',
  tooltip:
    'We recommend using your work email. This will make it easier for you to invite team members.',
};

export const WithHint = InputTemplate.bind({});
WithHint.args = {
  label: 'Email',
  value: 'test@test.com',
  hint: 'Invalid email',
};

export const WithHintAndErrorState = InputTemplate.bind({});
WithHintAndErrorState.args = {
  label: 'Email',
  value: 'test@test.com',
  hint: 'Invalid email',
  state: 'error',
};

export const requiredNumberWithHelper = InputTemplate.bind({});
requiredNumberWithHelper.args = {
  label: 'Seats',
  value: '10',
  type: 'number',
  helperText: 'Max 150 seats',
  required: true,
};

export const numberWithIncrements = InputTemplate.bind({});
numberWithIncrements.args = {
  label: 'Seats',
  value: '10',
  type: 'number',
  showIncrementButtons: true,
  helperText: 'Max 150 seats',
  required: true,
};
