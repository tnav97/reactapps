import React from 'react';
import Analytics from '@alcumus/analytics-package';
import axios from 'axios';
import WithTFunctionAsProp from '../../../types/WithTFunctionAsProp';
import ActionButton from './ActionButton';

export default function ExtendFreeTrialButton({
  t,
  onClick,
}: WithTFunctionAsProp & { onClick: Function }) {
  const handleOnTrialExtended = () => {
    Analytics.getInstance().trackWithCategory(
      'Expired Free Trial',
      'Extend Free Trial Selected'
    );
    axios.post('/api/extendFreeTrial', { duration: 7 });
    onClick();
  };

  return (
    <ActionButton
      text={t('extendTrialButton')}
      onClick={handleOnTrialExtended}
      variant="outlined"
      data-testid="extendTrialButton"
    />
  );
}
