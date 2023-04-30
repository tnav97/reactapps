import React, { useCallback, useState } from 'react';
import { makeStyles } from '@mui/styles';
import { StyleVariables, Text } from '@alcumus/components';
import { useTranslation } from 'react-i18next';
import Link from '../Link';
import { KEY_MAP } from '../../constants';
import { Button, TextField } from '@mui/material';

const useStyles = makeStyles(() => ({
  formAction: {
    textAlign: 'right',
    marginTop: '1rem',
    marginBottom: '1rem',
  },
  emailText: {
    fontFamily: StyleVariables.fonts.family.heading,
  },
  error: {
    color: StyleVariables.colors.text.critical,
    fontFamily: StyleVariables.fonts.family.heading,
  },
  forgotPasswordLinkContainer: {
    textAlign: 'right',
  },
  forgotPasswordLink: {
    fontSize: StyleVariables.fonts.size.xs,
  },
}));

interface PasswordFormProps {
  email: string;
  organizationIdentifier?: string;
  isLoggingIn?: boolean;
  error?: string;
  attemptLogin: (
    email: string,
    password: string,
    organizationIdentifier?: string
  ) => void;
  hideForgotPasswordLink?: boolean;
}

export default function PasswordForm({
  email,
  organizationIdentifier,
  isLoggingIn,
  error,
  attemptLogin,
  hideForgotPasswordLink,
}: PasswordFormProps) {
  const classes = useStyles();

  const [password, setPassword] = useState<string>('');
  const [passwordError, setPasswordError] = useState<string>('');

  const { t } = useTranslation(['Login']);

  const handlePasswordChange = useCallback(({ target }) => {
    setPasswordError('');
    setPassword(target.value);
  }, []);

  const handleKeypress = useCallback(
    (e) => {
      if (e.which === KEY_MAP.ENTER) {
        e.preventDefault();
        handleSubmit();
      }
    },
    [password]
  );

  const handleSubmit = useCallback(() => {
    if (!password.length) {
      setPasswordError(t('passwordError', { ns: 'Login' }));
    } else {
      attemptLogin(email, password, organizationIdentifier);
    }
  }, [email, password, organizationIdentifier, attemptLogin]);

  return (
    <form>
      <TextField
        fullWidth
        id="password"
        label="Password"
        type="password"
        variant="outlined"
        inputProps={{
          'data-testid': 'passwordInput',
        }}
        onChange={handlePasswordChange}
        onKeyDown={handleKeypress}
      />
      {!!(passwordError || error) && (
        <Text
          as="small"
          data-testid="errorMessage"
          variant="subtitle2"
          className={classes.error}
        >
          {passwordError || error}
        </Text>
      )}
      {!hideForgotPasswordLink && (
        <div className={classes.forgotPasswordLinkContainer}>
          <Link
            to="/forgot-password"
            rel="noreferrer"
            className={classes.forgotPasswordLink}
          >
            {t('cantLogin', { ns: 'Login' })}
          </Link>
        </div>
      )}
      <div className={classes.formAction}>
        <Button
          type="button"
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          disabled={isLoggingIn}
          data-testid="submitButton"
        >
          {isLoggingIn
            ? t('loggingIn', { ns: 'Login' })
            : t('loginButton', { ns: 'Login' })}
        </Button>
      </div>
    </form>
  );
}
