import React, { useCallback, useEffect, useState } from 'react';
import { makeStyles } from '@mui/styles';
import { Center, StyleVariables, Text } from '@alcumus/components';
import validator from 'validator';
import Page from '../../components/Page';
import AlcumusPanel from '../../components/AlcumusPanel';
import Link from '../../components/Link';
import SuccessMessage from '../../components/ForgotPasswordSuccessMessage';
import { KEY_MAP } from '../../constants';
import getLoginPageUrl from '../../../lib/utils/getLoginPageUrl';
import { Button, Grid, TextField, Theme } from '@mui/material';

const useStyles = makeStyles((theme: Theme) => ({
  [theme.breakpoints.up('md')]: {
    forgotPasswordPage: {
      padding: '3rem',
    },
  },
  recoveryLabel: {
    paddingBottom: theme.spacing(1),
  },
  error: {
    color: StyleVariables.colors.text.critical,
  },
  link: {
    fontSize: StyleVariables.fonts.size.xs,
  },
  formAction: {
    textAlign: 'right',
    marginTop: '1rem',
    marginBottom: '1rem',
  },
}));

interface ForgotPasswordPageProps {
  sendForgotPasswordRequest: (email: string) => void;
  isSending?: boolean;
  passwordRecoveryLinkSent?: boolean;
  allowResendingPassword: () => void;
}

export default function ForgotPasswordPage({
  sendForgotPasswordRequest,
  isSending = false,
  passwordRecoveryLinkSent = false,
  allowResendingPassword,
}: ForgotPasswordPageProps): JSX.Element {
  const classes = useStyles();
  const [email, setEmail] = useState<string>('');
  const [emailError, setEmailError] = useState<string>('');
  const [shouldShowSuccessMessage, setShouldShowSuccessMessage] =
    useState<boolean>(false);

  const handleEmailChange = useCallback(({ target }) => {
    setEmailError('');
    setEmail(target.value);
  }, []);

  const handleSubmit = useCallback(() => {
    if (!email || !validator.isEmail(email)) {
      setEmailError('A valid email is required');
    } else {
      sendForgotPasswordRequest(email);
    }
  }, [email]);

  const handleKeypress = useCallback(
    (e) => {
      if (e.which === KEY_MAP.ENTER) {
        e.preventDefault();
        handleSubmit();
      }
    },
    [email]
  );

  const handleResendLink = useCallback(() => {
    setShouldShowSuccessMessage(false);
    allowResendingPassword();
  }, []);

  useEffect(() => {
    if (!isSending && !shouldShowSuccessMessage && passwordRecoveryLinkSent) {
      setShouldShowSuccessMessage(true);
    }
  }, [isSending, shouldShowSuccessMessage, passwordRecoveryLinkSent]);

  return (
    <Page className={classes.forgotPasswordPage}>
      <Grid container>
        <Grid item xs={1} sm={3} md={4} />
        <Grid item xs={10} sm={6} md={4}>
          <AlcumusPanel
            showFooter
            title="Can't log in?"
            footerContent={
              <Center>
                <Link
                  to={getLoginPageUrl()}
                  rel="noreferrer"
                  className={classes.link}
                >
                  Return to Login
                </Link>
              </Center>
            }
          >
            {passwordRecoveryLinkSent || shouldShowSuccessMessage ? (
              <SuccessMessage email={email} onResendLink={handleResendLink} />
            ) : (
              <React.Fragment>
                <Text
                  as="p"
                  variant="subtitle2"
                  className={classes.recoveryLabel}
                >
                  We&rsquo;ll send a recovery link to:
                </Text>
                <TextField
                  fullWidth
                  id="email"
                  type="email"
                  label="Email"
                  variant="outlined"
                  inputProps={{
                    'data-testid': 'emailInput',
                  }}
                  onChange={handleEmailChange}
                  onKeyPress={handleKeypress}
                />
                {!!emailError && (
                  <Text
                    as="small"
                    data-testid="emailErrorMessage"
                    variant="subtitle2"
                    className={classes.error}
                  >
                    {emailError}
                  </Text>
                )}
                <div className={classes.formAction}>
                  <Button
                    type="button"
                    variant="contained"
                    color="primary"
                    onClick={handleSubmit}
                    disabled={isSending}
                    data-testid="submitButton"
                  >
                    {isSending ? 'Sending...' : 'SEND'}
                  </Button>
                </div>
              </React.Fragment>
            )}
          </AlcumusPanel>
        </Grid>
        <Grid item xs={1} sm={3} md={4} />
      </Grid>
    </Page>
  );
}
