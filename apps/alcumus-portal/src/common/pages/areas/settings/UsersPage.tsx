import React from 'react';
import SettingsPage from './SettingsPage';
import OrganizationUsers from '../../../components/OrganizationUsers';
import { StyleVariables } from '@alcumus/components';

export default function UsersPage() {
  return (
    <SettingsPage backgroundColor={StyleVariables.colors.base.white}>
      <OrganizationUsers />
    </SettingsPage>
  );
}
