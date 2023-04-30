import React from 'react';
import { Grid, Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useTranslation } from 'react-i18next';
import { StyleVariables, Text } from '@alcumus/components';
import Product from '../HomePageAllApps/Product';
import { useActiveApplications } from '../../hooks/useActiveApplications';

export interface HomePageActiveAppsProps {
  memberId: number | undefined;
}

const useStyles = makeStyles((theme: Theme) => ({
  title: {
    color: StyleVariables.colors.text.default,
    fontFamily: StyleVariables.fonts.family.heading,
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
  hideElement: {
    display: 'none',
  },
  gridItem: {
    display: 'grid',
  },
}));

export default function HomePageActiveApps({
  memberId,
}: HomePageActiveAppsProps) {
  const classes = useStyles();
  const { t } = useTranslation(['HomePage']);
  const response = useActiveApplications(memberId);

  if (response?.error?.response?.status === 404) {
    return (
      <>
        <br />
        <Text className={classes.title}>
          {t('activeApps', { ns: 'HomePage' })} (0)
        </Text>
        <br />
        <Text>{t('activeAppsError', { ns: 'HomePage' })}</Text>
      </>
    );
  }

  const applications = response?.data || [];

  return applications.length > 0 ? (
    <>
      <br />
      <Text className={classes.title}>
        {t('activeApps', { ns: 'HomePage' })} ({applications.length})
      </Text>
      <br />
      <Grid container spacing={2}>
        {applications.map((app) => (
          <Grid
            item
            xs={12}
            lg={6}
            className={classes.gridItem}
            key={app.applicationId}
          >
            <Product
              key={app.applicationId}
              productId={app.applicationId}
              title={app.applicationName}
              url={`/launch/${app.applicationLookupKey}`}
              content={app.applicationDescription}
              categories={app.applicationCategories}
              isActive={true}
            />
          </Grid>
        ))}
      </Grid>
    </>
  ) : (
    <>
      <br />
      <Text className={classes.title}>
        {t('activeApps', { ns: 'HomePage' })} (0)
      </Text>
      <br />
      <Text>{t('noActiveApps', { ns: 'HomePage' })}</Text>
    </>
  );
}
