import React from 'react';
import { ActionPage } from '@alcumus/components';
import WithTFunctionAsProp from '../../../types/WithTFunctionAsProp';
import ContinueFreeTrialButton from '../buttons/ContinueFreeTrialButton';

export default function SalesAlreadyContacted({ t }: WithTFunctionAsProp) {
  return (
    <ActionPage
      pageTitle={t('salesAlreadyContacted.header')}
      header={t('salesAlreadyContacted.header')}
      imgSrc="/images/bench_with_safety_cap.svg"
      imgAlt={t('salesAlreadyContacted.altText')}
      body={t('salesAlreadyContacted.body')}
      buttons={<ContinueFreeTrialButton t={t} />}
    />
  );
}
