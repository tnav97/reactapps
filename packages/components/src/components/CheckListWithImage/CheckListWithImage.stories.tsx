import React from 'react';
import { Story } from '@storybook/react';
import CheckListWithImage, {
  CheckListWithImageProps,
} from './CheckListWithImage';

export default {
  component: CheckListWithImage,
  title: 'Components/CheckListWithImage',
};

const Template: Story<CheckListWithImageProps> = (args) => (
  <CheckListWithImage {...args} />
);

export const ListWithImage = Template.bind({});
const imageBaseUrl = 'https://coredevuksstorage01.z33.web.core.windows.net';
ListWithImage.args = {
  items: [
    {
      header: 'Lorem ipsum dolor sit amet',
      details:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    },
    {
      header: 'Lorem ipsum dolor sit amet',
      details:
        ' Iaculis urna id volutpat lacus laoreet non curabitur. Interdum varius sit amet mattis vulputate.',
    },
    {
      header: 'Lorem ipsum dolor sit amet',
      details:
        'sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Interdum varius sit amet mattis vulputate.',
    },
  ],
  imageUrl: `${imageBaseUrl}/supplier-chain-management.png`,
  imageAltText: 'supplier chain management',
};
