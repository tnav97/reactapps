import React from 'react';
import LoadingPage from './LoadingPage';

export default {
  title: 'Utility Components/LoadingPage',
  component: LoadingPage,
  argTypes: {
    message: {
      control: { type: 'text' },
    },
  },
};

export const withDefaultBehavior = (args) => <LoadingPage {...args} />;
