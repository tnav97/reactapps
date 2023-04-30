import React from 'react';
import { StyleVariables, Text } from '@alcumus/components';
import { makeStyles } from '@mui/styles';
import KeycloakPasswordUpdateForm from '../../../../components/KeycloakPasswordUpdateForm';
import AccountDetailsSection from '../../../../components/AccountDetailsSection';
import UserProfileView from '../../../../components/UserProfileView';
import { TFunction } from 'i18next';
import SettingsPage from '../SettingsPage';
import { Container } from '@mui/material';
import AboutSection from '../../../../components/AboutSection';
import LocaleSection from '../../../../components/LocaleSection';

interface MyAccountProps {
  useAzureAd: boolean;
  t: TFunction;
}

const useStyles = makeStyles({
  header: { marginBottom: StyleVariables.spacing(3) },
  section: {
    marginBottom: '20px',
  },
  container: {
    maxWidth: '700px',
  },
});

export default function MyAccount({ useAzureAd = false, t }: MyAccountProps) {
  const classes = useStyles();
  return (
    <SettingsPage>
      <Container className={classes.container}>
        <Text as="h4" className={classes.header} data-testid="my-account">
          {t('myAccount')}
        </Text>
        <UserProfileView className={classes.section} />
        {useAzureAd ? (
          <AccountDetailsSection className={classes.section} />
        ) : (
          <KeycloakPasswordUpdateForm className={classes.section} />
        )}
        <LocaleSection className={classes.section} />
        <AboutSection className={classes.section} />
      </Container>
    </SettingsPage>
  );
}
