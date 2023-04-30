import React, { useState } from 'react';
import {
  Alert,
  Button,
  Navbar,
  Page,
  StyleVariables,
  Text,
  TranslateReady,
} from '@alcumus/components';
import { Price } from '../../../types/plans';
import {
  Checkbox,
  FormControlLabel,
  Grid,
  Theme,
  Link,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Trans } from 'react-i18next';
import { TFunction } from 'i18next';
import clsx from 'clsx';
import {
  LINK_CANCELLATION_POLICY,
  LINK_REFUND_POLICY,
  LINK_USER_LICENSE_AGREEMENT,
} from '../../constants/links';
import getStarted from '../../services/getStarted';
import Stepper from '../Stepper/Stepper';
import ReviewInputs from './ReviewInputs/ReviewInputs';
import ReviewSummary from './ReviewSummary/ReviewSummary';

interface ReviewPageProps {
  t: TFunction;
  tReady: boolean;
  price: Price;
  seats: number;
  minSeats: number;
  accountHolderName: string;
  accountHolderEmail: string;
}

const useStyles = makeStyles((theme: Theme) => ({
  page: {
    padding: 0,
    backgroundColor: StyleVariables.colors.surface.default,
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
  },
  navbar: {
    padding: '16px',
    borderBottom: `1px solid ${StyleVariables.colors.surface.hover}`,
    [theme.breakpoints.down('sm')]: {
      borderBottom: 0,
    },
  },
  inputsArea: {
    padding: '32px',
  },
  rightSidebar: {
    backgroundColor: StyleVariables.colors.surface.neutral?.disabled,
    padding: '32px',
  },
  sectionTitle: {
    fontWeight: 600,
  },
  reviewTitle: {
    [theme.breakpoints.down('sm')]: { marginTop: '-4rem' },
  },
  asterisk: {
    color: StyleVariables.colors.text.critical,
  },
  details: {
    marginTop: '32px',
  },
  inputs: {
    marginTop: '24px',
    paddingRight: '200px',
  },
  mainArea: {
    flexGrow: 1,
  },
  bottomBar: {
    padding: '32px',
    borderTop: `1px solid ${StyleVariables.colors.surface.hover}`,
    textAlign: 'right',
    [theme.breakpoints.down('sm')]: { textAlign: 'left' },
  },
  billingAccountDetails: {
    marginTop: '24px',
    [theme.breakpoints.down('md')]: { marginBottom: '2.25rem' },
  },
  billingAccountDetailLabel: {
    fontSize: StyleVariables.fonts.size.small,
  },
  billingAccountDetailValue: {
    padding: '16px 0',
  },
  stepper: {
    marginTop: '-5rem',
    [theme.breakpoints.down('sm')]: { marginTop: 0 },
  },
  button: {
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      marginTop: '1.5rem',
    },
    minWidth: '300px',
  },
  content: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  seatsHint: {
    marginTop: StyleVariables.spacing(3),
    marginBottom: StyleVariables.spacing(2),
    paddingRight: '200px',
    '& h6': {
      fontSize: StyleVariables.fonts.size.small,
    },
  },
}));

export default function ReviewPage({
  t,
  price,
  seats,
  minSeats,
  tReady,
  accountHolderName,
  accountHolderEmail,
}: ReviewPageProps) {
  const classes = useStyles();

  const [termsCheck, setTermsCheck] = useState(false);
  const [processing, setProcessing] = useState(false);

  const handleProceed = async () => {
    setProcessing(true);
    try {
      const data = await getStarted(price.id, seats);
      window.location.href = data.url;
    } finally {
      setProcessing(false);
    }
  };
  const steps = t('stepper', {
    returnObjects: true,
    defaultValue: [],
  }) as Array<string>;

  return (
    <TranslateReady tReady={tReady}>
      <Page className={classes.page}>
        <div className={classes.navbar}>
          <Navbar />
        </div>
        <Grid container justifyContent="center">
          <Grid item xs={12} md={5}>
            <div className={classes.stepper}>
              <Stepper steps={steps} activeStep={1} />
            </div>
          </Grid>
        </Grid>
        <div className={classes.content}>
          <Grid container className={classes.mainArea}>
            <Grid item xs={12} md={7} className={classes.inputsArea}>
              <Text as="h4" className={classes.sectionTitle}>
                {t('reviewSubscription')}
              </Text>

              <p>
                <span className={classes.asterisk}>*</span>
                {t('requiredFieldLegend')}
              </p>

              <Text
                as="h5"
                className={clsx([classes.sectionTitle, classes.details])}
              >
                {t('details')}
              </Text>

              <div className={classes.inputs}>
                <ReviewInputs disabled={processing} />
              </div>

              <div className={classes.seatsHint}>
                <Alert
                  severity="info"
                  message={t('additionalSeatsHint', { seats: minSeats })}
                />
              </div>

              <Text
                as="h5"
                className={clsx([classes.sectionTitle, classes.details])}
              >
                {t('billingAccountDetails')}
              </Text>

              <div className={classes.billingAccountDetails}>
                <Grid container>
                  <Grid item xs={12} md={3}>
                    <div className={classes.billingAccountDetailLabel}>
                      {t('accountHolderNameLabel')}
                    </div>
                    <div className={classes.billingAccountDetailValue}>
                      {accountHolderName}
                    </div>
                  </Grid>
                  <Grid item xs={12} md={3}>
                    <div className={classes.billingAccountDetailLabel}>
                      {t('accountHolderEmailLabel')}
                    </div>
                    <div className={classes.billingAccountDetailValue}>
                      {accountHolderEmail}
                    </div>
                  </Grid>
                </Grid>
              </div>
            </Grid>

            <Grid item xs={12} md={5} className={classes.rightSidebar}>
              <Text
                as="h5"
                className={clsx(classes.sectionTitle, classes.reviewTitle)}
              >
                {t('subscriptionTotal')}
              </Text>
              <ReviewSummary />
            </Grid>
          </Grid>
          <div className={classes.bottomBar}>
            <FormControlLabel
              control={
                <Checkbox
                  disabled={processing}
                  checked={termsCheck}
                  onChange={(e) => setTermsCheck(e.target.checked)}
                  color="primary"
                />
              }
              label={
                <Trans i18nKey="terms" t={t}>
                  I agree to the
                  <Link
                    data-testid="cancellationPolicyLink"
                    href={LINK_CANCELLATION_POLICY}
                    target="_blank"
                    underline="always"
                  >
                    Cancellation Policy
                  </Link>
                  and
                  <Link
                    data-testid="refundPolicyLink"
                    href={LINK_REFUND_POLICY}
                    target="_blank"
                    underline="always"
                  >
                    Refund policy
                  </Link>
                  , and
                  <Link
                    data-testid="userLicenseAgreementLink"
                    href={LINK_USER_LICENSE_AGREEMENT}
                    target="_blank"
                    underline="always"
                  >
                    User licence agreement
                  </Link>
                </Trans>
              }
            />
            <Button
              rounded
              disabled={!termsCheck || processing}
              onClick={handleProceed}
              className={classes.button}
              showLoadingIndicator={processing}
            >
              {t('proceedToSecureCheckout')}
            </Button>
          </div>
        </div>
      </Page>
    </TranslateReady>
  );
}
