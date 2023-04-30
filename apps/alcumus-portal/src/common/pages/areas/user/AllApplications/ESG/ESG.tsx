import { StyleVariables } from '@alcumus/components';
import { TFunction } from 'i18next';
import React from 'react';
import ProductPage from '../../../../../components/ProductPage';
import UserPage from '../../UserPage';
import { IMAGE_BASE_URL } from '../../../../../constants';

export default function ESG({ t }: { t: TFunction }) {
  const esgProductProps = {
    productName: 'ESG Performance Reporting',
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
    navList: {
      title: t('navListTitle'),
      items: [
        {
          listItem: t('navListItemTitle_01'),
          imageUrl: `${IMAGE_BASE_URL}/logos/ESG/Capabilities - 696x360/Carbon.png`,
          capabilityDetails: <div>{t('navListItemContent_01')}</div>,
        },
        {
          listItem: t('navListItemTitle_02'),
          imageUrl: `${IMAGE_BASE_URL}/logos/ESG/Capabilities - 696x360/Waste.png`,
          capabilityDetails: <div>{t('navListItemContent_02')}</div>,
        },
        {
          listItem: t('navListItemTitle_03'),
          imageUrl: `${IMAGE_BASE_URL}/logos/ESG/Capabilities - 696x360/Water.png`,
          capabilityDetails: <div>{t('navListItemContent_03')}</div>,
        },
        {
          listItem: t('navListItemTitle_04'),
          imageUrl: `${IMAGE_BASE_URL}/logos/ESG/Capabilities - 696x360/People Development.png`,
          capabilityDetails: <div>{t('navListItemContent_04')}</div>,
        },
        {
          listItem: t('navListItemTitle_05'),
          imageUrl: `${IMAGE_BASE_URL}/logos/ESG/Capabilities - 696x360/Forced Labor.png`,
          capabilityDetails: <div>{t('navListItemContent_05')}</div>,
        },
        {
          listItem: t('navListItemTitle_06'),
          imageUrl: `${IMAGE_BASE_URL}/logos/ESG/Capabilities - 696x360/Diversity.png`,
          capabilityDetails: <div>{t('navListItemContent_06')}</div>,
        },
        {
          listItem: t('navListItemTitle_07'),
          imageUrl: `${IMAGE_BASE_URL}/logos/ESG/Capabilities - 696x360/Social Value.png`,
          capabilityDetails: <div>{t('navListItemContent_07')}</div>,
        },
        {
          listItem: t('navListItemTitle_08'),
          imageUrl: `${IMAGE_BASE_URL}/logos/ESG/Capabilities - 696x360/Safety.png`,
          capabilityDetails: <div>{t('navListItemContent_07')}</div>,
        },
        {
          listItem: t('navListItemTitle_09'),
          imageUrl: `${IMAGE_BASE_URL}/logos/ESG/Capabilities - 696x360/Bribery.png`,
          capabilityDetails: <div>{t('navListItemContent_07')}</div>,
        },
        {
          listItem: t('navListItemTitle_10'),
          imageUrl: `${IMAGE_BASE_URL}/logos/ESG/Capabilities - 696x360/Cyber Security.png`,
          capabilityDetails: <div>{t('navListItemContent_07')}</div>,
        },
        {
          listItem: t('navListItemTitle_11'),
          imageUrl: `${IMAGE_BASE_URL}/logos/ESG/Capabilities - 696x360/ESG Profit.png`,
          capabilityDetails: <div>{t('navListItemContent_07')}</div>,
        },
      ],
    },
    checkListTitle: t('checkListTitle'),
    checkList: {
      imageAltText: t('checkListImageAltText'),
      imageUrl: `${IMAGE_BASE_URL}/logos/ESG/Footer Image/Bottom Image.png`,
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
      <ProductPage {...esgProductProps} />
    </UserPage>
  );
}
