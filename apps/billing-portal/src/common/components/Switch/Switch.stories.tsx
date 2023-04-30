import React from 'react';
import { Story } from '@storybook/react';
import Switch, { SwitchProps } from './Switch';

export default {
  title: 'Components/Switch',
  component: Switch,
};

const SwitchTemaplate: Story<SwitchProps> = (args: SwitchProps) => (
  <div style={{ width: '600px' }}>
    <Switch {...args} />
  </div>
);

export const SwitchWithLables = SwitchTemaplate.bind({});
SwitchWithLables.args = {
  leftLabel: 'Monthly',
  rightLabel: 'Yearly',
};
