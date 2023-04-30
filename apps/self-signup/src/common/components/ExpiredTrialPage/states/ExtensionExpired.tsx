import React, { useState } from 'react';
import { ActionPage } from '@alcumus/components';
import WithTFunctionAsProp from '../../../types/WithTFunctionAsProp';
import { FeatureToggles } from '../../../constants/featureToggles';
import UpgradeButton from '../buttons/UpgradeButton';
import ContactSalesButton from '../buttons/ContactSalesButton';
import SalesWillContact from './Prompt/SalesWillContact';

export default function ExtensionExpired({ t }: WithTFunctionAsProp) {
  const [salesContacted, setSalesContacted] = useState<boolean>(false);

  return salesContacted ? (
    <SalesWillContact trialExtended={false} t={t} />
  ) : (
    <ActionPage
      pageTitle={t('trialExtensionEnded.header')}
      header={t('trialExtensionEnded.header')}
      imgSrc="/images/bench_with_safety_cap.svg"
      imgAlt={t('trialExtensionEnded.altText')}
      body={t('trialExtensionEnded.body')}
      buttons={
        <>
          <ContactSalesButton onClick={() => setSalesContacted(true)} t={t} />
          {FeatureToggles.showUpgradeCTAButton() && <UpgradeButton t={t} />}
        </>
      }
    />
  );
}
