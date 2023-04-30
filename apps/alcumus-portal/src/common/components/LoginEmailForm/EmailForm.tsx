import React, { useCallback, useState } from 'react';
import { makeStyles } from '@mui/styles';
import { useTranslation } from 'react-i18next';
import validator from 'validator';
import { StyleVariables, Text } from '@alcumus/components';
import { KEY_MAP } from '../../constants';
import { Button, TextField } from '@mui/material';

interface EmailFormProps {
  onNext: (email: string) => void;
}

const useStyles = makeStyles(() => ({
  formAction: {
    textAlign: 'right',
    marginTop: '1rem',
    marginBottom: '1rem',
  },
  error: {
    color: StyleVariables.colors.text.critical,
    fontFamily: StyleVariables.fonts.family.heading,
  },
}));

export default function EmailForm({ onNext }: EmailFormProps) {
  const classes = useStyles();
  const [email, setEmail] = useState<string>('');
  const [emailError, setEmailError] = useState<string>('');
  const { t } = useTranslation(['Login']);

  const handleEmailChange = useCallback(({ target }) => {
    setEmailError('');
    setEmail(target.value);
  }, []);

  const handleKeypress = useCallback(
    (e) => {
      if (e.which === KEY_MAP.ENTER) {
        e.preventDefault();
        handleNext();
      }
    },
    [email]
  );

  const handleNext = useCallback(() => {
    if (!email.length || !validator.isEmail(email)) {
      setEmailError(t('validEmail', { ns: 'Login' }));
    } else {
      onNext(email);
    }
  }, [email]);

  return (
    <form>
      <TextField
        fullWidth
        id="email"
        type="email"
        label={t('email', { ns: 'Login' })}
        variant="outlined"
        inputProps={{
          'data-testid': 'emailInput',
        }}
        onChange={handleEmailChange}
        onKeyDown={handleKeypress}
      />
      {!!emailError && (
        <Text
          as="small"
          data-testid="emailErrorMessage"
          variant="subtitle2"
          className={classes.error}
        >
          {emailError}
        </Text>
      )}
      <div className={classes.formAction}>
        <Button
          type="button"
          variant="contained"
          color="primary"
          onClick={handleNext}
          data-testid="nextButton"
        >
          {t('next', { ns: 'Login' })}
        </Button>
      </div>
    </form>
  );
}
