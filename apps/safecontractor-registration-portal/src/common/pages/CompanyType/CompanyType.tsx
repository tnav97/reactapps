import React from 'react';
import { Grid, Typography } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import { Page, StyleVariables } from '@alcumus/components';
import AboutSection from '../../components/AboutSection';
import Card from '../../components/Card';
import Stepper from '../../components/Stepper';

const STEPPER_DOTS = 2;
const useStyles = makeStyles((theme) => ({
  title: {
    color: StyleVariables.colors.text.default,
    fontFamily: StyleVariables.fonts.family.heading,
    fontWeight: StyleVariables.fonts.weight.semiBold,
    fontSize: StyleVariables.fonts.size.h3,
    lineHeight: StyleVariables.fonts.lineHeight.h3,
    marginTop: '24px',
    textAlign: 'center',
    marginBottom: '1rem',
  },
  formGroup: {
    textAlign: 'inherit',
  },
  cssPage: {
    padding: 0,
    margin: 0,
  },
  scrollablediv: {
    height: 'calc(100vh - 80px)',
    overflow: 'auto',
    scrollbarWidth: 'none',
    [theme.breakpoints.down('sm')]: {
      height: 'calc(100vh - 120px)',
    },
  },
  companyTypeCard: {
    justifyContent: 'center',
    textAlign: 'center',
    marginTop: '16px',
    marginRight: '0.5rem',
  },
  stepper: {
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
}));

export default function CompanyType() {
  const classes = useStyles();
  const contents = [
    {
      key: 'SOLE_TRADER_OR_PROPRIETOR',
      tabIndex: 0,
      value: 'Sole Trader or Proprietor',
      testid: 'soleTraderorProprietor',
    },
    {
      key: 'PARTNERSHIP',
      tabIndex: 0,
      value: 'Partnership',
      testid: 'Partnership',
    },
    {
      key: 'LIMITED_COMPANY',
      tabIndex: 0,
      value: 'Limited Company',
      testid: 'limitedCompany',
    },
    {
      key: 'LIMITED_LIABILITY_PARTNERSHIP',
      tabIndex: 0,
      value: 'Limited Liability Partnership',
      testid: 'limitedLiabilityPartnership',
    },
    {
      key: 'CHARITY_OR_VOLUNTARY_SECTOR',
      tabIndex: 0,
      value: 'Charity or Voluntary Sector',
      testid: 'charityorVoluntarySector',
    },
    {
      key: 'LOCAL_AUTHORITY_COLLEGE',
      tabIndex: 0,
      value: 'Local Authority College',
      testid: 'localAuthorityCollege',
    },
    {
      key: 'LOCAL_AUTHORITY',
      tabIndex: 0,
      value: 'Local Authority',
      testid: 'localAuthority',
    },
    {
      key: 'UNIVERSITY',
      tabIndex: 0,
      value: 'University',
      testid: 'University',
    },
    {
      key: 'COMPANY_LIMITED_BY_GUARANTEE',
      tabIndex: 0,
      value: 'Company Limited by Guarantee',
      testid: 'companyLimitedbyGuarantee',
    },
    {
      key: 'REGISTERED_SOCIAL_LANDLORD',
      tabIndex: 0,
      value: 'Registered Social Landlord ',
      testid: 'registeredSocialLandlord',
    },
    {
      key: 'PUBLIC_LIMITED_COMPANY',
      tabIndex: 0,
      value: 'Public Limited Company',
      testid: 'publicLimitedCompany',
    },
    {
      key: 'CHARITY_AND_LIMITED_COMPANY',
      tabIndex: 0,
      value: 'Charity and Limited Company',
      testid: 'charityandLimitedCompany',
    },
  ];
  return (
    <Page className={classes.cssPage}>
      <Grid item xs={12} className={classes.scrollablediv}>
        <AboutSection count={STEPPER_DOTS} />
        <Grid className={classes.stepper}>
          <Stepper count={STEPPER_DOTS}></Stepper>
        </Grid>
        <Typography className={classes.title} variant="h1" component="h1">
          What is the type of your organisation?
        </Typography>
        <div className={classes.companyTypeCard}>
          <Card
            contents={contents}
            to="subsidiaryBusiness"
            type="list"
            from="employee"
            page="companyType"
            gridSizeDesktop={6}
          />
        </div>
      </Grid>
    </Page>
  );
}
