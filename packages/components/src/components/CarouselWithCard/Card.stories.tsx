import { Story } from '@storybook/react';
import React from 'react';
import Page from '../Page';
import Card, { CardProps } from './Card';

export default {
  title: 'Components/CarouselWithCard',
  component: Card,
};
const CardTemplate: Story<CardProps> = (args: CardProps) => (
  <Page>
    <Card {...args} />
  </Page>
);

export const card = CardTemplate.bind({});

card.args = {
  image:
    'https://coredevuksstorage01.z33.web.core.windows.net/safe-supplier.png',
  title: '15-20 minutes to train anyone',
  description:
    "One of the best features about Alcumus is it can also be used on a mobile app on the job site. This makes things much easier when inspecting sites. It's on-the-go and a very easy tool to navigate. It's also easy to configure, which provides great flexibility. We had people who loved paperwork. I would say over 50% of our workforce were intensively paper-oriented.",
  name: 'Vincent Saldanha',
  designation: 'Director of HSEQ',
};
