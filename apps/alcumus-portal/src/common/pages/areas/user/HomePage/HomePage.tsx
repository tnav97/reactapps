import React from 'react';
import HomePageContent from '../../../../components/HomePageContent';
import UserPage from '../UserPage';

export default function HomePage() {
  return (
    <UserPage>
      <HomePageContent />
    </UserPage>
  );
}
