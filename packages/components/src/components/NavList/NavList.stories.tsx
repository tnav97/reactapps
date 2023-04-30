import React from 'react';
import { Story } from '@storybook/react';
import NavList, { NavListProps } from './NavList';
import { Page } from '../../index';

export default {
  component: NavList,
  title: 'Components/NavList',
};

const Template: Story<NavListProps> = (args) => (
  <Page>
    <NavList {...args} />
  </Page>
);

export const NavListStory = Template.bind({});
NavListStory.args = {
  items: [
    'Workplace Inspections & Audits',
    'Hazard Identification',
    'Corrective & Preventative Actions (CAPA)',
    'Tracking Training Certification',
  ],
  seletedIndex: 1,
};
