import React from 'react';
import { Redirect, useLocation } from 'react-router-dom';
import qs from 'querystring';
import store from 'store';
import { Grid, Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';
import Page from '../../components/Page';
import CreateAccountForm from '../../components/CreateAccountForm';
import getLoginPageUrl from '../../../lib/utils/getLoginPageUrl';

const useStyles = makeStyles((theme: Theme) => ({
  [theme.breakpoints.up('md')]: {
    signupPage: {
      padding: '3rem',
    },
  },
}));

interface SignupPageProps {
  useAzureAd: boolean;
  isRegistered?: boolean;
}

export default function SignupPage({
  useAzureAd,
  isRegistered = false,
}: SignupPageProps): JSX.Element {
  const classes = useStyles();
  const location = useLocation();
  const {
    p: productCode,
    cu: callbackUrl,
    oi: organizationIdentifier,
  } = qs.parse(location.search.substring(1));
  const productCodeFromLocalStorage = store.get('product');
  const callbackUrlFromLocalStorage = store.get('callbackUrl');
  const orgIdFromLocalStorage = store.get('organizationIdentifier');

  if (
    productCode &&
    (!productCodeFromLocalStorage ||
      productCode !== productCodeFromLocalStorage)
  ) {
    store.set('product', productCode);
  }
  if (
    callbackUrl &&
    (!callbackUrlFromLocalStorage ||
      callbackUrl !== callbackUrlFromLocalStorage)
  ) {
    store.set('callbackUrl', callbackUrl);
  }
  if (
    organizationIdentifier &&
    (!orgIdFromLocalStorage || organizationIdentifier !== orgIdFromLocalStorage)
  ) {
    store.set('organizationIdentifier', organizationIdentifier);
  }

  if (isRegistered && !(productCode?.length && callbackUrl?.length)) {
    return <Redirect to="/" />;
  }

  // when using AzureAD, there is no way to directly show signup page as of now
  // because of that reason, user needs to be transferred to login page
  // and from there users can go to registration area
  return useAzureAd ? (
    <Redirect to={getLoginPageUrl()} />
  ) : (
    <Page className={classes.signupPage}>
      <Grid container>
        <Grid item xs={1} sm={3} md={4} />
        <Grid item xs={10} sm={6} md={4}>
          <CreateAccountForm
            productCode={productCode as string}
            callbackUrl={callbackUrl as string}
          />
        </Grid>
        <Grid item xs={1} sm={3} md={4} />
      </Grid>
    </Page>
  );
}
