import React, { useEffect, useState } from 'react';
import { Grid, Typography } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import AboutSection from '../../components/AboutSection';
import FormControl from '@mui/material/FormControl';
import { useHistory } from 'react-router-dom';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { StyleVariables, Button, Input, Text, Page } from '@alcumus/components';
import clsx from 'clsx';
import validator from 'validator';
import { useDispatch } from 'react-redux/es/hooks/useDispatch';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import MobileFooterSection from '../../components/MobileFooterSection';
import RightHomeSection from '../../components/RightHomeSection';
import { REFERENCE } from '../../components/constants';
import Stepper from '../../components/Stepper';
import { liveChatContainer, mobileLiveChatContainerBox } from '../../constants';

const STEPPER_DOTS = 1;

const useStyles = makeStyles((theme) => ({
  image: {
    maxHeight: '768px',
    marginLeft: '44px',
    [theme.breakpoints.only('sm')]: {
      display: 'none',
    },
    [theme.breakpoints.down('lg')]: {
      display: 'none',
    },
  },
  formGroup: {
    marginBottom: '1rem',
    textAlign: 'left',
  },
  formAction: {
    borderRadius: '100%',
    [theme.breakpoints.up('md')]: {
      marginTop: '1.5rem',
    },
  },
  formAction2: {
    marginTop: '1.5rem',
  },
  formContainer: {
    textAlign: 'center',
    alignContent: 'center',

    [theme.breakpoints.down('md')]: {
      marginLeft: '1rem',
      marginRight: '1rem',
    },
  },
  title: {
    marginTop: '3rem',
    textAlign: 'center',
    fontSize: StyleVariables.fonts.size.h3,
    fontWeight: StyleVariables.fonts.weight.semiBold,
  },
  subtitle: {
    marginTop: '8px',
    textAlign: 'center',
    fontSize: StyleVariables.fonts.size.small,
    fontWeight: StyleVariables.fonts.weight.regular,
    lineHeight: StyleVariables.fonts.lineHeight.h6,
    letterSpacing: StyleVariables.fonts.letterSpacing.h6,
    marginLeft: '1rem',
    marginRight: '1rem',
    marginBottom: '1rem',
  },
  firstName: {
    textAlign: 'left',
    height: '40px',
    marginTop: '30px',
    borderRadius: '8px',
  },
  lastName: {
    textAlign: 'left',
    height: '40px',
    marginTop: '30px',
    borderRadius: '8px',
  },
  email: {
    height: '40px',
    marginTop: '30px',
    textAlign: 'left',
    borderRadius: '8px',
  },
  userName: {
    height: '40px',
    marginTop: '30px',
    textAlign: 'left',
    borderRadius: '8px',
  },
  password: {
    height: '40px',
    marginTop: '30px',
    textAlign: 'left',
    borderRadius: '8px',
    '&:focus': {
      webkitTextSecurity: 'disc',
    },
  },
  submit: {
    width: '100%',
    height: '2.5rem',
    justifyContent: 'center',
    borderRadius: '100px',
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
    [theme.breakpoints.down('md')]: {
      marginTop: '3rem',
    },
  },
  check: {
    width: '2.125rem',
    height: '1.125rem',
    marginTop: '0.5rem',
  },
  checkboxtext: {
    marginTop: '4px',
    textAlign: 'left',
  },
  eye: {
    position: 'relative',
    opacity: '0.5',
    marginTop: '-2rem',
    width: '1.375rem',
    height: '0.9375rem',
    float: 'right',
    right: '0.625rem',
  },
  reference: {
    color: 'black',
    fontWeight: StyleVariables.fonts.weight.semiBold,
  },
  formAccountContainer: {
    [theme.breakpoints.down('lg')]: {
      width: '100%',
    },
  },
  errorMessage: {
    color: StyleVariables.colors.text.critical,
    fontWeight: StyleVariables.fonts.weight.regular,
    fontSize: StyleVariables.fonts.size.xs,
    lineHeight: StyleVariables.fonts.lineHeight.small,
  },
  accountContainer: {
    justifyContent: 'center',
    display: 'flex',
    [theme.breakpoints.down('sm')]: {
      display: 'inline',
    },
  },
  buttonContainer: {
    display: 'flex',
  },
  blueCheck: {
    color: `${StyleVariables.colors.base.interactive} !important`,
    cursor: 'pointer',
  },
  formInput: {
    width: '100%',
    justifyContent: 'space-evenly',
    margin: 'auto',
    borderRadius: '0.5rem',
  },
  checkboxContainer: {
    display: 'contents',
    width: '100%',
    [theme.breakpoints.down('md')]: {
      marginLeft: '-2.5rem',
    },
  },
  checkerror: {
    marginTop: '4.5rem',
  },
  scrollablediv: {
    height: 'calc(100vh)',
    overflow: 'auto',
    scrollbarWidth: 'none',
    [theme.breakpoints.down('sm')]: {
      height: 'calc(100vh - 80px)',
    },
  },
  cssPage: {
    padding: 0,
    margin: 0,
  },
  paddingRight: {
    paddingRight: '2rem',
    [theme.breakpoints.down('md')]: {
      paddingLeft: '6rem',
    },
  },
  stepper: {
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  footer: {
    padding: '2.5rem',
    backgroundColor: StyleVariables.colors.surface.neutral.disabled,
    marginTop: '1rem',
    width: '50rem',
    [theme.breakpoints.down('lg')]: {
      marginLeft: '-18.5rem',
      marginTop: '11rem',
      position: 'relative',
    },
  },
  centerAlignment: {
    justifyContent: 'center',
    [theme.breakpoints.down('lg')]: {
      marginLeft: 0,
    },
  },
  heightAlignment: {
    height: '10%',
  },
  blueCheckbox: {
    maxWidth: '2rem',
    textAlign: 'left',
    display: 'contents',
  },
  checklabel: {
    display: 'inline-flex',
    marginLeft: '-4px',
    [theme.breakpoints.up('md')]: {
      marginLeft: '-9px',
    },
  },
}));

export default function CreateAccountPage() {
  const [sendInviteWhenSaving, setSendInviteWhenSaving] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const createAccountValue = useSelector((state: any) => state.createAccount);
  const [password, setPassword] = useState('');
  const [passwordMessage, setpasswordMessage] = useState('');
  const [emailMessage, setemailMessage] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const [values, setValues] = React.useState({
    password: '',
    showPassword: false,
  });

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  useEffect(() => {
    if (Object.values(createAccountValue).every((item) => item !== undefined)) {
      setFirstName(createAccountValue.firstName);
      setLastName(createAccountValue.lastName);
      setEmail(createAccountValue.email);
      setPassword(createAccountValue.password);
      setSendInviteWhenSaving(createAccountValue.agreeTerms);
    }
  }, [createAccountValue]);

  const handleSubmit = () => {
    dispatch({
      type: 'createAccount',
      payload: {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
        agreeTerms: sendInviteWhenSaving,
      },
    });
    gotoQuestionaire();
  };

  const gotoQuestionaire = () => {
    if (passwordMessage === '') {
      history.push({
        pathname: 'questionnaire',
      });
    }
  };

  const canSubmitForm: boolean =
    firstName !== '' &&
    lastName !== '' &&
    email !== '' &&
    emailMessage === '' &&
    password !== '' &&
    passwordMessage === '' &&
    sendInviteWhenSaving;
  const footerProps = {
    footerSectionProps: {
      to: 'questionnaire',
      visibility: 'none',
      text: 'Create account',
      mobileText: 'Create account',
      impaired: canSubmitForm,
      type: 'createAccount',
      title: 'Click here to create Account',
    },
  };
  const passwordValidate = () => {
    const passwordMatch = password.toLowerCase();
    const options = {
      minLength: 7,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    };
    if (
      passwordMatch.match(firstName.toLowerCase()) ||
      passwordMatch.match(lastName.toLowerCase())
    ) {
      setpasswordMessage('Password should not contain firstname or lastname');
    } else if (
      password !== '' &&
      !validator.isStrongPassword(password, options)
    ) {
      setpasswordMessage(
        'Password must be over 7 characters and contain at least 3 of the following: upper case, lower case, numbers and special characters'
      );
      setPasswordError(true);
      return false;
    } else {
      setpasswordMessage('');
      setPasswordError(false);
      return true;
    }
  };

  const emailValidate = () => {
    if (email !== '' && !validator.isEmail(email)) {
      setemailMessage('Invalid email address');
      setEmailError(true);
      return false;
    } else {
      setemailMessage('');
      setEmailError(false);
      return true;
    }
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  return (
    <Page className={classes.cssPage}>
      <style type="text/css">{liveChatContainer}</style>
      <style type="text/css">{mobileLiveChatContainerBox}</style>
      <Grid
        container
        className={clsx(classes.centerAlignment, classes.scrollablediv)}
      >
        <Grid item xs={12} sm={12} md={8} lg={6}>
          <header>
            <AboutSection count={STEPPER_DOTS} />
          </header>
          <Grid className={classes.stepper}>
            <Stepper count={STEPPER_DOTS}></Stepper>
          </Grid>
          <Grid item md={12} className={classes.heightAlignment}>
            <Typography className={classes.title} variant="h1" component="h1">
              Create your account
            </Typography>
            <Text className={classes.subtitle}>
              To get started you&apos;ll need to create a free Alcumus account.
            </Text>
          </Grid>
          <form
            method="post"
            className={classes.formContainer}
            onSubmit={handleSubmit}
          >
            <Grid container>
              <Grid item sm={2} md={2}></Grid>
              <Grid item xs={12} sm={8} md={8}>
                <Grid container className={clsx(classes.accountContainer)}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <FormControl
                        variant="standard"
                        fullWidth
                        className={clsx(
                          classes.formGroup,
                          classes.firstName,
                          classes.formAccountContainer
                        )}>
                        <Input
                          type="text"
                          label="First name"
                          required={true}
                          value={firstName}
                          data-testid="firstNameInput"
                          onChange={(e) => setFirstName(e.target.value)}
                        />
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <FormControl
                        variant="standard"
                        fullWidth
                        className={clsx(
                          classes.formGroup,
                          classes.lastName,
                          classes.formAccountContainer
                        )}>
                        <Input
                          type="text"
                          label="Last name"
                          required={true}
                          value={lastName}
                          data-testid="lastNameInput"
                          onChange={(e) => setLastName(e.target.value)}
                        />
                      </FormControl>
                    </Grid>
                  </Grid>
                  <Grid item sm={12}>
                    <FormControl
                      variant="standard"
                      fullWidth
                      className={clsx(
                        classes.formGroup,
                        classes.email,
                        classes.formAccountContainer
                      )}>
                      <Input
                        className={classes.formInput}
                        state={emailError ? 'error' : 'default'}
                        type="email"
                        label="Email address"
                        required={true}
                        value={email}
                        data-testid="email"
                        onKeyUp={emailValidate}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                      <Typography
                        data-testid="emailError"
                        className={classes.errorMessage}
                      >
                        {emailMessage}
                      </Typography>
                    </FormControl>
                  </Grid>
                  <Grid item sm={12}>
                    <FormControl
                      variant="standard"
                      fullWidth
                      className={clsx(
                        classes.formGroup,
                        classes.password,
                        classes.formAccountContainer
                      )}>
                      <div>
                        <Input
                          className={classes.formInput}
                          state={passwordError ? 'error' : 'default'}
                          id="standard-adornment-password"
                          type={values.showPassword ? 'text' : 'password'}
                          name="Password"
                          ng-model="dataItem.password"
                          onChange={handlePassword}
                          onKeyUp={passwordValidate}
                          value={password}
                          required={true}
                          data-testid="passwordInput"
                          label="Password"
                        />
                        {values && (
                          <span
                            className={classes.eye}
                            onClick={handleClickShowPassword}
                          >
                            {' '}
                            {values.showPassword ? (
                              <Visibility />
                            ) : (
                              <VisibilityOff aria-hidden="false" />
                            )}
                          </span>
                        )}
                      </div>
                      <Typography
                        data-testid="passwordInputError"
                        className={classes.errorMessage}
                      >
                        {passwordMessage}
                      </Typography>
                    </FormControl>
                  </Grid>
                  <Grid
                    container
                    className={clsx(
                      passwordMessage
                        ? classes.checkerror
                        : classes.formAction2,
                      classes.buttonContainer
                    )}
                  >
                    <FormControl
                      variant="standard"
                      className={clsx(
                        classes.accountContainer,
                        classes.checkboxContainer
                      )}>
                      <Grid item xs={1} className={clsx(classes.blueCheckbox)}>
                        <label className={classes.checklabel}>
                          <input
                            type="checkbox"
                            className={clsx(classes.check, classes.blueCheck)}
                            checked={sendInviteWhenSaving}
                            required={true}
                            onChange={(e) =>
                              setSendInviteWhenSaving(e.target.checked)
                            }
                            // aria-label= 'I Agree'
                            data-testid="termsOfPolicyInput"
                          />
                          <Grid item>
                            <Text className={classes.checkboxtext}>
                              I agree to Alcumus&apos;{' '}
                              <a
                                className={classes.reference}
                                href={REFERENCE.PRIVACY_POLICY}
                                target="_blank"
                                tabIndex={-1}
                                title="Click here for Privacy Policy"
                                rel="noreferrer noopener"
                              >
                                Privacy Policy
                              </a>{' '}
                              and{' '}
                              <a
                                href={REFERENCE.TERMS_OF_SERVICE}
                                className={classes.reference}
                                target="_blank"
                                tabIndex={-1}
                                title="Click here for Terms of Service"
                                rel="noreferrer noopener"
                              >
                                Terms of Service
                              </a>
                            </Text>
                          </Grid>
                        </label>
                      </Grid>
                    </FormControl>
                  </Grid>
                  <Grid
                    item
                    sm={12}
                    className={clsx(
                      classes.formAction,
                      classes.accountContainer
                    )}
                  >
                    <Button
                      className={classes.submit}
                      type="submit"
                      variant="contained"
                      color="primary"
                      disabled={!canSubmitForm}
                      data-testid="createAccount"
                      tabIndex={0}
                    >
                      Create account
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item sm={2} md={2}></Grid>
            </Grid>
          </form>
        </Grid>

        <RightHomeSection />
      </Grid>
      <Grid className={classes.stepper}>
        <MobileFooterSection register={handleSubmit} {...footerProps} />
      </Grid>
    </Page>
  );
}
