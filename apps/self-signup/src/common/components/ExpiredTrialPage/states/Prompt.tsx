import axios from 'axios';
import React, { useState } from 'react';
import { FeatureToggles } from '../../../constants/featureToggles';
import WithTFunctionAsProp from '../../../types/WithTFunctionAsProp';
import SalesWillContact from './Prompt/SalesWillContact';
import TrialExtended from './Prompt/TrialExtended';
import { ActionPage } from '@alcumus/components';
import ContactSalesButton from '../buttons/ContactSalesButton';
import UpgradeButton from '../buttons/UpgradeButton';
import ExtendFreeTrialButton from '../buttons/ExtendFreeTrialButton';

export default function Prompt({ t }: WithTFunctionAsProp) {
  const [salesContactInitiated, setSalesContactInitiated] =
    useState<boolean>(false);
  const [trialExtended, setTrialExtended] = useState<boolean>(false);

  const handleOnTrialExtended = () => {
    setTrialExtended(true);
  };

  const handleOnContactSales = () => {
    axios.post('/api/extendFreeTrial', { duration: 7 });
    setTrialExtended(true);
    setSalesContactInitiated(true);
  };

  if (salesContactInitiated) {
    return <SalesWillContact t={t} trialExtended={trialExtended} />;
  } else if (trialExtended) {
    return <TrialExtended t={t} />;
  } else {
    return (
      <ActionPage
        pageTitle={t('prompt.header')}
        header={t('prompt.header')}
        imgSrc="/images/expired_trial.svg"
        imgAlt={t('prompt.altText')}
        body={t('prompt.bodyText')}
        buttons={
          <>
            <ExtendFreeTrialButton t={t} onClick={handleOnTrialExtended} />
            <ContactSalesButton onClick={handleOnContactSales} t={t} />
            {FeatureToggles.showUpgradeCTAButton() && <UpgradeButton t={t} />}
          </>
        }
      />
    );
  }
}
