import React from 'react';
import { Story } from '@storybook/react';
import LabeledCheckBox, { LabeledCheckBoxProps } from './LabeledCheckBox';

export default {
  component: LabeledCheckBox,
  title: 'Components/LabeledCheckBox',
};

const Template: Story<LabeledCheckBoxProps> = (args) => (
  <LabeledCheckBox {...args}>Labeled Check box</LabeledCheckBox>
);

export const UncheckedCheckBox = Template.bind({});
UncheckedCheckBox.args = {
  checked: false,
};

export const CheckedCheckBox = Template.bind({});
CheckedCheckBox.args = {
  checked: true,
};
