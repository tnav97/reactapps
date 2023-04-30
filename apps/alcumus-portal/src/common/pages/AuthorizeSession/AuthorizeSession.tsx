import React, { useEffect, useState } from 'react';
import { Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Center, LoadingPage, StyleVariables, Text } from '@alcumus/components';
import { Redirect, useLocation } from 'react-router-dom';
import qs from 'querystring';
import Page from '../../components/Page';
import AppLauncher from '../../components/AppLauncher';
import getLoginPageUrl from '../../../lib/utils/getLoginPageUrl';
import { LoginFlowHooks } from '../../hooks/LoginLogoutFlow';

const useStyles = makeStyles((theme: Theme) => ({
  authorizeSessionPage: {},
  hideElement: {
    display: 'none',
  },
  loaderContainer: {
    padding: '3rem',
  },
  error: {
    color: StyleVariables.colors.text.critical,
  },
  link: {
    color: StyleVariables.colors.action.primary.default,
    fontFamily: StyleVariables.fonts.family.heading,
    fontSize: StyleVariables.fonts.size.regular,
    fontWeight: StyleVariables.fonts.weight.bold,
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline',
      cursor: 'pointer',
    },
  },
  [theme.breakpoints.up('md')]: {
    authorizeSessionPage: {
      padding: '3rem',
    },
  },
}));

interface AuthorizeSessionProps {
  isStartingSession?: boolean;
  error?: string;
  isLoggedIn?: boolean;
  getTokens: (code: string, clientInfo: string) => {};
}

export default function AuthorizeSession({
  getTokens,
  isStartingSession = false,
  error = undefined,
  isLoggedIn = false,
}: AuthorizeSessionProps) {
  const { productCode, callbackUrl } = LoginFlowHooks.getStoredValues();
  const [isLaunchingApp, setIsLaunchingApp] = useState<boolean>(false);
  const classes = useStyles();
  const location = useLocation();
  const { code, client_info: clientInfo } = qs.parse(
    location.search.substring(1)
  );

  useEffect(() => {
    if (!isLaunchingApp) {
      setIsLaunchingApp(true);
      getTokens(code as string, clientInfo as string);
    }
  }, []);

  if (isLoggedIn && !(productCode?.length && callbackUrl?.length)) {
    LoginFlowHooks.storeSuccessfulLoginAttempt();
    LoginFlowHooks.clearTemporaryValues();
    window.location.assign('/');
  }

  // When user is authenticated with Azure AD B2C,
  // it responds back in browser at /authorize route with code included in url parameters
  // if it is not set, then it simply isnt a successful Azure AD response and should redirect to login
  if (!code) {
    return <Redirect to={getLoginPageUrl()} />;
  }

  if (isStartingSession) {
    return (
      <LoadingPage
        message="Starting session..."
        logoImageUrl="/images/alcumus-logo-with-tagline.svg"
      />
    );
  }

  const isRedirectionFlow =
    isLoggedIn && productCode?.length && callbackUrl?.length;

  return (
    <Page className={classes.authorizeSessionPage}>
      <Center className={classes.loaderContainer} direction="column">
        {isRedirectionFlow && (
          <AppLauncher
            productToLaunch={productCode as string}
            callbackUrl={callbackUrl as string}
            isLoginFlow={true}
            isAuthorizationFlow={true}
          />
        )}
        {!!error && (
          <React.Fragment>
            <Text className={classes.error}>{error}</Text>
            <br />
            <br />
            <a href={getLoginPageUrl()} className={classes.link}>
              Try to login again
            </a>
          </React.Fragment>
        )}
      </Center>
    </Page>
  );
}
