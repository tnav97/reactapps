import React from 'react';
import { Grid, Paper } from '@mui/material';
import { makeStyles,withStyles } from '@mui/styles';
import { StyleVariables, Text } from '@alcumus/components';
import { withTranslation } from 'react-i18next';
import { TFunction } from 'i18next';
import { MyOrganizationDetails } from '../../types';
import OrganizationDetailsSection from './OrganizationDetailsSection/index';
import ContactInformationSection from './ContactInformationSection/index';
import OrganizationLocationSection from './OrganizationLocationSection/index';
import useSWR from 'swr';
import { CURRENT_ORGANIZATION_PROFILE_URL } from './index';

const useStyles = makeStyles((theme) => ({
  container: {},
  heading: {
    paddingBottom: theme.spacing(2),
    fontWeight: StyleVariables.fonts.weight.medium,
  },
}));

const StyledPaper = withStyles((theme) => ({
  root: {
    padding: theme.spacing(3),
    marginBottom: 10,
    borderRadius: theme.spacing(1),
    boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.1)',
  },
}))(Paper);

type Props = {
  t: TFunction;
};

function MyOrganization({ t }: Props) {
  const classes = useStyles();

  const { data: myOrganizationDetails } = useSWR<MyOrganizationDetails>(
    CURRENT_ORGANIZATION_PROFILE_URL
  );

  return myOrganizationDetails ? (
    <Grid container spacing={2}>
      <Grid item sm={2} md={3} />
      <Grid item sm={8} md={6}>
        <Text
          as="h3"
          className={classes.heading}
          data-testid="myOrganizationPageHeader"
        >
          {t('myOrganization')}
        </Text>
        <StyledPaper>
          <OrganizationDetailsSection
            organizationDetails={myOrganizationDetails}
            organizationId={myOrganizationDetails.organizationId}
          />
        </StyledPaper>
        <StyledPaper>
          <ContactInformationSection
            organizationContact={myOrganizationDetails.organizationContact}
            organizationId={myOrganizationDetails.organizationId}
          />
        </StyledPaper>
        <StyledPaper>
          <OrganizationLocationSection
            organizationAddress={myOrganizationDetails.organizationAddress}
            organizationId={myOrganizationDetails.organizationId}
          />
        </StyledPaper>
        <StyledPaper>
          <Text as="h4" data-testid="enforceLocation">
            {t('enforceLocation')}
          </Text>
          <Text as="span" data-testid="enforceLocationValue">
            {t(
              'whenEnabledConfiguresAllStandardAccountsToMatchYourOrganizationsCountry'
            )}
          </Text>
        </StyledPaper>
      </Grid>
      <Grid item sm={2} md={3} />
    </Grid>
  ) : (
    <>{t('couldNotGetOrganizationDetails')}</>
  );
}

export default withTranslation('MyOrganization')(MyOrganization);
