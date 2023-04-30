import { Form, Formik } from 'formik';
import { TFunction } from 'i18next';
import { Grid } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React from 'react';
import { RegisterFormData } from '../../../client/redux/reducers/register-reducer';
import RegisterFormStep1 from './Steps/RegisterFormStep1';
import RegisterFormStep2 from './Steps/RegisterFormStep2';
import { StyleVariables } from '@alcumus/components';
import { RegisterFormVariant } from '../../types/registerForm';

export interface RegisterFormSinglePageProps {
  t: TFunction;
  tReady: boolean;
  onSubmit: (form: RegisterFormData) => Promise<any>;
}

const useStyles = makeStyles({
  step2: {
    marginTop: StyleVariables.spacing(3),
  },
});

export default function RegisterFormSinglePage({
  t,
  tReady,
  onSubmit,
}: RegisterFormSinglePageProps) {
  const classes = useStyles();
  return (
    <Formik
      initialValues={{}}
      onSubmit={onSubmit}
      validateOnChange={true}
      validateOnBlur={false}
      validateOnMount={true}
    >
      {() => (
        <Grid container>
          <Form>
            <Grid item xs={12}>
              <RegisterFormStep1
                t={t}
                tReady={tReady}
                variant={RegisterFormVariant.SINGLE_PAGE}
              />
            </Grid>
            <Grid item xs={12} className={classes.step2}>
              <RegisterFormStep2
                t={t}
                tReady={tReady}
                variant={RegisterFormVariant.SINGLE_PAGE}
              />
            </Grid>
          </Form>
        </Grid>
      )}
    </Formik>
  );
}
