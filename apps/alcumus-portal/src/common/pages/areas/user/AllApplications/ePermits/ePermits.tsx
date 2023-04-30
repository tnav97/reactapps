import React from 'react';
import ProductPage from '../../../../../components/ProductPage';
import UserPage from '../../UserPage';
import { TFunction } from 'i18next';
import { StyleVariables } from '@alcumus/components';
import { IMAGE_BASE_URL } from '../../../../../constants';

export default function ePermits({ t }: { t: TFunction }) {
  const ePermitsProductProps = {
    productName: 'ePermits',
    backgroundColor: StyleVariables.colors.base.white,
    withContactUs: true,
    withRequestDemo: true,
    summary: {
      iconUrl: `${IMAGE_BASE_URL}/logos/ePermits/Product Icon/Screen 5_Sypol.png`,
      header: t('summaryHeader'),
      subHeader: t('summarySubheader'),
      body: t('summaryBody'),
      imageUrl: `${IMAGE_BASE_URL}/logos/ePermits/Display Image/Display Image.png`,
      imageAltText: t('summaryImageAltText'),
    },
    imageCarouselTitle: t('imageCarouselTitle'),
    imageCarousel: {
      images: [
        `${IMAGE_BASE_URL}/logos/ePermits/Case Study Cust Logos/santander.png`,
        `${IMAGE_BASE_URL}/logos/ePermits/Case Study Cust Logos/carillion.jpg`,
      ],
    },
    navList: {
      title: t('navListTitle'),
      items: [
        {
          listItem: t('navListItemTitle_01'),
          imageUrl: `${IMAGE_BASE_URL}/logos/ePermits/Screenshots/2022-05-27-16-27-33.png`,
          capabilityDetails: <div>{t('navListItemContent_01')}</div>,
        },
        {
          listItem: t('navListItemTitle_02'),
          imageUrl: `${IMAGE_BASE_URL}/logos/ePermits/Capabilities - 696x360/Permits.png`,
          capabilityDetails: <div>{t('navListItemContent_02')}</div>,
        },
        {
          listItem: t('navListItemTitle_03'),
          imageUrl: `${IMAGE_BASE_URL}/logos/ePermits/Screenshots/2022-05-27-16-31-10.png`,
          capabilityDetails: <div>{t('navListItemContent_03')}</div>,
        },
        {
          listItem: t('navListItemTitle_04'),
          imageUrl: `${IMAGE_BASE_URL}/logos/ePermits/Screenshots/2022-05-27-16-31-10.png`,
          capabilityDetails: <div>{t('navListItemContent_04')}</div>,
        },
        {
          listItem: t('navListItemTitle_05'),
          imageUrl: `${IMAGE_BASE_URL}/logos/ePermits/Screenshots/2022-05-27-16-31-10.png`,
          capabilityDetails: <div>{t('navListItemContent_05')}</div>,
        },
        {
          listItem: t('navListItemTitle_06'),
          imageUrl: `${IMAGE_BASE_URL}/logos/ePermits/Capabilities - 696x360/Permits - Signature.png`,
          capabilityDetails: <div>{t('navListItemContent_06')}</div>,
        },
        {
          listItem: t('navListItemTitle_07'),
          imageUrl: `${IMAGE_BASE_URL}/logos/ePermits/Screenshots/2022-05-27-16-17-02.png`,
          capabilityDetails: <div>{t('navListItemContent_07')}</div>,
        },
        {
          listItem: t('navListItemTitle_08'),
          imageUrl: `${IMAGE_BASE_URL}/logos/ePermits/Screenshots/2022-05-27-16-18-50.png`,
          capabilityDetails: <div>{t('navListItemContent_08')}</div>,
        },
      ],
    },
    cardCarouselTitle: t('cardCarouselTitle'),
    cardCarousel: {
      cards: [
        {
          title: t('cardCarouselItemTitle_01'),
          description: t('cardCarouselItemBody_01'),
          image: `${IMAGE_BASE_URL}/logos/ePermits/Case Study Cust Logos/santander.png`,
          name: t('cardCarouselItemName_01'),
          designation: t('cardCarouselItemDesignation_01'),
        },
        {
          title: t('cardCarouselItemTitle_02'),
          description: t('cardCarouselItemBody_02'),
          image: `${IMAGE_BASE_URL}/logos/ePermits/Case Study Cust Logos/carillion.jpg`,
          name: t('cardCarouselItemName_02'),
          designation: t('cardCarouselItemDesignation_02'),
        },
      ],
      itemsToDisplay: 2,
    },
    checkListTitle: t('checkListTitle'),
    checkList: {
      imageAltText: t('checkListImageAltText'),
      imageUrl: `${IMAGE_BASE_URL}/logos/ePermits/Footer Image/Bottom Image.png`,
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
        {
          header: t('checkListItemHeader_05'),
          details: t('checkListItemDetails_05'),
        },
      ],
    },
  };
  return (
    <UserPage showLeftNav={false}>
      <ProductPage {...ePermitsProductProps} />
    </UserPage>
  );
}
