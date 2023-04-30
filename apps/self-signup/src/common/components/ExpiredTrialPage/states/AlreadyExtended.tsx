import React from 'react';
import { ActionPage } from '@alcumus/components';
import WithTFunctionAsProp from '../../../types/WithTFunctionAsProp';
import ContinueFreeTrialButton from '../buttons/ContinueFreeTrialButton';

export default function AlreadyExtended({ t }: WithTFunctionAsProp) {
  return (
    <ActionPage
      pageTitle={t('alreadyExtended.header')}
      header={t('alreadyExtended.header')}
      imgSrc="/images/bench_with_safety_cap.svg"
      imgAlt={t('alreadyExtended.altText')}
      body={t('alreadyExtended.body')}
      buttons={<ContinueFreeTrialButton t={t} />}
    />
  );
}
