import React from 'react';
import WithTFunctionAsProp from '../../../types/WithTFunctionAsProp';
import ActionButton from './ActionButton';
import Analytics from '@alcumus/analytics-package';
import axios from 'axios';

export default function ContactSalesButton({
  t,
  onClick,
}: { onClick: Function } & WithTFunctionAsProp) {
  const contactSales = () => {
    Analytics.getInstance().trackWithCategory(
      'Expired Free Trial',
      'Contact Sales selected'
    );
    axios.post('/api/contactSales');
    onClick();
  };

  return (
    <ActionButton
      text={t('contactSalesButton')}
      onClick={contactSales}
      data-testid="contactSalesButton"
    />
  );
}
