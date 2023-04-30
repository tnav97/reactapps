import React from 'react';
import Image from './Image';

const IMAGE_URL = 'https://place-hold.it/1500x1000/333/fff/000.gif';

export default {
  title: 'Components/Image',
  component: Image,
  argTypes: {
    src: {
      control: { type: 'text' },
      defaultValue: IMAGE_URL,
    },
    alt: {
      control: { type: 'text' },
      defaultValue: 'image description',
    },
  },
};

export const withDefaultBehavior = (args) => <Image {...args} />;

export const withLazyLoadedImage = (args) => <Image lazy {...args} />;
