import { Grid, Link } from '@mui/material';
import { makeStyles } from '@mui/styles';
import Analytics from '@alcumus/analytics-package';
import { Field, useFormikContext } from 'formik';
import { TFunction } from 'i18next';
import React, { useCallback } from 'react';
import { Trans } from 'react-i18next';
import { RegisterFormData } from '../../../../client/redux/reducers/register-reducer';
import { StyleVariables } from '@alcumus/components';
import LabeledCheckBox from '../../LabeledCheckBox';
import PasswordSection from './Components/PasswordSection';
import SubmitButton from './Components/SubmitButton';
import {
  validateChecked,
  validateEmailFormat,
  validateEmailWithAPI,
  validateRequired,
} from './validations';
import RegisterFormTextField from './Components/RegisterFormTextField';

export interface RegisterFormStep2Props {
  t: TFunction;
  tReady: boolean;
  variant: string;
}

const useStyles = makeStyles({
  passwordToolTipSection: {
    padding: '0.5rem 1rem 0.5rem 1rem',
  },
  passwordTooltip: {
    listStyleType: '"\\2022"',
    marginBottom: 0,
    marginTop: 0,
    '& li': {
      paddingLeft: '0.625rem',
      marginLeft: '-1.5rem',
    },
  },
  labelledCheckBox: {
    marginTop: StyleVariables.spacing(2),
  },
  passwordRow: {
    marginTop: StyleVariables.spacing(1),
  },
});

export default function RegisterFormStep2({
  t,
  tReady,
  variant,
}: RegisterFormStep2Props) {
  const analytics = Analytics.getInstance();
  const classes = useStyles();
  const { isSubmitting, errors } = useFormikContext<RegisterFormData>();
  const registerFormVariant = { 'Design Variant': variant };

  const validateEmail = useCallback(
    async (email) =>
      validateRequired(email) ||
      validateEmailFormat(email, t) ||
      (await validateEmailWithAPI(email)),
    [t, tReady]
  );
  const validateTermsCheck = useCallback(
    (value) => validateChecked(value, t),
    [t, tReady]
  );

  const trackEmailChange = (e: React.FocusEvent<HTMLInputElement>) => {
    const { value } = e.target;
    if (value) {
      analytics.trackWithCategory('Signup Form', 'Email Id Entered', {
        value,
        ...registerFormVariant,
      });
    }
  };

  const passwordTipsList: Array<string> = t('tooltips.password.tips', {
    returnObjects: true,
    defaultValue: [],
  });

  return (
    <Grid container spacing={2}>
      <Field name="enrollmentDate" data-testid="enrollmentDate" hidden />
      <RegisterFormTextField
        name="email"
        validate={validateEmail}
        label={t('labels.email')}
        placeholder={t('placeholders.email')}
        tooltip={t('tooltips.email')}
        data-testid="email"
        autoComplete="email"
        onBlur={trackEmailChange}
        gridItemProps={{
          xs: 12,
        }}
      />
      <Grid item xs={12} className={classes.passwordRow}>
        <PasswordSection
          debounceInterval={500}
          name="password"
          label={t('labels.password')}
          disabled={isSubmitting}
          placeholder="·····"
          data-testid="password"
          autoComplete="new-password"
          hint={errors.password || ''}
          tooltip={
            <div>
              <ul className={classes.passwordTooltip}>
                {passwordTipsList.map((tip, index) => (
                  <li key={index}>{tip}</li>
                ))}
              </ul>
            </div>
          }
        />
      </Grid>
      <Field
        name="termsCheck"
        type="checkbox"
        validateOnChange={true}
        validate={validateTermsCheck}
      >
        {({ field }) => (
          <Grid item xs={12}>
            <LabeledCheckBox
              name="termsCheck"
              data-testid="terms"
              className={classes.labelledCheckBox}
              {...field}
            >
              <Trans i18nKey="terms" t={t}>
                By creating an account I agree to Alcumus’s <br />
                {/* eslint-disable-next-line */}
                <Link
                  data-testid="Privacy-Link"
                  href="https://www.ecompliance.com/privacy/"
                  target="_blank"
                  underline="always"
                >
                  Privacy Policy
                </Link>
                and
                {/* eslint-disable-next-line */}
                <Link
                  data-testid="ToS-Link"
                  href="https://www.ecompliance.com/legal/"
                  target="_blank"
                  underline="always"
                >
                  Terms of service
                </Link>
              </Trans>
            </LabeledCheckBox>
          </Grid>
        )}
      </Field>
      <Grid item xs={12}>
        <SubmitButton t={t} />
      </Grid>
    </Grid>
  );
}
