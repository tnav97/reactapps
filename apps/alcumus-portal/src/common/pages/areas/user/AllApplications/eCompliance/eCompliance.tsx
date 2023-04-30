import React from 'react';
import ProductPage from '../../../../../components/ProductPage';
import UserPage from '../../UserPage';
import { TFunction } from 'i18next';
import { StyleVariables } from '@alcumus/components';
import { IMAGE_BASE_URL } from '../../../../../constants';

export default function eCompliance({ t }: { t: TFunction }) {
  const eComplianceProductProps = {
    productName: 'eCompliance',
    backgroundColor: StyleVariables.colors.base.white,
    withContactUs: true,
    withRequestDemo: true,
    summary: {
      iconUrl: `${IMAGE_BASE_URL}/logos/eCompliance/Product Icon/Screen 5_eCompliance.png`,
      header: t('summaryHeader'),
      subHeader: t('summarySubheader'),
      body: t('summaryBody'),
      imageUrl: `${IMAGE_BASE_URL}/logos/eCompliance/Display Image/Display Image.png`,
      imageAltText: t('summaryImageAltText'),
    },
    imageCarouselTitle: t('imageCarouselTitle'),
    imageCarousel: {
      images: [
        `${IMAGE_BASE_URL}/logos/eCompliance/Case Study Cust Logos/roseburg.png`,
        `${IMAGE_BASE_URL}/logos/eCompliance/Case Study Cust Logos/k-line.png`,
      ],
    },
    navList: {
      title: t('navListTitle'),
      items: [
        {
          listItem: t('navListItemTitle_01'),
          imageUrl: `${IMAGE_BASE_URL}/logos/eCompliance/Capabilities - 696x360/Mobile/eComplaince-Phone---Inspection.png`,
          capabilityDetails: <div>{t('navListItemContent_01')}</div>,
        },
        {
          listItem: t('navListItemTitle_02'),
          imageUrl: `${IMAGE_BASE_URL}/logos/eCompliance/Capabilities - 696x360/Mobile/eComplaince-Phone---Create-Action-Item.png`,
          capabilityDetails: <div>{t('navListItemContent_02')}</div>,
        },
        {
          listItem: t('navListItemTitle_03'),
          imageUrl: `${IMAGE_BASE_URL}/logos/eCompliance/Capabilities - 696x360/Laptop/eComplaince-Inspection-Library-2.png`,
          capabilityDetails: <div>{t('navListItemContent_03')}</div>,
        },
        {
          listItem: t('navListItemTitle_04'),
          imageUrl: `${IMAGE_BASE_URL}/logos/eCompliance/Capabilities - 696x360/Laptop/eComplaince-Documents-Listing.png`,
          capabilityDetails: <div>{t('navListItemContent_04')}</div>,
        },
        {
          listItem: t('navListItemTitle_05'),
          imageUrl: `${IMAGE_BASE_URL}/logos/eCompliance/Capabilities - 696x360/Laptop/eComplaince-Inspections-Form.png`,
          capabilityDetails: <div>{t('navListItemContent_05')}</div>,
        },
        {
          listItem: t('navListItemTitle_06'),
          imageUrl: `${IMAGE_BASE_URL}/logos/eCompliance/Capabilities - 696x360/Mobile/eComplaince-Phone---Construction-Equipment.png`,
          capabilityDetails: <div>{t('navListItemContent_06')}</div>,
        },
        {
          listItem: t('navListItemTitle_07'),
          imageUrl: `${IMAGE_BASE_URL}/logos/eCompliance/Capabilities - 696x360/Mobile/eComplaince-Phone---Create-Action-Item.png`,
          capabilityDetails: <div>{t('navListItemContent_07')}</div>,
        },
        {
          listItem: t('navListItemTitle_08'),
          imageUrl: `${IMAGE_BASE_URL}/logos/eCompliance/Capabilities - 696x360/Mobile/eComplaince-Phone---Choose-Form.png`,
          capabilityDetails: <div>{t('navListItemContent_08')}</div>,
        },
        {
          listItem: t('navListItemTitle_09'),
          imageUrl: `${IMAGE_BASE_URL}/logos/eCompliance/Capabilities - 696x360/Laptop/eComplaince-Employee-Training.png`,
          capabilityDetails: <div>{t('navListItemContent_09')}</div>,
        },
        {
          listItem: t('navListItemTitle_10'),
          imageUrl: `${IMAGE_BASE_URL}/logos/eCompliance/Capabilities - 696x360/Mobile/eComplaince-Phone---Training-Certificate-Progress.png`,
          capabilityDetails: <div>{t('navListItemContent_10')}</div>,
        },
        {
          listItem: t('navListItemTitle_11'),
          imageUrl: `${IMAGE_BASE_URL}/logos/eCompliance/Capabilities - 696x360/Laptop/eComplaince-Account-Information.png`,
          capabilityDetails: <div>{t('navListItemContent_11')}</div>,
        },
      ],
    },
    cardCarouselTitle: t('cardCarouselTitle'),
    cardCarousel: {
      cards: [
        {
          title: t('cardCarouselItemTitle_01'),
          description: t('cardCarouselItemBody_01'),
          image: `${IMAGE_BASE_URL}/logos/eCompliance/Case Study Cust Logos/roseburg.png`,
          name: t('cardCarouselItemName_01'),
          designation: t('cardCarouselItemDesignation_01'),
        },
        {
          title: t('cardCarouselItemTitle_02'),
          description: t('cardCarouselItemBody_02'),
          image: `${IMAGE_BASE_URL}/logos/eCompliance/Case Study Cust Logos/k-line.png`,
          name: t('cardCarouselItemName_02'),
          designation: t('cardCarouselItemDesignation_02'),
        },
      ],
      itemsToDisplay: 2,
    },
    checkListTitle: t('checkListTitle'),
    checkList: {
      imageAltText: t('checkListImageAltText'),
      imageUrl: `${IMAGE_BASE_URL}/logos/eCompliance/Footer Image/Bottom Image.png`,
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
      <ProductPage {...eComplianceProductProps} />
    </UserPage>
  );
}
