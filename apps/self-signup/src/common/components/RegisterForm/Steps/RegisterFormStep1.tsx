import { Grid } from '@mui/material';
import { makeStyles } from '@mui/styles';
import Analytics from '@alcumus/analytics-package';
import { TFunction } from 'i18next';
import React, { useCallback } from 'react';
import {
  validateCompanyNameWithAPI,
  validateLength,
  validateRequired,
} from './validations';
import { StyleVariables } from '@alcumus/components';
import RegisterFormTextField from './Components/RegisterFormTextField';

export interface RegisterFormStep1Props {
  t: TFunction;
  tReady: boolean;
  variant: string;
}

const useStyles = makeStyles({
  secondRow: {
    marginTop: StyleVariables.spacing(1),
  },
});

export default function RegisterFormStep1({
  t,
  tReady,
  variant,
}: RegisterFormStep1Props) {
  const classes = useStyles();
  const analytics = Analytics.getInstance();
  const validateName = useCallback(
    (name) => validateRequired(name) || validateLength(name, 2, 100, t),
    [t, tReady]
  );
  const registerFormVariant = { 'Design Variant': variant };
  const validateCompanyName = useCallback(
    async (name) =>
      validateRequired(name) ||
      validateLength(name, 2, 100, t) ||
      (await validateCompanyNameWithAPI(name)),
    [t, tReady]
  );

  const trackCompanyNameChange = (e: React.FocusEvent<HTMLInputElement>) => {
    const { value } = e.target;
    if (value) {
      analytics.trackWithCategory('Signup Form', 'Company Name Entered', {
        value,
        ...registerFormVariant,
      });
    }
  };

  return (
    <Grid container spacing={2}>
      <RegisterFormTextField
        name="firstName"
        validate={validateName}
        label={t('labels.firstName')}
        placeholder={t('placeholders.firstName')}
        data-testid="firstName"
        autoComplete="given-name"
        gridItemProps={{
          xs: 6,
        }}
      />
      <RegisterFormTextField
        name="lastName"
        validate={validateName}
        label={t('labels.lastName')}
        placeholder={t('placeholders.lastName')}
        data-testid="lastName"
        autoComplete="family-name"
        gridItemProps={{
          xs: 6,
        }}
      />
      <RegisterFormTextField
        name="companyName"
        validate={validateCompanyName}
        label={t('labels.companyName')}
        placeholder={t('placeholders.companyName')}
        data-testid="companyName"
        autoComplete="organization"
        onBlur={trackCompanyNameChange}
        className={classes.secondRow}
        gridItemProps={{
          xs: 12,
        }}
      />
    </Grid>
  );
}
