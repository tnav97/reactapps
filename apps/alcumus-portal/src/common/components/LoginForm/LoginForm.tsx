import React, { useCallback, useState } from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import { makeStyles } from '@mui/styles';
import { useTranslation } from 'react-i18next';
import EmailForm from '../LoginEmailForm';
import PasswordForm from '../LoginPasswordForm';
import AlcumusPanel from '../AlcumusPanel';
import { StyleVariables, Text } from '@alcumus/components';
import AppLauncher from '../AppLauncher';
import getRegistrationPageUrl from '../../../lib/utils/getRegistrationPageUrl';

const useStyles = makeStyles(() => ({
  footerText: {
    color: StyleVariables.colors.text.subdued,
    fontSize: StyleVariables.fonts.size.xs,
  },
  link: {
    color: StyleVariables.colors.action.primary.default,
    fontSize: StyleVariables.fonts.size.xs,
    fontWeight: StyleVariables.fonts.weight.bold,
    cursor: 'pointer',
  },
  disclaimerLink: {
    fontSize: StyleVariables.fonts.size.xs,
  },
}));

interface LoginFormProps {
  isLoggingIn?: boolean;
  error?: string;
  isLoggedIn?: boolean;
  loginWithEmailAndPassword: (
    email: string,
    password: string,
    organizationIdentifier?: string
  ) => {};
  productCode?: string;
  callbackUrl?: string;
  organizationIdentifier?: string;
  disablePortalFeatures?: boolean;
}

export default function LoginForm({
  isLoggingIn,
  isLoggedIn,
  error,
  loginWithEmailAndPassword,
  productCode,
  organizationIdentifier,
  callbackUrl,
  disablePortalFeatures,
}: LoginFormProps): JSX.Element {
  const classes = useStyles();
  const shouldRedirectPostLogin =
    !!productCode?.trim()?.length && !!callbackUrl?.trim()?.length;
  const [email, setEmail] = useState<string>('');
  const [isShowingPasswordForm, setIsShowingPasswordForm] =
    useState<boolean>(false);
  const history = useHistory();
  const { t } = useTranslation(['Login']);

  const handleEmailUpdate = useCallback((emailValue) => {
    setEmail(emailValue);
    setIsShowingPasswordForm(true);
  }, []);

  const handleLogin = useCallback(
    (email: string, password: string, orgId?: string) => {
      loginWithEmailAndPassword(email, password, orgId);
    },
    [email, loginWithEmailAndPassword]
  );

  const handleSignupClick = useCallback((e) => {
    e.preventDefault();
    history.push(getRegistrationPageUrl());
  }, []);

  if (isLoggedIn && !shouldRedirectPostLogin) {
    return <Redirect to="/" />;
  }

  const LoginFormContent = () => (
    <React.Fragment>
      {!email && <EmailForm onNext={handleEmailUpdate} />}
      {isShowingPasswordForm && (
        <PasswordForm
          email={email}
          organizationIdentifier={organizationIdentifier}
          isLoggingIn={isLoggingIn}
          error={error}
          attemptLogin={handleLogin}
          hideForgotPasswordLink={disablePortalFeatures}
        />
      )}
    </React.Fragment>
  );

  return isLoggedIn && shouldRedirectPostLogin && productCode && callbackUrl ? (
    <AppLauncher
      productToLaunch={productCode as string}
      callbackUrl={callbackUrl}
    />
  ) : (
    <AlcumusPanel
      title={t('login', { ns: 'Login' })}
      footerContent={
        <React.Fragment>
          <Text
            component="p"
            variant="subtitle2"
            className={classes.footerText}
          >
            {!disablePortalFeatures && (
              <React.Fragment>
                {t('noAccount', { ns: 'Login' })}{' '}
                <a
                  data-testid="signupLink"
                  onClick={handleSignupClick}
                  rel="noreferrer"
                  className={classes.link}
                >
                  {t('createAccount', { ns: 'Login' })}
                </a>
              </React.Fragment>
            )}
          </Text>
          <br />
        </React.Fragment>
      }
    >
      <LoginFormContent />
    </AlcumusPanel>
  );
}
