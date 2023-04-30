import { Story } from '@storybook/react';
import React from 'react';
import Page from '../Page';
import CarouselWithCard, { CarouselWithCardProps } from './CarouselWithCard';

export default {
  title: 'Components/CarouselWithCard',
  component: CarouselWithCard,
};
const CarouselWithCardTemplate: Story<CarouselWithCardProps> = (
  args: CarouselWithCardProps
) => (
  <Page>
    <CarouselWithCard {...args} />
  </Page>
);

export const carouselWithCard = CarouselWithCardTemplate.bind({});
carouselWithCard.args = {
  cards: [
    {
      image:
        'https://coredevuksstorage01.z33.web.core.windows.net/logos/SafeContractor/Case Study Cust Logos/gatwick.jpg',
      title: '15-20 minutes to train anyone',
      description:
        "One of the best features about Alcumus is it can also be used on a mobile app on the job site. This makes things much easier when inspecting sites. It's on-the-go and a very easy tool to navigate. It's also easy to configure, which provides great flexibility. We had people who loved paperwork. I would say over 50% of our workforce were intensively paper-oriented.",
      name: 'Vincent Saldanha',
      designation: 'Director of HSEQ',
    },
    {
      image:
        'https://coredevuksstorage01.z33.web.core.windows.net/logos/SafeContractor/Case Study Cust Logos/akzoNobel.jpg',
      title: '300-400% participation rate',
      description:
        'From day one to now, we have a 300-400% increase in participation rates. In May 2016, when introduced, Alcumus eCompliance had 167 incidents reported for that month. In May of 2020, 846 incidents were reported in that month.',
      name: 'Vincent Saldanha',
      designation: 'Director of HSEQ',
    },
    {
      image:
        'https://coredevuksstorage01.z33.web.core.windows.net/logos/SafeContractor/Case Study Cust Logos/weetabix.jpg',
      title: '15-20 minutes to train anyone',
      description:
        "One of the best features about Alcumus is it can also be used on a mobile app on the job site. This makes things much easier when inspecting sites. It's on-the-go and a very easy tool to navigate. It's also easy to configure, which provides great flexibility. We had people who loved paperwork. I would say over 50% of our workforce were intensively paper-oriented.",
      name: 'Vincent Saldanha',
      designation: 'Director of HSEQ',
    },
    {
      image:
        'https://coredevuksstorage01.z33.web.core.windows.net/logos/SafeContractor/Case Study Cust Logos/bellrock.jpg',
      title: '300-400% participation rate',
      description:
        'From day one to now, we have a 300-400% increase in participation rates. In May 2016, when introduced, Alcumus eCompliance had 167 incidents reported for that month. In May of 2020, 846 incidents were reported in that month.',
      name: 'Vincent Saldanha',
      designation: 'Director of HSEQ',
    },
  ],
};
