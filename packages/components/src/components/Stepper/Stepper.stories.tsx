import React from 'react';
import { Story } from '@storybook/react';
import Stepper, { StepperProps } from './Stepper';

export default {
  title: 'Components/Stepper',
  component: Stepper,
};

const PasswordStrengthMeterTemplate: Story<StepperProps> = (
  args: StepperProps
) => (
  <div style={{ width: '600px' }}>
    <Stepper {...args} />
  </div>
);

export const ZeroPercent = PasswordStrengthMeterTemplate.bind({});
ZeroPercent.args = {
  steps: 4,
  activeStep: 0,
};

export const FiftyPercent = PasswordStrengthMeterTemplate.bind({});
FiftyPercent.args = {
  steps: 4,
  activeStep: 2,
};

export const HundredPercent = PasswordStrengthMeterTemplate.bind({});
HundredPercent.args = {
  steps: 4,
  activeStep: 4,
};
