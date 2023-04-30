import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import DescriptionIcon from '@mui/icons-material/Description';
import PaymentIcon from '@mui/icons-material/Payment';
import PeopleIcon from '@mui/icons-material/People';
import SettingsIcon from '@mui/icons-material/Settings';
import { BrowserRouter } from 'react-router-dom';
import { Navigation } from './Navigation';
import Text from '../Text';
import DrawerContent from './DrawerContent';

const DrawerItems = [
  {
    title: 'Documents',
    icon: <DescriptionIcon fontSize="medium" />,
    dataTestId: 'documents',
  },
  {
    title: 'Billing',
    icon: <PaymentIcon fontSize="medium" />,
    dataTestId: 'billing',
  },
  {
    title: 'Users',
    icon: <PeopleIcon fontSize="medium" />,
    dataTestId: 'users',
  },
  {
    title: 'Settings',
    icon: <SettingsIcon fontSize="medium" />,
    dataTestId: 'settings',
  },
];

describe('Navigation', () => {
  test('it should render', () => {
    render(
      <BrowserRouter>
        <Navigation
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
          drawerContent={<DrawerContent drawerItems={DrawerItems} />}
        />
      </BrowserRouter>
    );

    expect(screen.getByAltText('Alcumus Logo')).toBeInTheDocument();
    expect(screen.getByText('user@company.com')).toBeInTheDocument();

    // Drawer item titles are open on default
    DrawerItems.forEach((item) => {
      expect(screen.queryByText(item.title)).toBeInTheDocument();
    });

    const drawerIcon = screen.getByTestId('drawerIcon');
    fireEvent.click(drawerIcon);

    // Drawer item titles hidden after clicking icon
    DrawerItems.forEach((item) => {
      expect(screen.queryByText(item.title)).not.toBeInTheDocument();
    });
  });
});
