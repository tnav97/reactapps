import { makeStyles } from '@mui/styles';
import { useFormikContext } from 'formik';
import { TFunction } from 'i18next';
import React from 'react';
import { RegisterFormData } from '../../../../../client/redux/reducers/register-reducer';
import { Button, StyleVariables } from '@alcumus/components';

const useStyles = makeStyles({
  button: {
    marginTop: StyleVariables.spacing(2),
  },
});

interface SubmitButtonProps {
  t: TFunction;
}

export default function SubmitButton({ t }: SubmitButtonProps) {
  const classes = useStyles();
  const { isSubmitting, isValidating, isValid, handleSubmit, values } =
    useFormikContext<RegisterFormData>();

  const acceptableScore =
    values.passwordScore !== undefined && values.passwordScore >= 3;

  return (
    <Button
      size="large"
      className={classes.button}
      fullWidth={true}
      rounded={true}
      onClick={handleSubmit}
      disabled={!isValid || isValidating || isSubmitting || !acceptableScore}
      data-testid="createAccount"
      type="submit"
      showLoadingIndicator={isSubmitting}
    >
      {t('createAccount')}
    </Button>
  );
}
