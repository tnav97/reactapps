import React from 'react';
import { TFunction } from 'i18next';
import { ActionPage, TranslateReady } from '@alcumus/components';
import { unauthorizedUpgrade } from '../../constants/images';

export interface UnauthorizedUpgradePageProps {
  t: TFunction;
  tReady: boolean;
}

export default function UnauthorizedUpgradePage({
  t,
  tReady,
}: UnauthorizedUpgradePageProps) {
  return (
    <TranslateReady tReady={tReady}>
      <ActionPage
        header={t('header')}
        body={t('body')}
        imgAlt={t('unAuthorizedAltTxt')}
        imgSrc={unauthorizedUpgrade}
      />
    </TranslateReady>
  );
}
