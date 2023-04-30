import React, { useCallback, useContext, useEffect } from 'react';
import { createStyles, makeStyles } from '@mui/styles';
import { ListItem, ListItemIcon, Theme } from '@mui/material';
import MToolbar from '@mui/material/Toolbar'
import { Redirect, useHistory, useLocation } from 'react-router-dom';
import qs from 'querystring';
import { useInterval } from '@alcumus/hooks';
import {
  Button,
  Drawer,
  DrawerContent,
  DrawerItem,
  IDrawerContext,
  Navigation,
  Page,
  RegularIcon,
  StyleVariables,
} from '@alcumus/components';
import store from 'store';
import UserMenu from './UserMenu';
import PageContext from '../../context/PageContext';
import { UserProfile } from '../../types';
import getLoginPageUrl from '../../../lib/utils/getLoginPageUrl';
import clsx from 'clsx';
import { ToastContextProvider } from '../../context/ToastContext';
import { getTokenRefreshIntervalInMilliseconds } from './refreshInterval';
import Analytics from '@alcumus/analytics-package';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
      [theme.breakpoints.only('xs')]: {
        padding: theme.spacing(1),
      },
    },
    portalPage: {
      backgroundColor: (props: { backgroundColor?: string }) =>
        props.backgroundColor || StyleVariables.colors.background.default,
      padding: '1rem 0',
    },
    formControl: {
      minWidth: theme.spacing(30),
    },
    backButtonContainer: {
      marginTop: '36px',
      marginBottom: '-8px',
      padding: '0 24px',
    },
    backButtonContainerSmall: {
      padding: '0',
      paddingLeft: '4px',
    },
  })
);

interface PrivatePageLayoutProps {
  user?: UserProfile;
  isFetchingUserProfile?: boolean;
  error?: string;
  children: React.ReactNode;
  useAzureAd?: boolean;
  fetchUserProfile: () => void;
  refreshTokens: (refreshToken: string) => void;
  drawerItems?: Array<DrawerItem>;
  showBackButton?: boolean;
  backgroundColor?: string;
}

function BackButton() {
  const history = useHistory();
  const drawerContext = useContext<IDrawerContext>(Drawer.Context);
  const classes = useStyles({});

  return (
    <div
      className={clsx([
        classes.backButtonContainer,
        {
          [classes.backButtonContainerSmall]: !drawerContext.isOpen,
        },
      ])}
    >
      {drawerContext.isOpen ? (
        <Button
          onClick={() => history.push('/')}
          variant="outlined"
          fullWidth={drawerContext.isOpen}
          rounded
          data-testid="exit-settings-button"
        >
          <RegularIcon
            icon="west"
            style={{ fontSize: 'inherit', marginRight: '8px' }}
          />
          {drawerContext.isOpen && 'Exit settings'}
        </Button>
      ) : (
        <ListItem onClick={() => history.push('/')}>
          <ListItemIcon>
            <RegularIcon icon="west" />
          </ListItemIcon>
        </ListItem>
      )}
    </div>
  );
}

export default function PrivatePageLayout({
  user,
  isFetchingUserProfile,
  error,
  useAzureAd = false,
  fetchUserProfile,
  refreshTokens,
  children,
  drawerItems = [],
  showBackButton,
  backgroundColor,
}: PrivatePageLayoutProps) {
  const classes = useStyles({ backgroundColor });
  const history = useHistory();
  const location = useLocation();
  const { logout } = qs.parse(location.search.substring(1));
  const refreshToken = store.get('refreshToken');
  const secondsTillExpiry = Number(store.get('expiresIn'));

  // refresh tokens to continue idle session in the background
  useInterval(() => {
    if (refreshToken) {
      refreshTokens(refreshToken);
    }
  }, getTokenRefreshIntervalInMilliseconds(secondsTillExpiry));

  // fetch user profile if unavailable
  useEffect(() => {
    if (Boolean(logout) === true) {
      history.push('/logout');
    } else if (!user?.email && !isFetchingUserProfile && !error) {
      fetchUserProfile();
    }
  }, [history, fetchUserProfile]);

  useEffect(() => {
    if (user && user.firstName) {
      Analytics.getInstance().identify(`${user?.firstName} ${user.lastName}`);
    }
  }, [user]);

  // Hard redirect to login page if logged out and using azure ad
  useEffect(() => {
    if (useAzureAd && (!refreshToken || !secondsTillExpiry)) {
      window.location.href = getLoginPageUrl();
    }
  }, [useAzureAd, refreshToken, secondsTillExpiry]);

  const handleLogout = useCallback(() => {
    history.push('/logout');
  }, [history]);

  // if there are no tokens found in local storage, then redirect to /login
  if (!useAzureAd && (!refreshToken || !secondsTillExpiry)) {
    return <Redirect to={getLoginPageUrl()} />;
  }

  return (
    <Page className={classes.portalPage}>
      <PageContext.Provider value={{ user }}>
        <ToastContextProvider>
          <div className={classes.root}>
            <Navigation
              logoUrl="/images/alcumus-logo-with-tagline.svg"
              logoAltText="Alcumus logo"
              logoRedirect="/"
              showDrawer
              userContent={<UserMenu user={user} onLogout={handleLogout} />}
              drawerContent={
                drawerItems.length && (
                  <>
                    {showBackButton && <BackButton />}
                    <DrawerContent drawerItems={drawerItems} />
                  </>
                )
              }
            />
            <main className={classes.content}>
              <MToolbar />
              {children}
            </main>
          </div>
        </ToastContextProvider>
      </PageContext.Provider>
    </Page>
  );
}
