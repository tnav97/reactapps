import React from 'react';
import { Story } from '@storybook/react';
import AlertSnackbar, { AlertSnackbarProps } from './AlertSnackbar';
import Page from '../Page';

export default {
  title: 'Components/AlertSnackbar',
  component: AlertSnackbar,
};

const AlertSnackbarTemplate: Story<AlertSnackbarProps> = (props) => {
  return (
    <Page>
      <AlertSnackbar open={true} {...props} />
    </Page>
  );
};

export const Success = AlertSnackbarTemplate.bind({});
Success.args = {
  severity: 'success',
  message: 'A success alert!',
};

export const Error = AlertSnackbarTemplate.bind({});
Error.args = {
  severity: 'error',
  message: 'An error alert!',
};
