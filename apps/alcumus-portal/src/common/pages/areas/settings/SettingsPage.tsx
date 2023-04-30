import { DrawerItem, OutlinedIcon } from '@alcumus/components';
import React from 'react';
import PrivatePage from '../../../components/PrivatePageLayout';
import { Roles } from '../../../constants';
import { RoleAndPermissions } from '../../../types';
import { connect } from 'react-redux';
import { RootReducerState } from '../../../../client/redux/reducers';

const commonItems: Array<DrawerItem> = [
  {
    title: 'My account',
    icon: <OutlinedIcon icon="settings" />,
    href: '/settings/my-account',
    dataTestId: 'myAccount',
  },
];

const userManagement: DrawerItem = {
  title: 'User management',
  icon: <OutlinedIcon icon="person" />,
  href: '/settings/users',
  dataTestId: 'usersManagement',
};

const subscriptionManagement: DrawerItem = {
  title: 'Subscriptions',
  icon: <OutlinedIcon icon="task_alt" />,
  href: '/settings/subscriptions',
  dataTestId: 'subscriptions',
};

const myOrganization: DrawerItem = {
  title: 'My organization',
  icon: <OutlinedIcon icon="map" />,
  href: '/settings/my-organization',
  dataTestId: 'myOrganization',
};

export const drawerItems: Record<string, Array<DrawerItem>> = {
  [Roles.ALCUMUS_ADMIN]: [
    ...commonItems,
    userManagement,
    myOrganization,
    subscriptionManagement,
  ],
  [Roles.ALCUMUS_SUPPORT_TIER_1]: [
    ...commonItems,
    userManagement,
    myOrganization,
    subscriptionManagement,
  ],
  [Roles.ALCUMUS_SUPPORT_TIER_2]: [
    ...commonItems,
    userManagement,
    myOrganization,
    subscriptionManagement,
  ],
  [Roles.ALCUMUS_CUSTOMER_SUCCESS]: [
    ...commonItems,
    userManagement,
    myOrganization,
    subscriptionManagement,
  ],
  [Roles.CLIENT_ADMIN]: [
    ...commonItems,
    userManagement,
    myOrganization,
    subscriptionManagement,
  ],
  [Roles.CLIENT_USER]: [...commonItems],
};

interface AdminPageProps {
  children: React.ReactNode;
  loggedInUserRole?: RoleAndPermissions;
  backgroundColor?: string;
}

export function SettingsPage({
  children,
  loggedInUserRole,
  backgroundColor,
}: AdminPageProps) {
  // change this to use permissions to decide what drawer items will be to future proof it for custom roles
  return (
    <PrivatePage
      drawerItems={drawerItems[loggedInUserRole?.roleLookupKey || ''] || []}
      showBackButton
      backgroundColor={backgroundColor}
    >
      {children}
    </PrivatePage>
  );
}

export default connect(
  ({ authorization: { loggedInUserRole } }: RootReducerState) => ({
    loggedInUserRole: loggedInUserRole,
  })
)(SettingsPage);
