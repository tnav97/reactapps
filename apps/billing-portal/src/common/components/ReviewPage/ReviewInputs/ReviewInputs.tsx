import React from 'react';
import { Grid } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Plan } from '../../../../types/plans';
import { TFunction } from 'i18next';
import { TranslateReady, Input, Select } from '@alcumus/components';
import { clamp } from 'lodash';
import { BillingFrequency } from '../../../../types/billingFrequency';

interface ReviewInputProps {
  t: TFunction;
  tReady: boolean;
  disabled?: boolean;
  plans: Plan[];
  plan: Plan;
  seats: number;
  minSeats: number;
  billingFrequency: BillingFrequency;
  setPlan: (plan: Plan) => void;
  setSeats: (seats: number) => void;
  setBillingFrequency: (billingFrequency: BillingFrequency) => void;
}

const useStyles = makeStyles({
  input: {
    padding: '11px 8px',
  },
});

export default function ReviewInputs({
  plans,
  plan,
  seats,
  minSeats,
  disabled = false,
  billingFrequency,
  t,
  tReady,
  setPlan,
  setSeats,
  setBillingFrequency,
}: ReviewInputProps) {
  const classes = useStyles();

  const onPlanChange = (e) => {
    const plan = plans.find(
      (p) => p.id.toString() === e.target.value.toString()
    );

    if (plan) {
      setPlan(plan);
    }
  };

  const clampedSetSeats = (seats: number, lower = minSeats, upper = 150) => {
    setSeats(clamp(seats, lower, upper));
  };

  return (
    <TranslateReady tReady={tReady}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <Select
            disabled={disabled}
            value={plan.id}
            label={t('pricingPlan')}
            required
            items={plans.map((plan) => ({ id: plan.id, name: plan.name }))}
            onChange={onPlanChange}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <Input
            disabled={disabled}
            required
            type={'number'}
            min={minSeats}
            max={150}
            helperText={t('maxSeatsHint')}
            value={seats}
            className={classes.input}
            label={t('seats')}
            onChange={(e) => clampedSetSeats(parseInt(e.target.value))}
            onIncrementButtonClick={(increment) =>
              clampedSetSeats(seats + increment)
            }
            showIncrementButtons={true}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <Select
            disabled={disabled}
            required
            value={billingFrequency}
            label={t('billingCycle')}
            onChange={(e) =>
              setBillingFrequency(e.target.value as BillingFrequency)
            }
            items={[BillingFrequency.MONTHLY, BillingFrequency.YEARLY].map(
              (frequency) => ({
                id: frequency,
                name: t(`billingFrequency.${frequency}`),
              })
            )}
          />
        </Grid>
      </Grid>
    </TranslateReady>
  );
}
