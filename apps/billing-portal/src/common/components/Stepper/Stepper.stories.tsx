import React from 'react';
import { Story } from '@storybook/react';
import Stepper, { StepperProps } from './Stepper';
import { Page } from '@alcumus/components';

export default {
  title: 'Components/Stepper',
  component: Stepper,
};

const StepperTemplate: Story<StepperProps> = (args: StepperProps) => (
  <Page>
    <Stepper {...args} />
  </Page>
);

export const FourStepsStepper = StepperTemplate.bind({});
FourStepsStepper.args = {
  steps: ['Select plan', 'Review', 'confirm', 'Payment'],
  activeStep: 1,
};
