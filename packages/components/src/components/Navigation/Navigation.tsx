import React, { createContext, useCallback, useState } from 'react';
import AppBar from './AppBar';
import { Drawer } from './Drawer';
import store from 'store';

export interface NavigationProps {
  logoUrl: string;
  logoAltText: string;
  logoRedirect: string;
  /**
   * @deprecated This is a duplicate of drawerOpen, and is unused
   */
  showDrawer?: boolean;
  /**
   * @deprecated This field is unused, and should always have been part of local state
   */
  onToggleDrawer?: () => void;
  /**
   * @deprecated This field is unused, and should always have been part of local state
   */
  drawerOpen?: boolean;
  userContent?: React.ReactNode;
  appBarClassName?: string;
  drawerClassName?: string;
  drawerContent?: React.ReactNode;
  contextChooser?: React.ReactNode;
}

export interface INavigationContext {
  isDrawerOpen: boolean;
  toggleDrawer: () => void;
}

Navigation.Context = createContext<INavigationContext>({
  isDrawerOpen: false,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  toggleDrawer: () => {},
});

export function Navigation({
  logoUrl,
  logoAltText,
  logoRedirect,
  userContent,
  appBarClassName = undefined,
  drawerClassName = undefined,
  drawerContent = undefined,
  contextChooser,
}: NavigationProps) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(
    store.get('navigation_drawer_open', true)
  );

  const handleDrawerToggle = useCallback(() => {
    setIsDrawerOpen(!isDrawerOpen);
    store.set('navigation_drawer_open', !isDrawerOpen);
  }, [setIsDrawerOpen, isDrawerOpen]);

  return (
    <Navigation.Context.Provider
      value={{ isDrawerOpen, toggleDrawer: handleDrawerToggle }}
    >
      <AppBar
        logoUrl={logoUrl}
        logoAltText={logoAltText}
        logoRedirect={logoRedirect}
        userContent={userContent}
        className={appBarClassName}
        contextChooser={contextChooser}
      />
      {!!drawerContent && (
        <Drawer
          drawerOpen={isDrawerOpen}
          onToggleDrawer={handleDrawerToggle}
          drawerContent={drawerContent}
          className={drawerClassName}
        />
      )}
    </Navigation.Context.Provider>
  );
}
