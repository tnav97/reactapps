import React from 'react';
import { Story } from '@storybook/react';
import UserProfileView from './index';
import { UserProfileViewProps } from './UserProfileView';

export default {
  title: 'Components/UserProfileView',
  component: UserProfileView,
};

const MyAccountSectionTemplate: Story<UserProfileViewProps> = (props) => (
  <UserProfileView {...props} />
);

export const MyAccountSection = MyAccountSectionTemplate.bind({});
MyAccountSection.args = { firstName: 'Alyn', lastName: 'Franklyn' };
