import React from 'react';
import AppBar, { AppBarProps } from './AppBar';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Text from '../Text';
import { MemoryRouter } from 'react-router-dom';

export default {
  title: 'Components/Navigation/AppBar',
  component: AppBar,
};

const AppBarWithMemoryRouter = (props: AppBarProps) => (
  <MemoryRouter>
    <AppBar {...props} />
  </MemoryRouter>
);

export const withDefaults = () => (
  <AppBarWithMemoryRouter
    logoUrl="https://coredevuksstorage01.z33.web.core.windows.net/alcumus-logo.svg"
    logoAltText="Alcumus Logo"
    logoRedirect="/"
  />
);

export const withDrawer = () => (
  <AppBarWithMemoryRouter
    logoUrl="https://coredevuksstorage01.z33.web.core.windows.net/alcumus-logo.svg"
    logoAltText="Alcumus Logo"
    logoRedirect="/"
  />
);

export const withDrawerAndUserContent = () => (
  <AppBarWithMemoryRouter
    logoUrl="https://coredevuksstorage01.z33.web.core.windows.net/alcumus-logo.svg"
    logoAltText="Alcumus Logo"
    logoRedirect="/"
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
  />
);
