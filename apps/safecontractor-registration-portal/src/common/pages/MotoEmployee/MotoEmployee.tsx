import React from 'react';
import { Grid, Typography } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import { Page, StyleVariables } from '@alcumus/components';
import MotoAboutSection from '../../components/MotoAboutSection';
import MotoCard from '../../components/MotoCard';
import MotoStepper from '../../components/MotoStepper';
import ReadMore from '../../components/ReadMore';
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
    marginLeft: '24px',
    marginRight: '24px',
  },
  subtitle: {
    fontFamily: StyleVariables.fonts.family.body,
    fontWeight: StyleVariables.fonts.weight.regular,
    fontSize: StyleVariables.fonts.size.xs,
    lineHeight: StyleVariables.fonts.lineHeight.xs,
    letterSpacing: '0.0005em',
    textAlign: 'center',
    marginTop: '12px',
    paddingLeft: '230px',
    paddingRight: '230px',
    [theme.breakpoints.down('md')]: {
      marginLeft: '1.5rem',
      marginRight: '1.5rem',
      paddingLeft: '0px',
      paddingRight: '0px',
    },
    color: StyleVariables.colors.text.subdued,
    marginBottom: '16px',
  },
  employeeCard: {
    justifyContent: 'center',
    textAlign: 'center',
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
  stepper: {
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
}));

export default function MotoEmployee() {
  const classes = useStyles();

  const contents = [
    {
      key: 0,
      tabIndex: 1,
      value: '0',
      testid: 'zeroEmployee',
    },
    {
      key: 4,
      tabIndex: 2,
      value: '1-4',
      testid: 'oneEmployee',
    },
    {
      key: 9,
      tabIndex: 3,
      value: '5-9',
      testid: 'fiveEmployee',
    },
    {
      key: 15,
      tabIndex: 4,
      value: '10-15',
      testid: 'tenEmployee',
    },
    {
      key: 30,
      tabIndex: 5,
      value: '16-30',
      testid: 'sixteenEmployee',
    },
    {
      key: 50,
      tabIndex: 6,
      value: '31-50',
      testid: 'thirtyOneEmployee',
    },
    {
      key: 199,
      tabIndex: 7,
      value: '51-199',
      testid: 'fiftyOneEmployee',
    },
    {
      key: 499,
      tabIndex: 8,
      value: '200-499',
      testid: 'twoHundredEmployee',
    },
    {
      key: 999,
      tabIndex: 9,
      value: '500-999',
      testid: 'fiveHundredEmployee',
    },
    {
      key: 1000,
      tabIndex: 10,
      value: '1000+',
      testid: 'thousandPlusEmployee',
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
          How many employees and labour only workers do you have?
        </Typography>
        <ReadMore>
          According to UK labour law a labour-only subcontractor is considered
          an employee. They work under your supervision using material,
          equipment, and tools that you have provided. Usually, you determine
          their hours and direct where and how they work.
        </ReadMore>
        <div className={classes.employeeCard}>
          <MotoCard
            contents={contents}
            to="moto/companyType"
            from="moto/referral"
            page="motoEmployee"
            gridSizeDesktop={5}
          />
        </div>
      </Grid>
    </Page>
  );
}
