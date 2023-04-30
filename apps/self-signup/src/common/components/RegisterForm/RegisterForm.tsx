import { Center, Text, StyleVariables } from '@alcumus/components';
import { Grid } from '@mui/material';
import { makeStyles } from '@mui/styles';
import axios from 'axios';
import { TFunction } from 'i18next';
import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import {
  RegisterFormData,
  ValidationResult,
} from '../../../client/redux/reducers/register-reducer';
import Analytics from '@alcumus/analytics-package';
import RegisterFormSinglePage from './RegisterFormSinglePage';
import RegisterFormMultiplePages from './RegisterFormMultiplePages';
import { RegisterFormVariant } from '../../types/registerForm';
import ReCAPTCHA from 'react-google-recaptcha';
import environmentVariables from '../../environmentVariables';
import { Constants } from '@alcumus/core';
import { FeatureToggles } from '../../constants/featureToggles';
import { reportBroswerHandledError } from '@alcumus/browser-web-utils';

export interface RegisterFormProps {
  setForm: (details: RegisterFormData) => void;
  form?: RegisterFormData;
  t: TFunction;
  tReady: boolean;
  variant?: RegisterFormVariant;
}

function getAnalyticsVariant(registerFormVariant: RegisterFormVariant) {
  return {
    'Design Variant': registerFormVariant,
  };
}

const useStyles = makeStyles({
  heading: {
    marginTop: StyleVariables.spacing(5),
    fontFamily: StyleVariables.fonts.family.heading,
    fontWeight: 600,
    textAlign: 'center',
  },
  valueStatement: {
    marginTop: StyleVariables.spacing(1.5),
    textAlign: 'center',
  },
  form: {
    marginTop: StyleVariables.spacing(7),
  },
  backdrop: {
    color: StyleVariables.colors.surface.default,
    zIndex: 1,
  },
});

class ValidationError extends Error {
  public errors: ValidationResult;

  constructor(error) {
    super();
    this.errors = error.response.data;
  }

  getError(name: string) {
    return this.errors && this.errors[name];
  }
}

const submitForm = async (form, recaptchaToken = '') => {
  try {
    return (
      await axios.post('/api/submitForm', form, {
        headers: { [Constants.RequestHeaders.ReCAPTCHAToken]: recaptchaToken },
      })
    ).data;
  } catch (e: any) {
    if (e.response.status === 422) {
      throw new ValidationError(e);
    } else {
      console.error(e.response);
      throw e;
    }
  }
};

export default function RegisterForm({
  setForm,
  variant = RegisterFormVariant.SINGLE_PAGE,
  t,
  tReady,
}: RegisterFormProps) {
  if (!tReady) {
    return <></>;
  }
  const analytics = Analytics.getInstance();

  useEffect(() => {
    analytics.trackWithCategory(
      'Signup Form',
      'Signup Initiated',
      getAnalyticsVariant(variant)
    );
    analytics.timeEvent('Create Account Submitted');
  }, []);

  const classes = useStyles();
  const history = useHistory();
  const recaptchaRef = React.useRef<ReCAPTCHA>();

  useEffect(() => {
    window.document.title = t('heading');
  }, [t, tReady]);

  const onSubmit = async (values: RegisterFormData) => {
    try {
      let recaptchaToken;
      if (FeatureToggles.useRecaptcha()) {
        recaptchaToken = await recaptchaRef.current.executeAsync();
      }
      const { employeeProfileId, organizationId } = (
        await submitForm(values, recaptchaToken)
      ).data;
      setForm({
        ...values,
        employeeProfileId,
        organizationId,
      });
      const { email } = values;
      const trackingData = {
        'First Name': values.firstName,
        'Last Name': values.lastName,
        $email: values.email,
        $name: values.firstName + ' ' + values.lastName,
        'Company Name': values.companyName,
      };
      analytics.identify(email as string, trackingData);
      analytics.trackWithCategory('Signup Form', 'Create Account Submitted', {
        ...trackingData,
        ...getAnalyticsVariant(variant),
      });
      history.push('/welcome');
    } catch (e) {
      if (e instanceof ValidationError) {
        reportBroswerHandledError(e);
        return e.errors;
      } else {
        console.error(e);
        throw e;
      }
    }
  };

  return (
    <Grid container justifyContent="center">
      {FeatureToggles.useRecaptcha() && (
        <ReCAPTCHA
          ref={recaptchaRef}
          size="invisible"
          sitekey={environmentVariables.SELF_SIGNUP_RECAPTCHA_SITE_KEY}
        />
      )}
      <Grid item md={7}>
        <Center>
          <Text as="h4" className={classes.heading}>
            {t('heading')}
          </Text>
        </Center>
        <Center>
          <Text as="p" className={classes.valueStatement}>
            {t('valueStatement')}
          </Text>
        </Center>
        <Grid container data-testid="register-form" className={classes.form}>
          {variant === RegisterFormVariant.SINGLE_PAGE ? (
            <RegisterFormSinglePage t={t} tReady={tReady} onSubmit={onSubmit} />
          ) : (
            <RegisterFormMultiplePages
              t={t}
              tReady={tReady}
              onSubmit={onSubmit}
            />
          )}
        </Grid>
      </Grid>
    </Grid>
  );
}
