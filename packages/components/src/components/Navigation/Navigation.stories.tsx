import React from 'react';
import { action } from '@storybook/addon-actions';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Navigation } from './Navigation';
import Text from '../Text';
import { MemoryRouter } from 'react-router-dom';
import DrawerContent from './DrawerContent';
import { OutlinedIcon } from '../Icon';

export default {
  title: 'Components/Navigation/Navigation',
  component: Navigation,
};

const DrawerItems = [
  {
    title: 'Home',
    icon: <OutlinedIcon icon="home" />,
    href: '/',
    dataTestId: 'home',
  },
  {
    title: 'Dashboard',
    icon: <OutlinedIcon icon="dashboard" />,
    href: '/dashboard',
    dataTestId: 'dashboard',
  },
  {
    title: 'Store',
    icon: <OutlinedIcon icon="storefront" />,
    dataTestId: 'store',
  },
  {
    title: 'Settings',
    icon: <OutlinedIcon icon="settings" />,
    href: '/settings',
    dataTestId: 'settings',
  },
];

export const withAppBarAndDrawer = () => (
  <MemoryRouter initialIndex={0} initialEntries={['/', '/documents']}>
    <Navigation
      logoUrl="https://coredevuksstorage01.z33.web.core.windows.net/alcumus-logo.svg"
      logoAltText="Alcumus Logo"
      logoRedirect="/"
      onToggleDrawer={action('Toggle Drawer')}
      userContent={
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Text as="small">user@company.com</Text>
          <AccountCircleIcon fontSize="large" color="primary" />
        </div>
      }
      drawerContent={<DrawerContent drawerItems={DrawerItems} />}
    />
  </MemoryRouter>
);

export const simple = () => (
  <MemoryRouter>
    <Navigation
      logoUrl="https://coredevuksstorage01.z33.web.core.windows.net/alcumus-logo.svg"
      logoAltText="Alcumus Logo"
      logoRedirect="/"
    />
  </MemoryRouter>
);
