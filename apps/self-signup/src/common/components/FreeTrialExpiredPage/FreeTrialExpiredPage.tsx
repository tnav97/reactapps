import React from 'react';
import { TFunction } from 'i18next';
import {
  TranslateReady,
  ActionPage,
  ActionPageProps,
} from '@alcumus/components';
export interface FreeTrialExpiredPageProps {
  t: TFunction;
  tReady: boolean;
}

export default function FreeTrialExpiredPage({
  t,
  tReady,
}: FreeTrialExpiredPageProps) {
  const actionPageProps: ActionPageProps = {
    header: t('header'),
    body: t('body'),
    imgSrc: '/images/expired_trial.svg',
    imgAlt: t('expiredFreeTrialAltText'),
  };
  return (
    <TranslateReady tReady={tReady}>
      <ActionPage {...actionPageProps} />
    </TranslateReady>
  );
}
