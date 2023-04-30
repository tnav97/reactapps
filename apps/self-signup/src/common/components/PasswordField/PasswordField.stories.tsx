import React from 'react';
import { Story } from '@storybook/react';
import PasswordField, { PasswordProps } from './PasswordField';

export default {
  component: PasswordField,
  title: 'Components/PasswordField',
};

const Template: Story<PasswordProps> = (args) => (
  <div style={{ width: '400px' }}>
    <PasswordField {...args} />
  </div>
);

export const Empty = Template.bind({});
Empty.args = {
  value: '',
  label: 'Password',
  threshold: 3,
  score: 0,
};

export const HasValues = Template.bind({});
HasValues.args = {
  value: 'AVeryStrongP@@55W0rd!@#@!',
  label: 'Password',
  threshold: 3,
  score: 2,
};

export const WithTooltip = Template.bind({});
WithTooltip.args = {
  value: 'AVeryStrongP@@55W0rd!@#@!',
  label: 'Password',
  tooltip: <div>tooltip</div>,
  threshold: 3,
  score: 2,
};
