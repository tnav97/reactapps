import React, { useCallback, useEffect } from 'react';
import { connect } from 'react-redux';
import { RootReducerState } from '../../../client/redux/reducers';
import { fetchOauthUrl } from '../../../client/redux/actions/authentication';
import { Button, Center, StyleVariables, Text } from '@alcumus/components';
import { getLoginUrlWithQueryString } from '../../../lib/utils/getLoginPageUrl';
import DomainForm from './DomainForm';
import { useTranslation } from 'react-i18next';
import { Divider, Grid, Link } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { DESIGNATE_NULL, LoginFlowHooks } from '../../hooks/LoginLogoutFlow';

function mapStateToProps({ auth }: RootReducerState) {
  return {
    authUrl: auth.authUrl,
    isFetchingAuthUrl: auth.isFetchingAuthUrl,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchOauthUrl: ({ domain }: { domain?: string }) =>
      dispatch(fetchOauthUrl({ domain })),
  };
}

export interface ChooseLoginFormProps {
  isLoggedIn?: boolean;
  useAzureAd?: boolean;
  authUrl?: string;
  isFetchingAuthUrl?: boolean;
  fetchOauthUrl: ({ domain }: { domain?: string }) => void;
  authUrlError?: boolean;
}

const useStyles = makeStyles({
  heading: {
    fontWeight: StyleVariables.fonts.weight.semiBold,
    margin: '3rem 0',
  },
  helpSection: {
    margin: '3rem 0',
  },
  termsSection: {
    marginTop: '3rem',
  },
});

export function LoginDiscoveryForm({
  fetchOauthUrl,
  authUrl,
  authUrlError,
}: ChooseLoginFormProps): JSX.Element {
  const { productCode, callbackUrl } =
    LoginFlowHooks.getAndStoreUrlParameters();

  const handleDomainUpdate = useCallback(async (domain) => {
    fetchOauthUrl({ domain });
  }, []);
  const { t } = useTranslation(['Login']);
  const classes = useStyles();

  useEffect(() => {
    if (authUrl) {
      window.location.href = authUrl;
    }
  }, [authUrl]);

  const handleRedirectToEmailLoginPage = () => {
    const emailLoginUrl = getLoginUrlWithQueryString('/login/credentials', {
      organizationIdentifier: DESIGNATE_NULL,
      productCode,
      callbackUrl,
    });
    LoginFlowHooks.storeCurrentAttempt(false);
    window.location.href = emailLoginUrl;
  };

  return (
    <Grid container justifyContent="center">
      <Grid item md={7}>
        <Center>
          <Text as="h4" className={classes.heading}>
            {t('signInWithYourOrganizationAccount', { ns: 'Login' })}
          </Text>
        </Center>
        <DomainForm onNext={handleDomainUpdate} authUrlError={authUrlError} />

        <Divider />
        <Button
          onClick={handleRedirectToEmailLoginPage}
          rounded
          variant="outlined"
          fullWidth
          size="medium"
          data-testid="loginWithEmailAndPassword"
          className={classes.helpSection}
        >
          {t('loginWithEmailAndPassword', { ns: 'Login' })}
        </Button>
        <Center direction="column" className={classes.termsSection}>
          <Text>{t('agreement', { ns: 'Login' })}</Text>
          <Text>
            <Link
              underline="always"
              href="https://www.ecompliance.com/legal/"
              target="_blank"
            >
              {t('termsAndConditions', { ns: 'Login' })}
            </Link>{' '}
            &{' '}
            <Link
              underline="always"
              href="https://www.ecompliance.com/privacy/"
              target="_blank"
            >
              {t('privacyPolicy', { ns: 'Login' })}
            </Link>
          </Text>
        </Center>
      </Grid>
    </Grid>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginDiscoveryForm);
