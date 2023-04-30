import React from 'react';
import InputWithCommonProps from './InputWithCommonProps';
import { Field } from 'formik';
import { Grid, GridProps } from '@mui/material';

interface TextInputProps {
  gridItemProps: GridProps;
  name: string;
  'data-testid': string;
  autoComplete: string;
  validate: (name: any) => any;
  label: string;
  placeholder: string;
  [key: string]: any;
}

export default function RegisterFormTextField({
  gridItemProps,
  name,
  'data-testid': dataTestId,
  autoComplete,
  validate,
  label,
  placeholder,
  ...rest
}: TextInputProps) {
  return (
    <Field name={name} validate={validate}>
      {(fieldProps) => (
        <Grid item {...gridItemProps}>
          <InputWithCommonProps
            label={label}
            placeholder={placeholder}
            data-testid={dataTestId}
            autoComplete={autoComplete}
            {...rest}
            {...fieldProps}
          />
        </Grid>
      )}
    </Field>
  );
}
