import React, { useEffect, useState } from 'react';
import { Checkbox, Grid, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import MotoAboutSection from '../../components/MotoAboutSection';
import FormControl from '@mui/material/FormControl';
import { useHistory } from 'react-router-dom';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { StyleVariables, Button, Input, Text, Page } from '@alcumus/components';
import clsx from 'clsx';
import validator from 'validator';
import { useDispatch } from 'react-redux/es/hooks/useDispatch';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import MotoMobileFooterSection from '../../components/MotoMobileFooterSection';
import MotoRightHomeSection from '../../components/MotoRightHomeSection';
import { REFERENCE } from '../../components/constants';
import MotoStepper from '../../components/MotoStepper';
import { liveChatContainer, mobileLiveChatContainerBox } from '../../constants';
import { createTheme} from '@mui/material';

const STEPPER_DOTS = 1;

const Breakpoints = createTheme().breakpoints;
const useStyles = makeStyles((theme) => ({
  image: {
    maxHeight: '768px',
    marginLeft: '44px',
    [Breakpoints.only('sm')]: {
      display: 'none',
    },
    [Breakpoints.down('lg')]: {
      display: 'none',
    },
  },
  formGroup: {
    marginBottom: '1rem',
    textAlign: 'left',
  },
  formAction: {
    marginTop: '40px',

    borderRadius: '100%',
  },
  formAction2: {
    marginTop: '1.5rem',
  },
  formContainer: {
    textAlign: 'center',
    alignContent: 'center',

    [Breakpoints.down('md')]: {
      marginLeft: '1rem',
      marginRight: '1rem',
    },
  },
  title: {
    marginTop: '4rem',
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
    [Breakpoints.down('sm')]: {
      display: 'none',
    },
    [Breakpoints.down('md')]: {
      marginTop: '3rem',
    },
  },
  check: {
    width: '1.125rem',
    height: '1.125rem',
    marginTop: '0.5rem',
  },
  checkboxtext: {
    marginTop: '5px',
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
    [Breakpoints.down('lg')]: {
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
    [Breakpoints.down('sm')]: {
      display: 'inline',
    },
  },
  buttonContainer: {
    display: 'flex',
  },
  blueCheck: {
    color: `${StyleVariables.colors.base.interactive} !important`,
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
    [Breakpoints.down('md')]: {
      marginLeft: '-2.5rem',
    },
  },
  checkerror: {
    width: '100%',
    height: '40px',
    marginTop: '4.5rem',
  },
  scrollablediv: {
    height: 'calc(100vh)',
    overflow: 'auto',
    scrollbarWidth: 'none',
    [Breakpoints.down('sm')]: {
      height: 'calc(100vh - 80px)',
    },
  },
  cssPage: {
    padding: 0,
    margin: 0,
  },
  paddingRight: {
    paddingRight: '2rem',
    [Breakpoints.down('md')]: {
      paddingLeft: '6rem',
    },
  },
  stepper: {
    [Breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  footer: {
    padding: '2.5rem',
    backgroundColor: StyleVariables.colors.surface.neutral.disabled,
    marginTop: '1rem',
    width: '50rem',
    [Breakpoints.down('lg')]: {
      marginLeft: '-18.5rem',
      marginTop: '11rem',
      position: 'relative',
    },
  },
  centerAlignment: {
    justifyContent: 'center',
    [Breakpoints.down('lg')]: {
      marginLeft: 0,
    },
  },
  heightAlignment: {
    height: '10%',
  },
  blueCheckbox: {
    maxWidth: '2rem',
    textAlign: 'left',
  },
}));

export default function MotoCreateAccountPage() {
  const [sendInviteWhenSaving, setSendInviteWhenSaving] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const createAccountValue = useSelector((state: any) => state.motoCreateAccount);
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
      type: 'motoCreateAccount',
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
      to: 'moto/questionnaire',
      visibility: 'none',
      text: 'Create account',
      mobileText: 'Create account',
      impaired: canSubmitForm,
      type: 'createAccount',
    },
  };
  const passwordValidate = () => {
    const options = {
      minLength: 7,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    };
    if (password !== '' && !validator.isStrongPassword(password, options)) {
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
          <MotoAboutSection count={STEPPER_DOTS} />
          <Grid className={classes.stepper}>
            <MotoStepper count={STEPPER_DOTS}></MotoStepper>
          </Grid>
          <Grid item md={12} className={classes.heightAlignment}>
            <Text className={classes.title}>Create your account</Text>
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
                              <VisibilityOff />
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
                        <Checkbox
                          className={clsx(classes.check, classes.blueCheck)}
                          checked={sendInviteWhenSaving}
                          required={true}
                          inputProps={{
                            'aria-label': 'I Agree',
                            // @ts-ignore
                            'data-testid': 'termsOfPolicyInput',
                          }}
                          onChange={(e) =>
                            setSendInviteWhenSaving(e.target.checked)
                          }
                        />
                      </Grid>
                      <Grid item xs={11}>
                        <Text className={classes.checkboxtext}>
                          I agree to Alcumus&apos;{' '}
                          <a
                            className={classes.reference}
                            href={REFERENCE.PRIVACY_POLICY}
                            target="_blank"
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
                            title="Click here for Terms of Service"
                            rel="noreferrer noopener"
                          >
                            Terms of Service
                          </a>
                        </Text>
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

        <MotoRightHomeSection />
      </Grid>
      <Grid className={classes.stepper}>
        <MotoMobileFooterSection register={handleSubmit} {...footerProps} />
      </Grid>
    </Page>
  );
}
