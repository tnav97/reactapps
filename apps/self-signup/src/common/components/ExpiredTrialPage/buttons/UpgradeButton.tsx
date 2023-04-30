import React from 'react';
import WithTFunctionAsProp from '../../../types/WithTFunctionAsProp';
import ActionButton from './ActionButton';
import Analytics from '@alcumus/analytics-package';
import axios from 'axios';

export default function UpgradeButton({ t }: WithTFunctionAsProp) {
  const upgrade = async () => {
    Analytics.getInstance().trackWithCategory(
      'Expired Free Trial',
      'Upgrade selected'
    );
    window.location.assign((await axios.post('/api/upgrade')).data);
  };

  return (
    <ActionButton
      text={t('upgradeButton')}
      onClick={upgrade}
      data-testid="upgradeButton"
    />
  );
}
