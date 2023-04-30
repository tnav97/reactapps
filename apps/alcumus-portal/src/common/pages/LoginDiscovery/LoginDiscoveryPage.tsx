import { LoginPageProps } from '../LoginCredentials/LoginPage';
import { Redirect } from 'react-router-dom';
import React from 'react';
import {
  LoginFlowHooks,
  LoginFlowParameters,
} from '../../hooks/LoginLogoutFlow';
import { Navbar, Page, StyleVariables } from '@alcumus/components';
import Grid from '@mui/material/Grid/Grid';
import { makeStyles } from '@mui/styles';
import { LoginDiscoveryForm } from '../../components/LoginDiscoveryForm';
import { getLoginCredentialsPageUrl } from '../../../lib/utils/getLoginPageUrl';
interface StyleProps {
  backdropUrl: string;
}

const useStyles = makeStyles(() => ({
  page: {
    padding: 0,
    backgroundColor: StyleVariables.colors.surface.default,
  },
  form: {
    padding: '1rem 2rem',
    height: '100vh',
    overflow: 'auto',
  },
  backdrop: {
    backgroundImage: (props: StyleProps) => `url(${props.backdropUrl})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
  },
}));

export interface LoginDiscoveryPageProps extends LoginPageProps {
  rememberMyDomain: boolean;
  fetchOauthUrl: ({ domain }: { domain?: string }) => void;
}

export function LoginDiscoveryPage({
  isLoggedIn,
  useAzureAd,
  authUrl,
  fetchOauthUrl,
  authUrlError,
}: LoginDiscoveryPageProps): JSX.Element {
  if (!useAzureAd) {
    return <Redirect to={getLoginCredentialsPageUrl()} />;
  }

  const { productCode, callbackUrl }: LoginFlowParameters =
    LoginFlowHooks.getAndStoreUrlParameters();

  if (isLoggedIn && !(productCode?.length && callbackUrl?.length)) {
    return <Redirect to="/" />;
  }

  const classes = useStyles({
    backdropUrl: '/images/register-page-backdrop-full.jpg',
  });
  return (
    <Page className={classes.page}>
      <Grid container>
        <Grid item xs={12} md={7} className={classes.form}>
          <Navbar withLoginButton={false} />
          <LoginDiscoveryForm
            fetchOauthUrl={fetchOauthUrl}
            authUrl={authUrl}
            authUrlError={authUrlError}
          />
        </Grid>
        <Grid item md={5} className={classes.backdrop} />
      </Grid>
    </Page>
  );
}
