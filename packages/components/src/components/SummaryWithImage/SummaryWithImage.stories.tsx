import React from 'react';
import { Story } from '@storybook/react';

import SummaryWithImage, { SummaryWithImageProps } from './SummaryWithImage';

export default {
  component: SummaryWithImage,
  title: 'Components/SummaryWithImage',
};

const Template: Story<SummaryWithImageProps> = (args) => (
  <SummaryWithImage {...args} />
);

export const Summary = Template.bind({});
const imageBaseUrl = 'https://coredevuksstorage01.z33.web.core.windows.net';
Summary.args = {
  imageUrl: `${imageBaseUrl}/supplier-chain-management.png`,
  imageAltText: 'supplier chain management',
  iconUrl: `${imageBaseUrl}/supplier-chain-management.png`,
  header: 'eComplaince',
  subHeader: 'Solving your safety challenges',
  body: 'Safety Manager is an intuitive mobile and web, cloud-based Health and Safety management solution that helps create a safer work environment. Unlike paper-based systems and overly complex legacy safety tools, eCompliance makes it easier to meet regulatory compliance, reduce incident rates and prevent lost time from injuries.',
};
