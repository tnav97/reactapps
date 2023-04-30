import React, { useEffect, useState } from 'react';
import { Grid, IconButton, Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useTranslation } from 'react-i18next';
import { StyleVariables, Text, RegularIcon } from '@alcumus/components';
import FeaturedApp from './FeaturedApp';
import { getRecommendedApplications } from './recommendedAppMatrix';
import { RecommendedApplication } from './recommendedApps';
import { useHistory } from 'react-router-dom';
import { useActiveApplications } from '../../hooks/useActiveApplications';
import { useApplications } from '../../hooks/useApplications';
import Analytics from '@alcumus/analytics-package';
import useSWR from 'swr';
import { MyOrganizationDetails } from '../../types';
import { CURRENT_ORGANIZATION_PROFILE_URL } from '../MyOrganization';

export interface HomePageRecommendedAppsProps {
  memberId: number | undefined;
}

const useStyles = makeStyles((theme: Theme) => ({
  title: {
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
  gridItem: {
    display: 'grid',
  },
  seeAll: {
    borderRadius: 205,
    color: StyleVariables.colors.black,
    padding: '8px 24px 8px 20px',
    marginLeft: 'auto',
  },
  seeAllText: {
    lineHeight: StyleVariables.fonts.lineHeight.regular,
    fontWeight: StyleVariables.fonts.weight.semiBold,
  },
  displayFlex: {
    display: 'flex',
  },
}));

export default function HomePageRecommendedApps({
  memberId,
}: HomePageRecommendedAppsProps) {
  const classes = useStyles();
  const { t } = useTranslation(['HomePage']);
  const history = useHistory();
  const [recommendedApplications, setRecommendedApplications] = useState<
    Array<RecommendedApplication>
  >([]);

  const { data: applications, error } = useActiveApplications(memberId);
  const { data: applicationsResponse } = useApplications();

  useEffect(() => {
    if (applications && applications.length > 0) {
      for (const app of applications) {
        setRecommendedApplications((apps) => [
          ...apps,
          ...getRecommendedApplications(app),
        ]);
        setRecommendedApplications((apps) => [...new Set(apps)]);
      }
      for (const activeApp of applications) {
        setRecommendedApplications((apps) =>
          apps.filter(
            (app) => app.applicationLookupKey !== activeApp.applicationLookupKey
          )
        );
      }
    }
    if (error || !applications) {
      setRecommendedApplications((apps) => [
        ...apps,
        ...getRecommendedApplications(),
      ]);
    }
    if (applicationsResponse && applicationsResponse.applications.length) {
      // Get intersection of 2 arrays
      setRecommendedApplications((apps) =>
        Array.from(
          new Set(
            [...new Set(apps)].filter((x) =>
              new Set(
                applicationsResponse.applications.map(
                  (app) => app.applicationLookupKey
                )
              ).has(x.applicationLookupKey)
            )
          )
        )
      );
    }
  }, [applications, error]);

  if (recommendedApplications.length > 4) {
    setRecommendedApplications((apps) => apps.slice(0, 4));
  }

  const applicationsWithCategories = recommendedApplications
    .map((apps) => ({
      ...apps,
      applicationName:
        applicationsResponse?.applications.find(
          (application) =>
            application.applicationLookupKey === apps.applicationLookupKey
        )?.applicationName || '',
      applicationCategory:
        applicationsResponse?.applications.find(
          (application) =>
            application.applicationLookupKey === apps.applicationLookupKey
        )?.applicationCategories || [],
    }))
    .filter((apps) => apps.applicationName !== '');
  const { data: myOrganizationDetails } = useSWR<MyOrganizationDetails>(
    CURRENT_ORGANIZATION_PROFILE_URL
  );
  return (
    <React.Fragment>
      <div className={classes.displayFlex}>
        <Text as="h6" className={classes.title}>
          {t('recommendedApps')}
        </Text>
        <IconButton
          disableRipple
          className={classes.seeAll}
          onClick={() => {
            history.push('/all-applications');
            Analytics.getInstance().track('All Applications Visited', {
              organization: myOrganizationDetails?.tenantName,
            });
          }}
        >
          <Text as="h6" className={classes.seeAllText}>
            {t('seeAll')}
          </Text>
          <RegularIcon icon="arrow_forward" />
        </IconButton>
      </div>
      <br />
      <Grid container spacing={2}>
        {applicationsWithCategories.map((app) => (
          <Grid
            key={app.applicationLookupKey}
            item
            className={classes.gridItem}
            xs={12}
            lg={6}
          >
            <FeaturedApp
              applicationLookupKey={app.applicationLookupKey}
              imageUrl={app.imageUrl}
              title={app.applicationName}
              content={app.applicationDescription}
              categories={app.applicationCategory}
              applicationUrl={app.applicationUrl}
            />
          </Grid>
        ))}
      </Grid>
    </React.Fragment>
  );
}
