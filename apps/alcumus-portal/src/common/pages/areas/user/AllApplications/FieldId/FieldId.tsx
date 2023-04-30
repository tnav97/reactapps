import React from 'react';
import ProductPage from '../../../../../components/ProductPage';
import UserPage from '../../UserPage';
import { TFunction } from 'i18next';
import { StyleVariables } from '@alcumus/components';
import { IMAGE_BASE_URL } from '../../../../../constants';

export default function FieldId({ t }: { t: TFunction }) {
  const fieldIdProductProps = {
    productName: 'Field ID',
    backgroundColor: StyleVariables.colors.base.white,
    withContactUs: true,
    withRequestDemo: true,
    summary: {
      iconUrl: `${IMAGE_BASE_URL}/logos/Field ID/Product Icon/Screen 5_Field ID.png`,
      header: t('summaryHeader'),
      subHeader: t('summarySubheader'),
      body: t('summaryBody'),
      imageUrl: `${IMAGE_BASE_URL}/logos/Field ID/Display Image/Display Image.png`,
      imageAltText: t('summaryImageAltText'),
    },
    imageCarouselTitle: t('imageCarouselTitle'),
    navList: {
      title: t('navListTitle'),
      items: [
        {
          listItem: t('navListItemTitle_01'),
          imageUrl: `${IMAGE_BASE_URL}/logos/Field ID/Capabilities - 696x360/Combined/Laptop - Management Event Inspection.png`,
          capabilityDetails: <div>{t('navListItemContent_01')}</div>,
        },
        {
          listItem: t('navListItemTitle_02'),
          imageUrl: `${IMAGE_BASE_URL}/logos/Field ID/Capabilities - 696x360/Mobile/FieldiD-Phone---Scheduled-Events.png`,
          capabilityDetails: <div>{t('navListItemContent_02')}</div>,
        },
        {
          listItem: t('navListItemTitle_03'),
          imageUrl: `${IMAGE_BASE_URL}/logos/Field ID/Capabilities - 696x360/Combined/Laptop - Safety Intellegence - Reports - Scheduled Events 2.png`,
          capabilityDetails: <div>{t('navListItemContent_03')}</div>,
        },
        {
          listItem: t('navListItemTitle_04'),
          imageUrl: `${IMAGE_BASE_URL}/logos/Field ID/Capabilities - 696x360/Combined/Laptop - Schedule Rules.png`,
          capabilityDetails: <div>{t('navListItemContent_04')}</div>,
        },
        {
          listItem: t('navListItemTitle_05'),
          imageUrl: `${IMAGE_BASE_URL}/logos/Field ID/Capabilities - 696x360/Mobile/FieldiD-Phone---Scanning-Barcode.png`,
          capabilityDetails: <div>{t('navListItemContent_05')}</div>,
        },
        {
          listItem: t('navListItemTitle_06'),
          imageUrl: `${IMAGE_BASE_URL}/logos/Field ID/Capabilities - 696x360/Combined/Laptop - Procedures.png`,
          capabilityDetails: <div>{t('navListItemContent_06')}</div>,
        },
        {
          listItem: t('navListItemTitle_07'),
          imageUrl: `${IMAGE_BASE_URL}/logos/Field ID/Capabilities - 696x360/Mobile/FieldiD-Phone---Details.png`,
          capabilityDetails: <div>{t('navListItemContent_07')}</div>,
        },
        {
          listItem: t('navListItemTitle_08'),
          imageUrl: `${IMAGE_BASE_URL}/logos/Field ID/Capabilities - 696x360/Laptop/FieldiD-Laptop---Email.png`,
          capabilityDetails: <div>{t('navListItemContent_08')}</div>,
        },
      ],
    },
    cardCarouselTitle: t('cardCarouselTitle'),
    checkListTitle: t('checkListTitle'),
    checkList: {
      imageAltText: t('checkListImageAltText'),
      imageUrl: `${IMAGE_BASE_URL}/logos/Field ID/Footer Image/Bottom Image.png`,
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
      <ProductPage {...fieldIdProductProps} />
    </UserPage>
  );
}
