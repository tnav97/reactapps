import '@testing-library/jest-dom';
import '@testing-library/react/dont-cleanup-after-each';
import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { OutlinedIcon } from '../Icon';
import { Drawer } from './Drawer';
import DrawerContent from './DrawerContent';

const drawerItems = [
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
    href: '/store',
    dataTestId: 'store',
  },
  {
    title: 'Settings',
    icon: <OutlinedIcon icon="settings" />,
    href: '/settings',
    dataTestId: 'settings',
  },
  {
    title: 'Users',
    icon: <OutlinedIcon icon="person" />,
    dataTestId: 'users',
  },
];

const useHistoryPush = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: () => ({
    push: useHistoryPush,
  }),
}));

describe('Navigation / DrawerContent', () => {
  beforeEach(() => {
    useHistoryPush.mockReset();
  });

  test('it should render', () => {
    render(
      <MemoryRouter>
        <Drawer.Context.Provider value={{ isOpen: true }}>
          <DrawerContent drawerItems={drawerItems} />
        </Drawer.Context.Provider>
      </MemoryRouter>
    );
    drawerItems.forEach((item) => {
      expect(screen.queryByText(item.icon.props.icon)).toBeInTheDocument();
    });
    drawerItems.forEach((item) => {
      expect(screen.queryByText(item.title)).toBeInTheDocument();
    });
  });

  test('clicking item works', () => {
    render(
      <MemoryRouter>
        <Drawer.Context.Provider value={{ isOpen: true }}>
          <DrawerContent drawerItems={drawerItems} />
        </Drawer.Context.Provider>
      </MemoryRouter>
    );
    fireEvent.click(screen.getByText('Settings'));
    expect(useHistoryPush).toBeCalledWith('/settings');

    fireEvent.click(screen.getByText('Store'));
    expect(useHistoryPush).toBeCalledWith('/store');
  });

  test('items without href do not redirect', () => {
    render(
      <MemoryRouter>
        <Drawer.Context.Provider value={{ isOpen: true }}>
          <DrawerContent drawerItems={drawerItems} />
        </Drawer.Context.Provider>
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText('Users'));
    expect(useHistoryPush).not.toBeCalled();
  });
});
