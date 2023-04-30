import React from 'react';
import WithTFunctionAsProp from '../../../types/WithTFunctionAsProp';
import ActionButton from './ActionButton';

export default function ContinueFreeTrialButton({ t }: WithTFunctionAsProp) {
  const continueTrial = () => {
    window.location.assign('/api/redirects/login');
  };

  return (
    <ActionButton
      text={t('continueTrialButton')}
      onClick={continueTrial}
      data-testid="continueTrialButton"
    />
  );
}
