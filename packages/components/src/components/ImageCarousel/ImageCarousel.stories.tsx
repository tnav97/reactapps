import React from 'react';
import { Story } from '@storybook/react';
import ImageCarousel, { ImageCarouselProps } from './ImageCarousel';
import Page from '../Page';

export default {
  title: 'Components/ImageCarousel',
  component: ImageCarousel,
};

const ImageCarouselTemplate: Story<ImageCarouselProps> = (
  args: ImageCarouselProps
) => (
  <Page>
    <ImageCarousel {...args} />
  </Page>
);

export const imageCarousel = ImageCarouselTemplate.bind({});
imageCarousel.args = {
  images: [
    'https://coredevuksstorage01.z33.web.core.windows.net/register-page-backdrop-full.jpg',
    'https://coredevuksstorage01.z33.web.core.windows.net/safe-contractor.png',
    'https://coredevuksstorage01.z33.web.core.windows.net/field-id.png',
    'https://coredevuksstorage01.z33.web.core.windows.net/safety-intellegence.png',
  ],
};
