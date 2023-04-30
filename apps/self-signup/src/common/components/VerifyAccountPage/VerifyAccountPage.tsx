import { Grid } from '@mui/material';
import { makeStyles } from '@mui/styles';
import {
  AlertSnackbar,
  Button,
  Image,
  PageWithNavbar as SelfSignupPage,
  Text,
  TranslateReady,
  StyleVariables,
} from '@alcumus/components';
import React, { useEffect, useState } from 'react';
import { TFunction } from 'i18next';
import { Trans } from 'react-i18next';
import axios from 'axios';
import { RegisterFormData } from '../../../client/redux/reducers/register-reducer';
import Analytics from '@alcumus/analytics-package';
import { FeatureToggles } from '../../constants/featureToggles';
import environmentVariables from '../../environmentVariables';
import ReCAPTCHA from 'react-google-recaptcha';
import { Constants } from '@alcumus/core';

export interface VerifyAccountPageProps {
  form: RegisterFormData;
  autoDismissToastDuration?: number;
  t: TFunction;
  tReady: boolean;
}

const useStyles = makeStyles({
  page: {
    backgroundColor: StyleVariables.colors.surface.default,
  },
  header: {
    fontWeight: 600,
  },
  body: {
    fontWeight: 500,
  },
  image: {
    maxWidth: '385px',
    width: '70vw',
  },
  gridContainer: {
    padding: '1rem',
    marginTop: '4rem',
    '& > *': {
      marginTop: '2rem',
    },
  },
});

export default function VerifyAccountPage({
  form,
  autoDismissToastDuration = 6000,
  t,
  tReady,
}: VerifyAccountPageProps) {
  const analytics = Analytics.getInstance();
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [isResendingEmail, setIsResendingEmail] = useState(false);
  const recaptchaRef = React.useRef<ReCAPTCHA>();

  useEffect(() => {
    window.document.title = t('header');
  }, [t, tReady]);

  const openToast = () => setOpen(true);

  const dismissToast = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const resendEmail = async () => {
    setIsResendingEmail(true);
    let recaptchaToken;
    if (FeatureToggles.useRecaptcha()) {
      recaptchaToken = await recaptchaRef.current.executeAsync();
    }
    try {
      const { organizationId, employeeProfileId } = form;
      await axios.post(
        '/api/resendVerificationEmail',
        {
          organizationId,
          employeeProfileId,
        },
        {
          headers: {
            [Constants.RequestHeaders.ReCAPTCHAToken]: recaptchaToken,
          },
        }
      );
    } finally {
      setIsResendingEmail(false);
      openToast();
    }
    analytics.trackWithCategory(
      'Email Verification',
      'Email Verification Retry'
    );
  };

  return (
    <TranslateReady tReady={tReady}>
      <SelfSignupPage>
        <AlertSnackbar
          message={t('alertMessage')}
          open={open}
          onClose={dismissToast}
          autoHideDuration={autoDismissToastDuration}
          severity="success"
        />
        <Grid
          container
          direction="column"
          alignContent="center"
          className={classes.gridContainer}
        >
          {FeatureToggles.useRecaptcha() && (
            <ReCAPTCHA
              ref={recaptchaRef}
              size="invisible"
              sitekey={environmentVariables.SELF_SIGNUP_RECAPTCHA_SITE_KEY}
            />
          )}
          <Grid item>
            <Text center as="h2" className={classes.header}>
              {t('header')}
            </Text>
          </Grid>
          <Grid item>
            <Text center as="h4" className={classes.body}>
              <Trans i18nKey="bodyLine1" t={t}>
                We have sent an account activation email to
                <strong>{{ email: form.email }}</strong>
              </Trans>
            </Text>
            <Text center as="h4" className={classes.body}>
              {t('bodyLine2')}
            </Text>
          </Grid>
          <Grid item container direction="column" alignItems="center">
            <Image
              src="/images/sending_emails_monochromatic.svg"
              alt={t('sendingEmailAltText')}
              className={classes.image}
            />
          </Grid>
          <Grid item container direction="column" alignItems="center">
            <Button
              rounded
              variant="outlined"
              onClick={resendEmail}
              disabled={isResendingEmail}
              data-testid="resendEmailButton"
            >
              <Text center as="h5">
                {t('resendVerificationText')}
              </Text>
            </Button>
          </Grid>
        </Grid>
      </SelfSignupPage>
    </TranslateReady>
  );
}
