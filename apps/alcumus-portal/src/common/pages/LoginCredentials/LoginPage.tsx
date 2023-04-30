import React from 'react';
import { Grid, Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Redirect } from 'react-router-dom';
import Page from '../../components/Page';
import LoginForm from '../../components/LoginForm';
import {
  DESIGNATE_NULL,
  LoginFlowHooks,
  LoginFlowParameters,
} from '../../hooks/LoginLogoutFlow';
import AppLauncher from '../../components/AppLauncher';

const useStyles = makeStyles((theme: Theme) => ({
  [theme.breakpoints.up('md')]: {
    loginPage: {
      padding: '3rem',
    },
  },
}));

export interface LoginPageProps {
  isLoggedIn?: boolean;
  authUrl?: string;
  useAzureAd?: boolean;
  authUrlError?: boolean;
}

export default function LoginPage({
  isLoggedIn,
  useAzureAd,
  authUrl,
}: LoginPageProps): JSX.Element {
  const classes = useStyles();
  const {
    productCode,
    callbackUrl,
    organizationIdentifier,
  }: LoginFlowParameters = LoginFlowHooks.getAndStoreUrlParameters();

  if (isLoggedIn && !(productCode?.length && callbackUrl?.length)) {
    return <Redirect to="/" />;
  } else if (isLoggedIn) {
    return (
      <AppLauncher
        productToLaunch={productCode as string}
        callbackUrl={callbackUrl as string}
        isLoginFlow={true}
        isAuthorizationFlow={false}
      />
    );
  }

  if (useAzureAd && authUrl && typeof window !== 'undefined') {
    const isLoggingInWithCompanyAccount = Boolean(
      organizationIdentifier && organizationIdentifier !== DESIGNATE_NULL
    );
    LoginFlowHooks.storeCurrentAttempt(isLoggingInWithCompanyAccount);
    window.location.href = authUrl;
    return <React.Fragment />;
  }

  return useAzureAd ? (
    <React.Fragment />
  ) : (
    <Page className={classes.loginPage}>
      <div className={classes.loginPage}>
        <Grid container>
          <Grid item xs={1} sm={3} md={4} />
          <Grid item xs={10} sm={6} md={4}>
            <LoginForm
              productCode={productCode as string}
              callbackUrl={callbackUrl as string}
              organizationIdentifier={organizationIdentifier as string}
            />
          </Grid>
          <Grid item xs={1} sm={3} md={4} />
        </Grid>
      </div>
    </Page>
  );
}
