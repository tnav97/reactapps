import React from 'react';
import ProductPage from '../../../../../components/ProductPage';
import UserPage from '../../UserPage';
import { TFunction } from 'i18next';
import { StyleVariables } from '@alcumus/components';
import { IMAGE_BASE_URL } from '../../../../../constants';

export default function SafetyIntelligence({ t }: { t: TFunction }) {
  const safetyIntelligenceProductProps = {
    productName: 'Safety Intelligence',
    backgroundColor: StyleVariables.colors.base.white,
    withContactUs: true,
    withRequestDemo: true,
    summary: {
      iconUrl: `${IMAGE_BASE_URL}/logos/Safety Intelligence/Product Icon/Screen 5_Safety Intellegence.png`,
      header: t('summaryHeader'),
      subHeader: t('summarySubheader'),
      body: t('summaryBody'),
      imageUrl: `${IMAGE_BASE_URL}/logos/Safety Intelligence/Display Image/Display Image.png`,
      imageAltText: t('summaryImageAltText'),
    },
    imageCarouselTitle: t('imageCarouselTitle'),
    navList: {
      title: t('navListTitle'),
      items: [
        {
          listItem: t('navListItemTitle_01'),
          imageUrl: `${IMAGE_BASE_URL}/logos/Safety Intelligence/Capabilities - 696x360/TRIF SI Dashboard.png`,
          capabilityDetails: <div>{t('navListItemContent_01')}</div>,
        },
        {
          listItem: t('navListItemTitle_02'),
          imageUrl: `${IMAGE_BASE_URL}/logos/Safety Intelligence/Capabilities - 696x360/Root Cause Analysis.png`,
          capabilityDetails: <div>{t('navListItemContent_02')}</div>,
        },
        {
          listItem: t('navListItemTitle_03'),
          imageUrl: `${IMAGE_BASE_URL}/logos/Safety Intelligence/Capabilities - 696x360/Laptop - Safety Intellegence - Reports - Scheduled Events 2.png`,
          capabilityDetails: <div>{t('navListItemContent_03')}</div>,
        },
        {
          listItem: t('navListItemTitle_04'),
          imageUrl: `${IMAGE_BASE_URL}/logos/Safety Intelligence/Capabilities - 696x360/SI Dashboards.png`,
          capabilityDetails: <div>{t('navListItemContent_04')}</div>,
        },
        {
          listItem: t('navListItemTitle_05'),
          imageUrl: `${IMAGE_BASE_URL}/logos/Safety Intelligence/Capabilities - 696x360/Safety Intellegence Report copy 2.png`,
          capabilityDetails: <div>{t('navListItemContent_05')}</div>,
        },
        {
          listItem: t('navListItemTitle_06'),
          imageUrl: `${IMAGE_BASE_URL}/logos/Safety Intelligence/Capabilities - 696x360/Safety Intellegence Report.png`,
          capabilityDetails: <div>{t('navListItemContent_06')}</div>,
        },
        {
          listItem: t('navListItemTitle_07'),
          imageUrl: `${IMAGE_BASE_URL}/logos/Safety Intelligence/Capabilities - 696x360/Safety Intellegence Report copy 3.png`,
          capabilityDetails: <div>{t('navListItemContent_07')}</div>,
        },
      ],
    },
    cardCarouselTitle: t('cardCarouselTitle'),
    cardCarousel: {
      cards: [
        {
          title: t('cardCarouselItemTitle_01'),
          description: t('cardCarouselItemBody_01'),
          image: ``,
          name: t('cardCarouselItemName_01'),
          designation: t('cardCarouselItemDesignation_01'),
        },
        {
          title: t('cardCarouselItemTitle_02'),
          description: t('cardCarouselItemBody_02'),
          image: ``,
          name: t('cardCarouselItemName_02'),
          designation: t('cardCarouselItemDesignation_02'),
        },
      ],
      itemsToDisplay: 2,
    },
    checkListTitle: t('checkListTitle'),
    checkList: {
      imageAltText: t('checkListImageAltText'),
      imageUrl: `${IMAGE_BASE_URL}/logos/Safety Intelligence/Footer Image/Bottom Image.png`,
      items: [
        {
          header: t('checkListItemHeader_01'),
          details: t('checkListItemDetails_01'),
        },
        {
          header: t('checkListItemHeader_02'),
          details: t('checkListItemDetails_02'),
        },
        {
          header: t('checkListItemHeader_03'),
          details: t('checkListItemDetails_03'),
        },
        {
          header: t('checkListItemHeader_04'),
          details: t('checkListItemDetails_04'),
        },
      ],
    },
  };
  return (
    <UserPage showLeftNav={false}>
      <ProductPage {...safetyIntelligenceProductProps} />
    </UserPage>
  );
}
