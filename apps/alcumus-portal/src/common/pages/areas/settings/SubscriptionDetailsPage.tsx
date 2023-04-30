import React from 'react';
import SettingsPage from './SettingsPage';
import SubscriptionDetails from '../../../components/SubscriptionDetails';
import { StyleVariables } from '@alcumus/components';

export default function SubscriptionDetailsPage() {
  return (
    <SettingsPage backgroundColor={StyleVariables.colors.base.white}>
      <SubscriptionDetails />
    </SettingsPage>
  );
}
