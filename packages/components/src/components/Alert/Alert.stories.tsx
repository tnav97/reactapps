import React from 'react';
import { Story } from '@storybook/react';
import Page from '../Page';
import Alert, { AlertProps } from './Alert';

export default {
  title: 'Components/Alert',
  component: Alert,
};

const AlertTemplate: Story<AlertProps> = (props) => {
  return (
    <Page>
      <Alert {...props} />
    </Page>
  );
};

export const Success = AlertTemplate.bind({});
Success.args = {
  severity: 'success',
  message: 'A success alert!',
};

export const Error = AlertTemplate.bind({});
Error.args = {
  severity: 'error',
  message: 'An error alert!',
};

export const Info = AlertTemplate.bind({});
Info.args = {
  severity: 'info',
  message: 'An info alert!',
};

export const Primary = AlertTemplate.bind({});
Primary.args = {
  severity: 'primary',
  message: 'An Primary alert!',
};

export const WithoutClose = AlertTemplate.bind({});
WithoutClose.args = {
  severity: 'info',
  message: 'An info alert!',
  onClose: undefined,
};
