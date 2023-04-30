import React from 'react';
import SettingsPage from './SettingsPage';
import OrganizationSubscriptions from '../../../components/OrganizationSubscriptions';
import { StyleVariables } from '@alcumus/components';

export default function SubscriptionsPage() {
  return (
    <SettingsPage backgroundColor={StyleVariables.colors.base.white}>
      <OrganizationSubscriptions />
    </SettingsPage>
  );
}
