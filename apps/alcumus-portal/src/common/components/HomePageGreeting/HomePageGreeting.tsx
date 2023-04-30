import React from 'react';
import { Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useTranslation } from 'react-i18next';
import { Text, StyleVariables } from '@alcumus/components';
import { UserProfile } from '../../types';

const getTimeBasedGreeting = () => {
  const currentHour = new Date().getHours();
  const { t } = useTranslation(['HomePage']);

  if (currentHour >= 0 && currentHour <= 6) {
    return t('welcome', { ns: 'HomePage' });
  } else if (currentHour >= 6 && currentHour < 12) {
    return t('morning', { ns: 'HomePage' });
  } else if (currentHour >= 12 && currentHour <= 17) {
    return t('afternoon', { ns: 'HomePage' });
  } else {
    return t('evening', { ns: 'HomePage' });
  }
};

const useStyles = makeStyles((theme: Theme) => ({
  greeting: {
    marginTop: '1rem',
    marginBottom: '1rem',
    [theme.breakpoints.up('xs')]: {
      fontWeight: StyleVariables.fonts.weight.medium,
      fontSize: StyleVariables.fonts.size.h4,
      lineHeight: StyleVariables.fonts.lineHeight.h4,
    },
    [theme.breakpoints.down('xs')]: {
      fontWeight: StyleVariables.fonts.weight.medium,
      fontSize: StyleVariables.fonts.mobile.size.h4,
      lineHeight: StyleVariables.fonts.mobile.lineHeight.h4,
    },
  },
}));

interface HomePageGreetingProps {
  user?: UserProfile;
}

export default function HomePageGreeting({ user }: HomePageGreetingProps) {
  const classes = useStyles();

  return (
    <Text data-testid="greeting" className={classes.greeting}>
      {getTimeBasedGreeting()}
      {', '}
      {user?.firstName && user?.lastName
        ? `${user.firstName} ${user.lastName}`
        : user?.email}
      !
    </Text>
  );
}
