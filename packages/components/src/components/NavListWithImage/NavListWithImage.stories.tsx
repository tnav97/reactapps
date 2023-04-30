import React from 'react';
import { Story } from '@storybook/react';
import { NavListWithImage, NavListWithImageProps } from './NavListWithImage';
import { Page, Text } from '../../index';

export default {
  component: NavListWithImage,
  title: 'Components/NavListWithImage',
};

const Template: Story<NavListWithImageProps> = (args) => (
  <Page>
    <NavListWithImage {...args} />
  </Page>
);

export const NavListStory = Template.bind({});
const imageBaseUrl = 'https://coredevuksstorage01.z33.web.core.windows.net';
NavListStory.args = {
  title: 'Product capabilities',
  items: [
    {
      imageUrl: `${imageBaseUrl}/supplier-chain-management.png`,
      listItem: 'Workplace Inspections & Audits',
      capabilityDetails: (
        <Text as="h6" style={{ fontWeight: '500', color: '#333333' }}>
          Streamline your inspection and audit processes with the ability to
          create action items and monitor all completion statuses to drive
          worker participation.
        </Text>
      ),
    },
    {
      imageUrl: `${imageBaseUrl}/chemical-hazard-management.png`,
      listItem: 'Hazard Identification',
      capabilityDetails: (
        <Text as="h6" style={{ fontWeight: '500', color: '#333333' }}>
          <span style={{ color: '#137FAA' }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit
          </span>{' '}
          sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          Dictum varius duis at consectetur lorem donec massa sapien. Ultricies
          lacus sed turpis tincidunt id aliquet. Ipsum dolor sit amet
          consectetur adipiscing elit. Sit amet facilisis magna etiam tempor
          orci.
        </Text>
      ),
    },
  ],
};
