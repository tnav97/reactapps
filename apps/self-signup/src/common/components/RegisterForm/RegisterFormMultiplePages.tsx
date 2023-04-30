import React, { useState } from 'react';
import { Button, StyleVariables } from '@alcumus/components';
import { Form, Formik } from 'formik';
import { TFunction } from 'i18next';
import { Icon, Grid } from '@mui/material';
import { makeStyles } from '@mui/styles';
import KeyboardBackspace from '@mui/icons-material/KeyboardBackspace';
import { RegisterFormData } from '../../../client/redux/reducers/register-reducer';
import RegisterFormStep1 from './Steps/RegisterFormStep1';
import RegisterFormStep2 from './Steps/RegisterFormStep2';
import StepIndicator from '../StepIndicator';
import { RegisterFormVariant } from '../../types/registerForm';

export interface RegisterFormMultiplePagesProps {
  t: TFunction;
  tReady: boolean;
  onSubmit: (form: RegisterFormData) => Promise<any>;
}

const useStyles = makeStyles({
  button: {
    marginTop: StyleVariables.spacing(4),
  },
  previous: {
    display: 'flex',
    color: StyleVariables.colors.text.default,
    cursor: 'pointer',
    marginBottom: StyleVariables.spacing(2),
  },
  previousIcon: {
    color: StyleVariables.colors.icon.default,
    marginRight: StyleVariables.spacing(1),
  },
  stepIndicator: {
    padding: '40px',
  },
  step2Container: {
    marginTop: StyleVariables.spacing(-5),
  },
});

interface StepForm {
  form: RegisterFormData;
  t: TFunction;
  tReady: boolean;
  onSubmit: (form: RegisterFormData) => void;
  previous?: () => void;
}

function Step1Form({ form, t, tReady, onSubmit }: StepForm) {
  const classes = useStyles();

  return (
    <Formik
      initialValues={form}
      onSubmit={onSubmit}
      validateOnChange={true}
      validateOnBlur={false}
      validateOnMount={true}
    >
      {({ isValid, isSubmitting, isValidating, handleSubmit }) => (
        <Form>
          <RegisterFormStep1
            t={t}
            tReady={tReady}
            variant={RegisterFormVariant.MULTIPLE_PAGES}
          />
          <Button
            size="large"
            className={classes.button}
            fullWidth={true}
            rounded={true}
            onClick={handleSubmit}
            disabled={!isValid || isValidating || isSubmitting}
            data-testid="next"
            type="submit"
            showLoadingIndicator={isSubmitting}
          >
            {t('next')}
          </Button>
        </Form>
      )}
    </Formik>
  );
}

function Step2Form({ form, t, tReady, onSubmit, previous }: StepForm) {
  const classes = useStyles();

  return (
    <Formik
      initialValues={form}
      onSubmit={({ email, password, termsCheck }) =>
        onSubmit({ email, password, termsCheck })
      }
      validateOnChange={true}
      validateOnBlur={false}
      validateOnMount={true}
      enableReinitialize={true}
    >
      {() => (
        <Form className={classes.step2Container}>
          <div
            role="button"
            data-testid="previous"
            className={classes.previous}
            onClick={previous}
          >
            <Icon className={classes.previousIcon}>
              <KeyboardBackspace />
            </Icon>
            Previous
          </div>
          <RegisterFormStep2
            t={t}
            tReady={tReady}
            variant={RegisterFormVariant.MULTIPLE_PAGES}
          />
        </Form>
      )}
    </Formik>
  );
}

export default function RegisterFormMultiplePages({
  t,
  tReady,
  onSubmit,
}: RegisterFormMultiplePagesProps) {
  const [form, setForm] = useState<RegisterFormData>({});
  const [step, setStep] = useState(1);

  const classes = useStyles();

  const step1Submit = (data) => {
    setForm({ ...form, ...data });
    setStep(2);
  };

  const step2Submit = (data) => {
    setForm({ ...form, ...data });
    onSubmit({ ...form, ...data });
  };

  return (
    <Grid container>
      <Grid item xs={12}>
        {step === 1 ? (
          <Step1Form {...{ t, tReady, form }} onSubmit={step1Submit} />
        ) : (
          <Step2Form
            {...{ t, tReady, form, setForm }}
            onSubmit={step2Submit}
            previous={() => setStep(1)}
          />
        )}
      </Grid>
      <Grid item xs={12}>
        <StepIndicator
          total={2}
          current={step}
          className={classes.stepIndicator}
        />
      </Grid>
    </Grid>
  );
}
