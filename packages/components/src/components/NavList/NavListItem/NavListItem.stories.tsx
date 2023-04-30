import React from 'react';
import { Story } from '@storybook/react';
import NavListItem, { NavListItemProps } from './NavListItem';
import { Page } from '../../../index';

export default {
  component: NavListItem,
  title: 'Components/NavListItem',
};

const Template: Story<NavListItemProps> = (args) => (
  <Page>
    <NavListItem {...args} />
  </Page>
);

export const Selected = Template.bind({});
Selected.args = {
  label: 'Workplace Inspection',
  isSelected: true,
};

export const NotSelected = Template.bind({});
NotSelected.args = {
  label: 'Workplace Inspection',
};
