import { StyleVariables } from '@alcumus/components';
import { TFunction } from 'i18next';
import React from 'react';
import ProductPage from '../../../../../components/ProductPage';
import UserPage from '../../UserPage';
import { IMAGE_BASE_URL } from '../../../../../constants';
import { useTrackPageDuration } from '../../../../../hooks/useTrackPageDuration';

export default function PSM({ t }: { t: TFunction }) {
  const psmProductProps = {
    productName: 'People and Safety Management',
    backgroundColor: StyleVariables.colors.base.white,
    withContactUs: true,
    withRequestDemo: true,
    summary: {
      iconUrl: `${IMAGE_BASE_URL}/logos/PSM/Product Icon/PSM_56px.svg`,
      header: t('summaryHeader'),
      subHeader: t('summarySubheader'),
      body: t('summaryBody'),
      imageUrl: `${IMAGE_BASE_URL}/logos/PSM/Display Image/Display Image.png`,
      imageAltText: t('summaryImageAltText'),
    },
    imageCarouselTitle: t('imageCarouselTitle'),
    imageCarousel: {
      images: [
        `${IMAGE_BASE_URL}/logos/PSM/Case Study Cust Logos/presspahn-logo.png`,
        `${IMAGE_BASE_URL}/logos/PSM/Case Study Cust Logos/sim-trava-squarelogo-1635422597741.png`,
      ],
      maxItemsToDisplay: 2,
    },
    navList: {
      title: t('navListTitle'),
      items: [
        {
          listItem: t('navListItemTitle_01'),
          imageUrl: `${IMAGE_BASE_URL}/logos/PSM/Capabilities - 696x360/Artboard 1 copy 2.png`,
          capabilityDetails: <div>{t('navListItemContent_01')}</div>,
        },
        {
          listItem: t('navListItemTitle_02'),
          imageUrl: `${IMAGE_BASE_URL}/logos/PSM/Capabilities - 696x360/Artboard 1 copy 3.png`,
          capabilityDetails: <div>{t('navListItemContent_02')}</div>,
        },
        {
          listItem: t('navListItemTitle_03'),
          imageUrl: `${IMAGE_BASE_URL}/logos/PSM/Capabilities - 696x360/Artboard 1 copy 4.png`,
          capabilityDetails: <div>{t('navListItemContent_03')}</div>,
        },
        {
          listItem: t('navListItemTitle_04'),
          imageUrl: `${IMAGE_BASE_URL}/logos/PSM/Capabilities - 696x360/Artboard 1 copy 5.png`,
          capabilityDetails: <div>{t('navListItemContent_04')}</div>,
        },
        {
          listItem: t('navListItemTitle_05'),
          imageUrl: `${IMAGE_BASE_URL}/logos/PSM/Capabilities - 696x360/Artboard 1 copy 6.png`,
          capabilityDetails: <div>{t('navListItemContent_05')}</div>,
        },
        {
          listItem: t('navListItemTitle_06'),
          imageUrl: `${IMAGE_BASE_URL}/logos/PSM/Capabilities - 696x360/Artboard 1 copy.png`,
          capabilityDetails: <div>{t('navListItemContent_06')}</div>,
        },
        {
          listItem: t('navListItemTitle_07'),
          imageUrl: `${IMAGE_BASE_URL}/logos/PSM/Capabilities - 696x360/Artboard 1.png`,
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
          image: `${IMAGE_BASE_URL}/logos/PSM/Case Study Cust Logos/presspahn-logo.png`,
          name: t('cardCarouselItemName_01'),
          designation: t('cardCarouselItemDesignation_01'),
        },
        {
          title: t('cardCarouselItemTitle_02'),
          description: t('cardCarouselItemBody_02'),
          image: `${IMAGE_BASE_URL}/logos/PSM/Case Study Cust Logos/sim-trava-squarelogo-1635422597741.png`,
          name: t('cardCarouselItemName_02'),
          designation: t('cardCarouselItemDesignation_02'),
        },
      ],
      itemsToDisplay: 2,
    },
    checkListTitle: t('checkListTitle'),
    checkList: {
      imageAltText: t('checkListImageAltText'),
      imageUrl: `${IMAGE_BASE_URL}/logos/PSM/Footer Image/Bottom Image.png`,
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
  useTrackPageDuration('PSM Product Page Visited');
  return (
    <UserPage showLeftNav={false}>
      <ProductPage {...psmProductProps} />
    </UserPage>
  );
}
