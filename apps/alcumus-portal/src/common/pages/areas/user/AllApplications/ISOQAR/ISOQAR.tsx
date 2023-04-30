import { StyleVariables } from '@alcumus/components';
import { TFunction } from 'i18next';
import React from 'react';
import ProductPage from '../../../../../components/ProductPage';
import UserPage from '../../UserPage';
import { IMAGE_BASE_URL } from '../../../../../constants';
import { useTrackPageDuration } from '../../../../../hooks/useTrackPageDuration';

export default function ISOQAR({ t }: { t: TFunction }) {
  const isoqarProductProps = {
    productName: 'ISOQAR',
    backgroundColor: StyleVariables.colors.base.white,
    withContactUs: true,
    withRequestDemo: true,
    summary: {
      iconUrl: `${IMAGE_BASE_URL}/logos/ISOQAR/Product Icon/ISOQAR_80px.svg`,
      header: t('summaryHeader'),
      subHeader: t('summarySubheader'),
      body: t('summaryBody'),
      imageUrl: `${IMAGE_BASE_URL}/logos/ISOQAR/Display Image/Display Image.png`,
      imageAltText: t('summaryImageAltText'),
    },
    imageCarouselTitle: t('imageCarouselTitle'),
    imageCarousel: {
      images: [
        `${IMAGE_BASE_URL}/logos/ISOQAR/Case Study Cust Logos/chubb.png`,
        `${IMAGE_BASE_URL}/logos/ISOQAR/Case Study Cust Logos/access.png`,
        `${IMAGE_BASE_URL}/logos/ISOQAR/Case Study Cust Logos/iomart.png`,
      ],
      maxItemsToDisplay: 3,
    },
    navList: {
      title: t('navListTitle'),
      items: [
        {
          listItem: t('navListItemTitle_01'),
          imageUrl: `${IMAGE_BASE_URL}/logos/ISOQAR/Capabilities - 696x360/Artboard 1 copy 2.png`,
          capabilityDetails: <div>{t('navListItemContent_01')}</div>,
        },
        {
          listItem: t('navListItemTitle_02'),
          imageUrl: `${IMAGE_BASE_URL}/logos/ISOQAR/Capabilities - 696x360/Artboard 1 copy 3.png`,
          capabilityDetails: <div>{t('navListItemContent_02')}</div>,
        },
        {
          listItem: t('navListItemTitle_03'),
          imageUrl: `${IMAGE_BASE_URL}/logos/ISOQAR/Capabilities - 696x360/Artboard 1 copy.png`,
          capabilityDetails: <div>{t('navListItemContent_03')}</div>,
        },
        {
          listItem: t('navListItemTitle_04'),
          imageUrl: `${IMAGE_BASE_URL}/logos/ISOQAR/Capabilities - 696x360/Artboard 1.png`,
          capabilityDetails: <div>{t('navListItemContent_04')}</div>,
        },
      ],
    },
    cardCarouselTitle: t('cardCarouselTitle'),
    cardCarousel: {
      cards: [
        {
          title: t('cardCarouselItemTitle_01'),
          description: t('cardCarouselItemBody_01'),
          image: `${IMAGE_BASE_URL}/logos/ISOQAR/Case Study Cust Logos/chubb.png`,
          name: t('cardCarouselItemName_01'),
          designation: t('cardCarouselItemDesignation_01'),
        },
        {
          title: t('cardCarouselItemTitle_02'),
          description: t('cardCarouselItemBody_02'),
          image: `${IMAGE_BASE_URL}/logos/ISOQAR/Case Study Cust Logos/access.png`,
          name: t('cardCarouselItemName_02'),
          designation: t('cardCarouselItemDesignation_02'),
        },
        {
          title: t('cardCarouselItemTitle_02'),
          description: t('cardCarouselItemBody_02'),
          image: `${IMAGE_BASE_URL}/logos/ISOQAR/Case Study Cust Logos/iomart.png`,
        },
      ],
      itemsToDisplay: 2,
    },
    checkListTitle: t('checkListTitle'),
    checkList: {
      imageAltText: t('checkListImageAltText'),
      imageUrl: `${IMAGE_BASE_URL}/logos/ISOQAR/Footer Image/Bottom Image.png`,
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
        {
          header: t('checkListItemHeader_06'),
          details: t('checkListItemDetails_06'),
        },
        {
          header: t('checkListItemHeader_07'),
          details: t('checkListItemDetails_07'),
        },
      ],
    },
  };
  useTrackPageDuration('ISOQAR Product Page Visited');
  return (
    <UserPage showLeftNav={false}>
      <ProductPage {...isoqarProductProps} />
    </UserPage>
  );
}
