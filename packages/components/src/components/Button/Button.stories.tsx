import React from 'react';
import Button, { ButtonProps } from './Button';
import { Story } from '@storybook/react';

export default {
  component: Button,
  title: 'Components/Button',
};

const Template: Story<ButtonProps> = (args) => (
  <Button {...args}>Button</Button>
);

export const Contained = Template.bind({});
Contained.args = {
  variant: 'contained',
  disabled: false,
  uppercase: false,
  rounded: true,
  fullWidth: false,
};

export const Outlined = Template.bind({});
Outlined.args = {
  variant: 'outlined',
  disabled: false,
  uppercase: false,
  rounded: true,
  fullWidth: false,
};
