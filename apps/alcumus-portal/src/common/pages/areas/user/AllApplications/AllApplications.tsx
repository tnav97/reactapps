import React from 'react';
import HomePageAllApps from '../../../../components/HomePageAllApps';
import UserPage from '../UserPage';

export default function AllApplications() {
  return (
    <UserPage>
      <HomePageAllApps />
    </UserPage>
  );
}
