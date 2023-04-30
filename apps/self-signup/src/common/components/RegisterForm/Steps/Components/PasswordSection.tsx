import { Field, useField, useFormikContext } from 'formik';
import React, { useEffect, useState } from 'react';
import type { ZXCVBNResult } from 'zxcvbn';
import { RegisterFormData } from '../../../../../client/redux/reducers/register-reducer';
import PasswordField, { PasswordProps } from '../../../PasswordField';

async function getZxcvbnResult(
  password: string,
  inputs: Array<string>
): Promise<ZXCVBNResult> {
  const zxcvbn = (await import(/* webpackPreload: true */ 'zxcvbn')).default;
  return zxcvbn(password, inputs);
}

export default function PasswordSection({ ...props }: PasswordProps) {
  const { values: form } = useFormikContext<RegisterFormData>();
  const [passwordScore, setPasswordScore] = useState<number>(0);
  const [field, , helpers] = useField('passwordScore');

  useEffect(() => {
    let isMounted = true;
    if (form.password) {
      getZxcvbnResult(form.password, [
        form.firstName || '',
        form.lastName || '',
        form.companyName || '',
        form.email || '',
      ]).then((result) => {
        if (
          (isMounted && result.score !== passwordScore) ||
          result.score !== field.value
        ) {
          setPasswordScore(result.score);
          helpers.setValue(result.score);
        }
      });
    } else {
      setPasswordScore(0);
      helpers.setValue(0);
    }
    return () => {
      isMounted = false;
    };
  }, [
    form.password,
    form.firstName,
    form.lastName,
    form.companyName,
    form.email,
  ]);

  return (
    <Field name="password">
      {({ field }) => (
        <PasswordField
          threshold={3}
          score={passwordScore || 0}
          {...props}
          {...field}
        />
      )}
    </Field>
  );
}
