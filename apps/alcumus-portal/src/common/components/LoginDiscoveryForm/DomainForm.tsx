import React, { useCallback, useEffect, useState } from 'react';
import { makeStyles } from '@mui/styles';
import { useTranslation } from 'react-i18next';
import {
  Input,
  StyleVariables,
  Text,
  Button,
  OutlinedIcon,
} from '@alcumus/components';
import { KEY_MAP } from '../../constants';
import { LoginFlowHooks } from '../../hooks/LoginLogoutFlow';
import { Checkbox, FormControlLabel } from '@mui/material';

interface DomainFormProps {
  onNext: (domain: string) => void;
  authUrlError?: boolean;
}

const useStyles = makeStyles(() => ({
  formAction: {
    marginTop: '3rem',
  },
  error: {
    color: StyleVariables.colors.text.critical,
  },
}));

export default function DomainForm({ onNext, authUrlError }: DomainFormProps) {
  const classes = useStyles();
  const { organizationIdentifier } = LoginFlowHooks.getUrlParameters();
  const { rememberMyDomain: wasRemembering, rememberedDomain } =
    LoginFlowHooks.getAndStoreUrlParameters();

  const defaultDomain = organizationIdentifier ?? rememberedDomain ?? '';

  const [domain, setDomain] = useState<string>(defaultDomain || '');
  const [domainError, setDomainError] = useState<string>('');

  const [rememberDomain, setRememberDomain] = useState<boolean>(
    wasRemembering || false
  );
  const { t } = useTranslation(['Login']);

  const handleDomainChange = useCallback(({ target }) => {
    setDomainError('');
    setDomain(target.value.trim());
  }, []);

  const handleKeypress = useCallback(
    (e) => {
      if (e.which === KEY_MAP.ENTER) {
        e.preventDefault();
        handleNext();
      }
    },
    [domain]
  );

  const handleNext = useCallback(() => {
    if (!domain.length) {
      setDomainError(t('validDomain', { ns: 'Login' }));
    } else {
      LoginFlowHooks.rememberDomain(rememberDomain, domain);
      onNext(domain);
    }
  }, [domain, rememberDomain]);

  useEffect(() => {
    if (authUrlError) {
      setDomainError(t('authUrlError', { ns: 'Login' }));
    } else {
      setDomainError('');
    }
  }, [authUrlError]);

  return (
    <form>
      <Input
        label={t('loginDomain', { ns: 'Login' })}
        placeholder={t('exampleDomain', { ns: 'Login' })}
        data-testid="domainInput"
        state={domainError ? 'error' : 'default'}
        isValid={!!domainError}
        onChange={handleDomainChange}
        onKeyDown={handleKeypress}
        required
        value={defaultDomain}
        adornment={<>.alcumus.com</>}
      />
      {!!domainError && (
        <Text
          as="small"
          data-testid="domainErrorMessage"
          variant="subtitle2"
          className={classes.error}
        >
          {domainError}
        </Text>
      )}
      <br />
      <FormControlLabel
        control={
          <Checkbox
            onChange={(e) => setRememberDomain(e.target.checked)}
            checked={rememberDomain}
            color="primary"
          />
        }
        label={
          <Text data-testid="rememberMyDomain">
            {t('rememberMyDomain', { ns: 'Login' })}
          </Text>
        }
      />
      <div className={classes.formAction}>
        <Button
          variant="contained"
          onClick={handleNext}
          data-testid="nextButton"
          rounded
          fullWidth
          size="medium"
          endIcon={<OutlinedIcon icon="east" />}
          disabled={!domain}
        >
          {t('continue', { ns: 'Login' })}
        </Button>
      </div>
    </form>
  );
}
