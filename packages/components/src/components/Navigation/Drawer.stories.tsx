import React from 'react';
import { Drawer } from './Drawer';
import DescriptionIcon from '@mui/icons-material/Description';
import PaymentIcon from '@mui/icons-material/Payment';
import PeopleIcon from '@mui/icons-material/People';
import SettingsIcon from '@mui/icons-material/Settings';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Page from '../Page';
import DrawerContent from './DrawerContent';
import { MemoryRouter } from 'react-router-dom';

export default {
  title: 'Components/Navigation/Drawer',
  component: Drawer,
};

export const withSimpleLinks = () => (
  <Drawer
    drawerOpen
    drawerContent={
      <React.Fragment>
        <a href="#">Documents</a>
        <br />
        <a href="#">Billing</a>
        <br />
        <a href="#">Users</a>
        <br />
        <a href="#">Settings</a>
      </React.Fragment>
    }
  />
);

export const withFancyItems = () => {
  const DrawerItems = [
    { title: 'Documents', icon: <DescriptionIcon fontSize="medium" /> },
    { title: 'Billing', icon: <PaymentIcon fontSize="medium" /> },
    { title: 'Users', icon: <PeopleIcon fontSize="medium" /> },
    { title: 'Settings', icon: <SettingsIcon fontSize="medium" /> },
  ];

  return (
    <Drawer
      drawerOpen
      drawerContent={
        <React.Fragment>
          {DrawerItems.map(({ title, icon }) => (
            <ListItem button key={title}>
              <ListItemIcon>{icon}</ListItemIcon>
              <ListItemText primary={title} />
            </ListItem>
          ))}
        </React.Fragment>
      }
    />
  );
};

export const withDrawerItems = () => {
  const DrawerItems = [
    { title: 'Home', icon: <DescriptionIcon />, dataTestId: 'home' },
    {
      title: 'Dashboard',
      icon: <DescriptionIcon />,
      href: '/billing',
      dataTestId: 'dashboard',
    },
    { title: 'Store', icon: <DescriptionIcon />, dataTestId: 'store' },
    {
      title: 'Settings',
      icon: <DescriptionIcon />,
      href: '/settings',
      dataTestId: 'settings',
    },
  ];

  return (
    <MemoryRouter initialEntries={['/documents']} initialIndex={0}>
      <Page>
        <Drawer
          drawerOpen={false}
          drawerContent={<DrawerContent drawerItems={DrawerItems} />}
        />
      </Page>
    </MemoryRouter>
  );
};
