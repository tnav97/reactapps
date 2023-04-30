import React from 'react';
import { Story } from '@storybook/react';
import MyAccountSection from './index';
import { MyAccountSectionProps } from './MyAccountSection';

export default {
  title: 'Components/MyAccountSection',
  component: MyAccountSection,
};

const MyAccountSectionTemplate: Story<MyAccountSectionProps> = (props) => (
  <MyAccountSection {...props} />
);

export const withoutEditButton = MyAccountSectionTemplate.bind({});
withoutEditButton.args = {
  header: 'Header',
  subHeader: 'SubHeader',
  children: <h3>Some Children</h3>,
};

export const withEditButton = MyAccountSectionTemplate.bind({});
withEditButton.args = {
  header: 'Header',
  subHeader: 'SubHeader',
  editable: true,
  children: <h3>Some Children</h3>,
};
