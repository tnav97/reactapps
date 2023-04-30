import { Input, InputProps, StyleVariables } from '@alcumus/components';
import { makeStyles } from '@mui/styles';
import { Done } from '@mui/icons-material';
import { FieldProps } from 'formik';
import React from 'react';

const INPUT_DEBOUNCE_INTERVAL = 500;

const useStyles = makeStyles({
  doneAdornment: {
    color: StyleVariables.colors.text.success,
  },
});

export default function InputWithCommonProps({
  form,
  field,
  meta,
  ...props
}: InputProps & FieldProps) {
  const classes = useStyles();
  const isValid = meta.value && !meta.error;
  return (
    <Input
      disabled={form.isSubmitting}
      state={field.value && meta.error ? 'error' : 'default'}
      hint={field.value ? meta.error || '' : ''}
      debounceInterval={INPUT_DEBOUNCE_INTERVAL}
      isValid={isValid}
      adornment={isValid && <Done className={classes.doneAdornment} />}
      {...field}
      {...props}
    />
  );
}
