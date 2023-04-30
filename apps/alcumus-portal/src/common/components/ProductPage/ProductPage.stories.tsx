import { Page, Text, StyleVariables } from '@alcumus/components';
import { Story } from '@storybook/react';
import React from 'react';
import ProductPage from '.';
import { ProductPageProps } from './ProductPage';
import { makeStyles } from '@mui/styles';

export default {
  title: 'Components/ProductPage',
  component: ProductPage,
};
const useStyles = makeStyles({
  page: { backgroundColor: StyleVariables.colors.base.white },
});
const CardTemplate: Story<ProductPageProps> = (args: ProductPageProps) => {
  const classes = useStyles();
  return (
    <Page className={classes.page}>
      <ProductPage {...args} />
    </Page>
  );
};

export const ProdPage = CardTemplate.bind({});
const imageBaseUrl = 'https://coredevuksstorage01.z33.web.core.windows.net';
ProdPage.args = {
  imageCarouselTitle:
    'Trusted by over 4,000 innovative companies around the world',
  cardCarouselTitle: 'Hear what our customers are saying',
  checkListTitle: 'Why Safety Manager?',
  withContactUs: true,
  withRequestDemo: true,
  navList: {
    title: 'Product capabilities',
    items: [
      {
        listItem: 'Workplace Inspections & Audits',
        imageUrl: `${imageBaseUrl}/logos/SafeSupplier/Capabilities - 696x360/Alphabet Services.png`,
        capabilityDetails: (
          <div>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </div>
        ),
      },
      {
        listItem: 'Hazard Inspections',
        imageUrl: `${imageBaseUrl}/chemical-hazard-management.png`,
        capabilityDetails: (
          <div>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </div>
        ),
      },
      {
        listItem: 'Hazard Assessments',
        imageUrl: `${imageBaseUrl}/logos/SafeSupplier/Capabilities - 696x360/Reporting.png`,
        capabilityDetails: (
          <div>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </div>
        ),
      },
      {
        imageUrl: `${imageBaseUrl}/logos/SafeSupplier/Capabilities - 696x360/Statistics.png`,
        listItem: 'Hazard Identification',
        capabilityDetails: (
          <Text as="h5" style={{ fontWeight: '500', color: '#333333' }}>
            <span style={{ color: '#137FAA' }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit
            </span>{' '}
            sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            Dictum varius duis at consectetur lorem donec massa sapien.
          </Text>
        ),
      },
      {
        listItem: 'Workplace Inspections & Audits',
        imageUrl: `${imageBaseUrl}/logos/SafeSupplier/Capabilities - 696x360/Alphabet Services.png`,
        capabilityDetails: (
          <div>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </div>
        ),
      },
      {
        listItem: 'Hazard Identification',
        imageUrl: `${imageBaseUrl}/logos/SafeSupplier/Capabilities - 696x360/My Suppliers.png`,
        capabilityDetails: (
          <div>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </div>
        ),
      },
    ],
  },
  checkList: {
    imageAltText: 'ipsumLorem',
    imageUrl: `${imageBaseUrl}/logos/SafeSupplier/Display%20Image/Display%20Image.png`,
    items: [
      {
        header: 'Eliminate time consuming manual process',
        details:
          'Spend less time collectiving and entering data into a safety system and more time conducting  job site observations.',
      },
      {
        header: 'Uncover Hidden Risks',
        details:
          'Gain more transparency into the safety program and performance to mitigate more risks and reduce lost-time injuries',
      },
      {
        header: 'Strengthen Front-line Communications',
        details:
          'Create a communication channel between employees and management to ensure effective implementation and continual improvement of your occupational health and safety management system',
      },
    ],
  },
  cardCarousel: {
    cards: [
      {
        title: '300-400% participation rate',
        description:
          '"From day one to now, we have a 300-400% increase in participation rates. In May 2016, when introduced, Alcumus eCompliance had 167 incidents reported for that month. sIn May of 2020, 846 incidents were reported in that month.”',
        image: `${imageBaseUrl}/logos/SafeSupplier/Case Study Cust Logos/abagri.jpg`,
      },
      {
        title: '15-20 minutes to train anyone',
        description:
          "“One of the best features about Alcumus is it can also be used on a mobile app on the job site. This makes things much easier when inspecting sites. It’s on-the-go and a very easy tool to navigate. It's also easy to configure, which provides great flexibility. We had people who loved paperwork. I would say over 50% of our workforce were intensively paper-oriented.”",
        image: `${imageBaseUrl}/logos/SafeSupplier/Case Study Cust Logos/akzoNobel.jpg`,
      },
      {
        title: 'some other title',
        description:
          "“One of the best features about Alcumus is it can also be used on a mobile app on the job site. This makes things much easier when inspecting sites. It’s on-the-go and a very easy tool to navigate. It's also easy to configure, which provides great flexibility. We had people who loved paperwork. I would say over 50% of our workforce were intensively paper-oriented.”",
        image: `${imageBaseUrl}/logos/SafeSupplier/Case Study Cust Logos/gatwick.jpg`,
      },
    ],
    itemsToDisplay: 2,
  },
  imageCarousel: {
    images: [
      `${imageBaseUrl}/logos/SafeSupplier/Case Study Cust Logos/abagri.jpg`,
      `${imageBaseUrl}/logos/SafeSupplier/Case Study Cust Logos/akzoNobel.jpg`,
      `${imageBaseUrl}/logos/SafeSupplier/Case Study Cust Logos/bellrock.jpg`,
      `${imageBaseUrl}/logos/SafeSupplier/Case Study Cust Logos/gatwick.jpg`,
    ],
    maxItemsToDisplay: 3,
  },
  summary: {
    iconUrl: `${imageBaseUrl}/logos/SafeSupplier/Product Icon/Screen 4_SafeSupplier.png`,
    header: 'eCompliance',
    subHeader: 'Solving your safety challenges',
    body: 'Alcumus eCompliance is an intuitive mobile and web, cloud-based Health and Safety management solution that helps create a safer work environment. Unlike paper-based systems and overly complex legacy safety tools, eCompliance makes it easier to meet regulatory compliance, reduce incident rates and prevent lost time from injuries. ',
    imageUrl: `${imageBaseUrl}/logos/SafeSupplier/Display%20Image/Display%20Image.png`,
    imageAltText: 'eCompliance',
  },
  backgroundColor: StyleVariables.colors.base.white,
};
