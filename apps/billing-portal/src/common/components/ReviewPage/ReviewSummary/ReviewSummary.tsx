import { Plan, Price } from '../../../../types/plans';
import {
  Alert,
  Image,
  StyleVariables,
  Text,
  TranslateReady,
} from '@alcumus/components';
import clsx from 'clsx';
import { TFunction } from 'i18next';
import React from 'react';
import { Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { BillingFrequency } from '../../../../types/billingFrequency';
import { alcumusLogoIcon } from '../../../constants/images';
import calculateYearlySavings from '../../../../lib/utils/calculateYearlySavings';

interface ReviewSummaryProps {
  plan: Plan;
  billingFrequency: BillingFrequency;
  price: Price;
  seats: number;
  t: TFunction;
  tReady: boolean;
}

const useStyles = makeStyles((theme: Theme) => ({
  logo: {
    width: '72px',
    height: '72px',
  },
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
  },
  summary: {
    marginTop: '40px',
    display: 'flex',
    justifyContent: 'space-between',
    paddingBottom: '32px',
  },
  plan: {
    display: 'flex',
    width: '100%',
  },
  planName: {
    marginLeft: '16px',
    fontWeight: StyleVariables.fonts.weight.bold,
  },
  planSeats: {
    display: 'inline',
  },
  amounts: {
    display: 'inline',
    flexDirection: 'column',
    textAlign: 'right',
    '& > *': {
      marginBottom: '8px',
    },
  },
  total: {
    borderTop: `1px solid ${StyleVariables.colors.border.default}`,
    display: 'flex',
    padding: '16px 0',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  totalBeforeTaxes: {
    fontWeight: StyleVariables.fonts.weight.medium,
    marginRight: '45px',
  },
  totalAmount: {
    fontWeight: StyleVariables.fonts.weight.semiBold,
  },
  summaryCreditNote: {
    marginTop: 'auto',
    marginBottom: '60px',
    [theme.breakpoints.down('sm')]: {
      marginBottom: 0,
    },
  },
  savingsHint: {
    marginTop: StyleVariables.spacing(2),
    marginBottom: StyleVariables.spacing(2),
    width: '100%',
  },
  seatsAndAmount: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '0.75rem',
    fontWeight: StyleVariables.fonts.weight.semiBold,
  },
}));

export default function ReviewSummary({
  plan,
  price,
  seats,
  tReady,
  billingFrequency,
  t,
}: ReviewSummaryProps) {
  const classes = useStyles();

  // The 'currency' variable determines what
  // currency the values are localized for
  const currency = price.currency;
  const total = (price.price * seats) / 100;

  const savings =
    billingFrequency === BillingFrequency.YEARLY &&
    calculateYearlySavings(plan);

  return (
    <TranslateReady tReady={tReady}>
      <div className={classes.wrapper}>
        <div className={classes.summary}>
          <div className={classes.plan}>
            <Image
              data-testid="alcumusLogo"
              src={alcumusLogoIcon}
              alt={t('logoAlt')}
              className={classes.logo}
            />
            <div style={{ width: '100%' }}>
              <Text as="h5" className={classes.planName}>
                {plan.name} {t('plan')}
              </Text>
              <div className={classes.seatsAndAmount}>
                <Text
                  as="h6"
                  className={clsx(classes.planName, classes.planSeats)}
                >
                  {seats} {t('seats')},{' '}
                  {billingFrequency === BillingFrequency.MONTHLY
                    ? t('billedMonthly')
                    : t('billedYearly')}
                </Text>
                <div className={classes.amounts}>
                  {t('perUser', {
                    price: price.price / 100,
                    formatParams: { price: { currency } },
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>

        {savings > 0 && (
          <Alert
            className={classes.savingsHint}
            severity="success"
            message={t('savingsHint', {
              amount: savings,
              formatParams: {
                amount: {
                  currency: price.currency,
                  minimumFractionDigits: 0,
                },
              },
            })}
          />
        )}

        <div className={classes.total}>
          <Text as="h6" className={classes.totalBeforeTaxes}>
            {t('totalBeforeTaxes')}
          </Text>
          <Text as="h4" className={classes.totalAmount}>
            {t('totalBeforeTaxesAmount', {
              total,
              formatParams: { total: { currency } },
            })}
          </Text>
        </div>
        <p className={classes.summaryCreditNote}>{t('summaryCreditNote')}</p>
      </div>
    </TranslateReady>
  );
}
