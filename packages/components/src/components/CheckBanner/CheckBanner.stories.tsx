import React from 'react';
import { Story } from '@storybook/react';
import CheckBanner, { CheckedBannerProps } from './CheckBanner';
import { Page } from '../../index';

export default {
  component: CheckBanner,
  title: 'Components/CheckBanner',
};

const Template: Story<CheckedBannerProps> = (args) => (
  <Page>
    <CheckBanner {...args} />
  </Page>
);

export const Banner = Template.bind({});
Banner.args = {
  header: 'Welcome to Alcumus:',
  items: [
    { title: 'Workplace Inspections & Audits', checked: true },
    { title: 'Hazard Identification', checked: false },
  ],
};
