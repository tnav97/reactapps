import React from 'react';
import Container from '@mui/material/Container';
import PrivatePage from '../../../components/PrivatePageLayout';
import { DrawerItem, OutlinedIcon, StyleVariables } from '@alcumus/components';
import Analytics from '@alcumus/analytics-package';
import { MyOrganizationDetails } from '../../../types';
import useSWR from 'swr';
import { CURRENT_ORGANIZATION_PROFILE_URL } from '../../../components/MyOrganization';

const getDrawerItems = (orgName?: string) => {
  return [
    {
      title: 'Home',
      icon: <OutlinedIcon icon="home" />,
      href: '/',
      dataTestId: 'home',
    },
    {
      title: 'All applications',
      icon: <OutlinedIcon icon="storefront" />,
      href: '/all-applications',
      dataTestId: 'allApplications',
      onClick: () => {
        Analytics.getInstance().track('All Applications Visited', {
          organization: orgName,
        });
      },
    },
  ] as DrawerItem[];
};

interface UserPageProps {
  showLeftNav?: boolean;
  children:
    | boolean
    | React.ReactChild
    | React.ReactFragment
    | React.ReactPortal;
}

export default function UserPage({
  children,
  showLeftNav = true,
}: UserPageProps) {
  const { data: myOrganizationDetails } = useSWR<MyOrganizationDetails>(
    CURRENT_ORGANIZATION_PROFILE_URL
  );
  const drawerItems = getDrawerItems(myOrganizationDetails?.tenantName);
  return (
    <PrivatePage
      drawerItems={showLeftNav ? drawerItems : undefined}
      backgroundColor={
        showLeftNav
          ? StyleVariables.colors.background.default
          : StyleVariables.colors.base.white
      }
    >
      {showLeftNav ? <Container>{children}</Container> : children}
    </PrivatePage>
  );
}
