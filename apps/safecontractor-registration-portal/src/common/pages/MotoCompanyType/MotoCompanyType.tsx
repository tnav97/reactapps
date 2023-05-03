import React from 'react';
import { Grid, Typography } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import { Page, StyleVariables } from '@alcumus/components';
import MotoAboutSection from '../../components/MotoAboutSection';
import MotoCard from '../../components/MotoCard';
import MotoStepper from '../../components/MotoStepper';
import { createTheme} from '@mui/material';

const STEPPER_DOTS = 2;
const Breakpoints = createTheme().breakpoints;
const useStyles = makeStyles((theme) => ({
  title: {
    color: StyleVariables.colors.text.default,
    fontFamily: StyleVariables.fonts.family.heading,
    fontWeight: StyleVariables.fonts.weight.semiBold,
    fontSize: StyleVariables.fonts.size.h3,
    lineHeight: StyleVariables.fonts.lineHeight.h3,
    marginTop: '24px',
    textAlign: 'center',
    marginBottom: '42px',
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
    [Breakpoints.down('sm')]: {
      height: 'calc(100vh - 120px)',
    },
  },
  stepper: {
    [Breakpoints.up('sm')]: {
      display: 'none',
    },
  },
}));

export default function MotoCompanyType() {
  const classes = useStyles();
  const contents = [
    {
      key: 'SOLE_TRADER_OR_PROPRIETOR',
      tabIndex: 1,
      value: 'Sole Trader or Proprietor',
      testid: 'soleTraderorProprietor',
    },
    {
      key: 'PARTNERSHIP',
      tabIndex: 2,
      value: 'Partnership',
      testid: 'Partnership',
    },
    {
      key: 'LIMITED_COMPANY',
      tabIndex: 3,
      value: 'Limited Company',
      testid: 'limitedCompany',
    },
    {
      key: 'LIMITED_LIABILITY_PARTNERSHIP',
      tabIndex: 4,
      value: 'Limited Liability Partnership',
      testid: 'limitedLiabilityPartnership',
    },
    {
      key: 'CHARITY_OR_VOLUNTARY_SECTOR',
      tabIndex: 5,
      value: 'Charity or Voluntary Sector',
      testid: 'charityorVoluntarySector',
    },
    {
      key: 'LOCAL_AUTHORITY_COLLEGE',
      tabIndex: 6,
      value: 'Local Authority College',
      testid: 'localAuthorityCollege',
    },
    {
      key: 'LOCAL_AUTHORITY',
      tabIndex: 7,
      value: 'Local Authority',
      testid: 'localAuthority',
    },
    {
      key: 'UNIVERSITY',
      tabIndex: 8,
      value: 'University',
      testid: 'University',
    },
    {
      key: 'COMPANY_LIMITED_BY_GUARANTEE',
      tabIndex: 9,
      value: 'Company Limited by Guarantee',
      testid: 'companyLimitedbyGuarantee',
    },
    {
      key: 'REGISTERED_SOCIAL_LANDLORD',
      tabIndex: 10,
      value: 'Registered Social Landlord ',
      testid: 'registeredSocialLandlord',
    },
    {
      key: 'PUBLIC_LIMITED_COMPANY',
      tabIndex: 11,
      value: 'Public Limited Company',
      testid: 'publicLimitedCompany',
    },
    {
      key: 'CHARITY_AND_LIMITED_COMPANY',
      tabIndex: 12,
      value: 'Charity and Limited Company',
      testid: 'charityandLimitedCompany',
    },
  ];
  return (
    <Page className={classes.cssPage}>
      <Grid item xs={12} className={classes.scrollablediv}>
        <MotoAboutSection count={STEPPER_DOTS} />
        <Grid className={classes.stepper}>
          <MotoStepper count={STEPPER_DOTS}></MotoStepper>
        </Grid>
        <Typography className={classes.title}>
          What is the type of your organisation?
        </Typography>
        <MotoCard
          contents={contents}
          to="moto/subsidiaryBusiness"
          type="list"
          from="moto/employee"
          page="motoCompanyType"
          gridSizeDesktop={6}
        />
      </Grid>
    </Page>
  );
}
