import { StyleVariables } from '@alcumus/components';
import React from 'react';
import ProductPage from '../../../../../components/ProductPage';
import UserPage from '../../UserPage';
import { IMAGE_BASE_URL } from '../../../../../constants';
import { TFunction } from 'i18next';
import { useTrackPageDuration } from '../../../../../hooks/useTrackPageDuration';

export default function SupplyChainCompliance({ t }: { t: TFunction }) {
  const supplyChainComplianceProductProps = {
    productName: 'Supply Chain Compliance',
    backgroundColor: StyleVariables.colors.base.white,
    withContactUs: true,
    withRequestDemo: true,
    summary: {
      iconUrl: `${IMAGE_BASE_URL}/logos/ESG/Product Icon/Screen 4_ESG.png`,
      header: t('summaryHeader'),
      subHeader: t('summarySubheader'),
      body: t('summaryBody'),
      imageUrl: `${IMAGE_BASE_URL}/logos/ESG/Display Image/Display Image.png`,
      imageAltText: t('summaryImageAltText'),
    },
    imageCarouselTitle: t('imageCarouselTitle'),
    imageCarousel: {
      images: [
        `${IMAGE_BASE_URL}/logos/SafeContractor/Case Study Cust Logos/akzoNobel.jpg`,
        `${IMAGE_BASE_URL}/logos/SafeContractor/Case Study Cust Logos/abagri.jpg`,
        `${IMAGE_BASE_URL}/logos/SafeContractor/Case Study Cust Logos/bellrock.jpg`,
        `${IMAGE_BASE_URL}/logos/SafeContractor/Case Study Cust Logos/gatwick.jpg`,
        `${IMAGE_BASE_URL}/logos/SafeContractor/Case Study Cust Logos/muller.jpg`,
        `${IMAGE_BASE_URL}/logos/SafeContractor/Case Study Cust Logos/rendall.jpg`,
        `${IMAGE_BASE_URL}/logos/SafeContractor/Case Study Cust Logos/weetabix.jpg`,
      ],
      maxItemsToDisplay: 3,
    },
    navList: {
      title: t('navListTitle'),
      items: [
        {
          listItem: t('navListItemTitle_01'),
          imageUrl: `${IMAGE_BASE_URL}/logos/Supply Chain Compliance/Capabilities - 696x360/Dashboard - All.png`,
          capabilityDetails: <div>{t('navListItemContent_01')}</div>,
        },
        {
          listItem: t('navListItemTitle_02'),
          imageUrl: `${IMAGE_BASE_URL}/logos/Supply Chain Compliance/Capabilities - 696x360/PowerSearch - All (expanded list).png`,
          capabilityDetails: <div>{t('navListItemContent_02')}</div>,
        },
        {
          listItem: t('navListItemTitle_03'),
          imageUrl: `${IMAGE_BASE_URL}/logos/Supply Chain Compliance/Capabilities - 696x360/PowerSearch - Contractors only.png`,
          capabilityDetails: <div>{t('navListItemContent_03')}</div>,
        },
        {
          listItem: t('navListItemTitle_04'),
          imageUrl: `${IMAGE_BASE_URL}/logos/Supply Chain Compliance/Capabilities - 696x360/Profile - Supplier - Documents.png`,
          capabilityDetails: <div>{t('navListItemContent_04')}</div>,
        },
        {
          listItem: t('navListItemTitle_05'),
          imageUrl: `${IMAGE_BASE_URL}/logos/Supply Chain Compliance/Capabilities - 696x360/Profile - Supplier - Questionnaire.png`,
          capabilityDetails: <div>{t('navListItemContent_05')}</div>,
        },
      ],
    },
    cardCarouselTitle: t('cardCarouselTitle'),
    cardCarousel: {
      cards: [
        {
          title: t('cardCarouselItemTitle_01'),
          description: t('cardCarouselItemBody_01'),
          image: `${IMAGE_BASE_URL}/logos/SafeContractor/Case Study Cust Logos/akzoNobel.jpg`,
          name: t('cardCarouselItemName_01'),
          designation: t('cardCarouselItemDesignation_01'),
        },
        {
          title: t('cardCarouselItemTitle_02'),
          description: t('cardCarouselItemBody_02'),
          image: `${IMAGE_BASE_URL}/logos/SafeContractor/Case Study Cust Logos/abagri.jpg`,
        },
        {
          title: t('cardCarouselItemTitle_03'),
          description: t('cardCarouselItemBody_03'),
          image: `${IMAGE_BASE_URL}/logos/SafeContractor/Case Study Cust Logos/bellrock.jpg`,
        },
        {
          title: t('cardCarouselItemTitle_04'),
          description: t('cardCarouselItemBody_04'),
          image: `${IMAGE_BASE_URL}/logos/SafeContractor/Case Study Cust Logos/gatwick.jpg`,
        },
        {
          title: t('cardCarouselItemTitle_05'),
          description: t('cardCarouselItemBody_05'),
          image: `${IMAGE_BASE_URL}/logos/SafeContractor/Case Study Cust Logos/muller.jpg`,
        },
        {
          title: t('cardCarouselItemTitle_06'),
          description: t('cardCarouselItemBody_06'),
          image: `${IMAGE_BASE_URL}/logos/SafeContractor/Case Study Cust Logos/rendall.jpg`,
          name: t('cardCarouselItemName_06'),
          designation: t('cardCarouselItemDesignation_06'),
        },
        {
          title: t('cardCarouselItemTitle_07'),
          description: t('cardCarouselItemBody_07'),
          image: `${IMAGE_BASE_URL}/logos/SafeContractor/Case Study Cust Logos/weetabix.jpg`,
          name: t('cardCarouselItemName_07'),
          designation: t('cardCarouselItemDesignation_07'),
        },
      ],
      itemsToDisplay: 2,
    },
    checkListTitle: t('checkListTitle'),
    checkList: {
      imageAltText: t('checkListImageAltText'),
      imageUrl: `${IMAGE_BASE_URL}/logos/SafeContractor/Footer Image/Bottom Image.png`,
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
      ],
    },
  };
  useTrackPageDuration('SupplyChainCompliance Product Page Visited');
  return (
    <UserPage showLeftNav={false}>
      <ProductPage {...supplyChainComplianceProductProps} />
    </UserPage>
  );
}
