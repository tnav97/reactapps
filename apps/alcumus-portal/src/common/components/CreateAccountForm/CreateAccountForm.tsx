import React, { useCallback, useState } from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import { Button, FormControl, Grid, TextField, Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { StyleVariables, Text } from '@alcumus/components';
import { useStateFromInput } from '@alcumus/hooks';
import validator from 'validator';
import clsx from 'clsx';
import AlcumusPanel from '../AlcumusPanel';
import AppLauncher from '../AppLauncher';
import getLoginPageUrl from '../../../lib/utils/getLoginPageUrl';

const useStyles = makeStyles((theme: Theme) => ({
  formGroup: {
    marginBottom: '1rem',
  },
  formAction: {
    textAlign: 'right',
    marginTop: '1rem',
    marginBottom: '1rem',
  },
  error: {
    color: StyleVariables.colors.text.critical,
    fontFamily: StyleVariables.fonts.family.heading,
    fontSize: StyleVariables.fonts.size.xs,
  },
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
  passwordHint: {
    fontSize: '0.7rem',
    color: StyleVariables.colors.text.subdued,
  },
  [theme.breakpoints.up('sm')]: {
    spaceOnRight: {
      marginRight: '1rem',
    },
    spaceOnLeft: {
      marginLeft: '1rem',
    },
  },
}));

function Error({
  error,
  ...props
}: {
  error: string;
  [x: string]: any;
}): JSX.Element {
  const classes = useStyles();

  if (!error) {
    return <React.Fragment />;
  }

  return (
    <Text
      as="small"
      data-testid="registrationError"
      className={classes.error}
      {...props}
    >
      {error}
    </Text>
  );
}

interface CreateAccountFormProps {
  isRegistering?: boolean;
  error?: string;
  registered?: boolean;
  productCode?: string;
  callbackUrl?: string;
  register: (newUserProfile: {
    firstName: string;
    lastName: string;
    email: string;
    username: string;
    password: string;
  }) => {};
}

interface FormErrors {
  firstName?: boolean;
  lastName?: boolean;
  email?: boolean;
  username?: boolean;
  password?: boolean;
  confirmedPassword?: boolean;
}

export default function CreateAccountForm({
  isRegistering = false,
  error = undefined,
  registered = false,
  productCode,
  callbackUrl,
  register,
}: CreateAccountFormProps): JSX.Element {
  const [firstName, setFirstName] = useStateFromInput('');
  const [lastName, setLastName] = useStateFromInput('');
  const [email, setEmail] = useStateFromInput('');
  const [username, setUsername] = useStateFromInput('');
  const [password, setPassword] = useStateFromInput('');
  const [confirmedPassword, setConfirmedPassword] = useStateFromInput('');
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const history = useHistory();

  const shouldRedirectPostRegistration =
    !!productCode?.trim()?.length && !!callbackUrl?.trim()?.length;

  const classes = useStyles();

  const handleSignup = useCallback(
    (e) => {
      e.preventDefault();

      const errors: FormErrors = {
        firstName: !firstName,
        lastName: !lastName,
        email: !email || !validator.isEmail(email),
        username: !username,
        password:
          !password || !password.trim().length || password.trim().length < 6,
        confirmedPassword:
          !confirmedPassword || !confirmedPassword.trim().length,
      };

      if (Object.values(errors).filter(Boolean).length) {
        setFormErrors(errors);
      } else {
        register({
          firstName,
          lastName,
          email,
          username,
          password,
        });
      }
    },
    [
      firstName,
      lastName,
      email,
      username,
      password,
      confirmedPassword,
      register,
    ]
  );

  const handleLoginClick = useCallback((e) => {
    e.preventDefault();
    history.push(getLoginPageUrl());
  }, []);

  if (registered && !shouldRedirectPostRegistration) {
    return <Redirect to="/" />;
  }

  return registered &&
    shouldRedirectPostRegistration &&
    productCode &&
    callbackUrl ? (
    <AppLauncher
      productToLaunch={productCode as string}
      callbackUrl={callbackUrl}
    />
  ) : (
    <AlcumusPanel
      title="Create Account"
      showFooter
      footerContent={
        <React.Fragment>
          <Text
            component="p"
            variant="subtitle2"
            className={classes.footerText}
          >
            Are you already registered?{' '}
            <a
              data-testid="loginLink"
              onClick={handleLoginClick}
              rel="noreferrer"
              className={classes.link}
            >
              Login
            </a>
          </Text>
          <br />
        </React.Fragment>
      }
    >
      <form method="post" action="/api/auth/register">
        <Grid container>
          <Grid item xs={12} sm={6} md={6}>
            <FormControl
              variant="standard"
              fullWidth
              className={clsx(classes.formGroup, classes.spaceOnRight)}>
              <TextField
                fullWidth
                id="firstName"
                label="First Name"
                variant="outlined"
                inputProps={{
                  'data-testid': 'firstNameInput',
                  type: 'text',
                  required: true,
                  maxLength: 30,
                }}
                onChange={setFirstName}
              />
              {formErrors.firstName && (
                <Error
                  data-testid="firstNameError"
                  error="First name is required"
                />
              )}
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <FormControl
              variant="standard"
              fullWidth
              className={clsx(classes.formGroup, classes.spaceOnLeft)}>
              <TextField
                fullWidth
                id="lastName"
                label="Last Name"
                variant="outlined"
                inputProps={{
                  'data-testid': 'lastNameInput',
                  type: 'text',
                  required: true,
                  maxLength: 30,
                }}
                onChange={setLastName}
              />
              {formErrors.lastName && (
                <Error
                  data-testid="lastNameError"
                  error="Last name is required"
                />
              )}
            </FormControl>
          </Grid>
          <Grid item xs={12} />
          <Grid item xs={12} sm={6} md={6}>
            <FormControl
              variant="standard"
              fullWidth
              className={clsx(classes.formGroup, classes.spaceOnRight)}>
              <TextField
                fullWidth
                id="email"
                label="Email"
                variant="outlined"
                inputProps={{
                  'data-testid': 'emailInput',
                  type: 'email',
                  required: true,
                  maxLength: 50,
                }}
                onChange={setEmail}
              />
              {formErrors.email && (
                <Error
                  data-testid="emailError"
                  error="A valid email is required"
                />
              )}
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <FormControl
              variant="standard"
              fullWidth
              className={clsx(classes.formGroup, classes.spaceOnLeft)}>
              <TextField
                fullWidth
                id="username"
                label="Username"
                variant="outlined"
                inputProps={{
                  'data-testid': 'usernameInput',
                  type: 'text',
                  maxLength: 30,
                }}
                onChange={setUsername}
              />
              {formErrors.username && (
                <Error
                  data-testid="usernameError"
                  error="A valid username is required"
                />
              )}
            </FormControl>
          </Grid>
        </Grid>
        <FormControl variant="standard" fullWidth className={classes.formGroup}>
          <TextField
            fullWidth
            id="password"
            label="Create password"
            variant="outlined"
            inputProps={{
              'data-testid': 'passwordInput',
              type: 'password',
              maxLength: 20,
            }}
            onChange={setPassword}
          />
          {formErrors.password && (
            <Error
              data-testid="passwordError"
              error={
                password.trim().length < 6
                  ? 'Password is invalid'
                  : 'Password is required'
              }
            />
          )}
          <Text as="small" className={classes.passwordHint}>
            Requires minimum 10 characters including alphabets, numbers and
            symbols
          </Text>
        </FormControl>
        <FormControl variant="standard" fullWidth className={classes.formGroup}>
          <TextField
            fullWidth
            label="Confirm password"
            variant="outlined"
            inputProps={{
              'data-testid': 'confirmPasswordInput',
              type: 'password',
              maxLength: 20,
            }}
            onChange={setConfirmedPassword}
          />
          {formErrors.confirmedPassword && (
            <Error
              data-testid="confirmPasswordError"
              error="Please confirm password"
            />
          )}
        </FormControl>
        {!!error && (
          <React.Fragment>
            <br />
            <Error error={error} />
            <br />
          </React.Fragment>
        )}
        <div className={classes.formAction}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            onClick={handleSignup}
            data-testid="submitButton"
            disabled={isRegistering}
          >
            {isRegistering ? 'Creating account...' : 'Create Account'}
          </Button>
        </div>
      </form>
    </AlcumusPanel>
  );
}
