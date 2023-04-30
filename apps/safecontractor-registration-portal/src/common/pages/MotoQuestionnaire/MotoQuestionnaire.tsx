import React from 'react';
import { Grid } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import Typography from '@mui/material/Typography';
import { StyleVariables, Button, Page } from '@alcumus/components';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import MotoAboutSection from '../../components/MotoAboutSection';
import MotoStepper from '../../components/MotoStepper';
import MotoMobileFooterSection from '../../components/MotoMobileFooterSection';
import { liveChatContainer, mobileLiveChatContainerBox } from '../../constants';

const STEPPER_DOTS = 2;

const useStyles = makeStyles((theme) => ({
  title: {
    color: StyleVariables.colors.text.default,
    fontFamily: StyleVariables.fonts.family.heading,
    fontWeight: StyleVariables.fonts.weight.medium,
    fontSize: StyleVariables.fonts.size.h2,
    lineHeight: StyleVariables.fonts.lineHeight.h2,
    marginTop: '116px',
    textTransform: 'capitalize',
    [theme.breakpoints.down('md')]: {
      marginTop: '16px',
      textAlign: 'center',
      fontSize: StyleVariables.fonts.size.h3,
      lineHeight: StyleVariables.fonts.lineHeight.h3,
    },
  },

  subtitle: {
    color: StyleVariables.colors.text.default,
    fontFamily: StyleVariables.fonts.family.body,
    fontWeight: StyleVariables.fonts.weight.medium,
    fontSize: StyleVariables.fonts.size.h4,
    lineHeight: StyleVariables.fonts.lineHeight.h4,
    marginTop: '24px',
    [theme.breakpoints.down('md')]: {
      marginTop: '8px',
      textAlign: 'center',
      fontWeight: StyleVariables.fonts.weight.regular,
      fontSize: StyleVariables.fonts.size.small,
      lineHeight: StyleVariables.fonts.lineHeight.small,
    },
  },
  link: {
    textDecoration: 'none',
    cursor: 'pointer',
  },
  questionButton: {
    marginTop: '32px',
    [theme.breakpoints.down('md')]: {
      display: 'none',
    },
  },
  padding: {
    paddingTop: '12px',
    paddingBottom: '12px',
  },
  buttonText: {
    fontWeight: StyleVariables.fonts.weight.semiBold,
    fontSize: StyleVariables.fonts.mobile.size.h3,
    lineHeight: StyleVariables.fonts.mobile.lineHeight.h4,
  },
  cssPage: {
    padding: 0,
    margin: 0,
  },
  paddingRight: {
    paddingRight: '2rem',
    [theme.breakpoints.down('md')]: {
      paddingRight: 0,
    },
  },
  stepper: {
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
}));

export default function MotoQuestionnaire() {
  const classes = useStyles();
  const createAccountValue = useSelector((state: any) => state.motoCreateAccount);
  const FooterProps = {
    register: () => undefined,
    footerSectionProps: {
      visibility: 'none',
      to: 'moto/referral',
      text: 'Start questions',
      mobileText: 'Start questions',
      impaired: true,
    },
  };
  return (
    <Page className={classes.cssPage}>
      <style type="text/css">{liveChatContainer}</style>
      <style type="text/css">{mobileLiveChatContainerBox}</style>
      <Grid container>
        <MotoAboutSection count={STEPPER_DOTS} />
        <Grid item xs={1} md={1}></Grid>
        <Grid item xs={10} md={9} className={classes.paddingRight}>
          <Grid className={classes.stepper}>
            <MotoStepper count={STEPPER_DOTS}></MotoStepper>
          </Grid>

          <Typography className={classes.title}>
            Hello {createAccountValue.firstName} {createAccountValue.lastName}
          </Typography>
          <Typography className={classes.subtitle}>
            We want to make it as easy as possible to become SafeContractor
            accredited. Please answer the following questions so we can match
            your needs with the right level of service.
          </Typography>
          <Typography className={classes.questionButton}>
            <Link to="/moto/referral" className={classes.link}>
              <Button
                title="Click here to Start questions"
                rounded
                data-testid="startQuestions"
                className={classes.padding}
              >
                <Typography className={classes.buttonText}>
                  Start questions
                </Typography>
              </Button>
            </Link>
          </Typography>
        </Grid>
        <Grid item xs={1} md={2}></Grid>
      </Grid>
      <MotoMobileFooterSection {...FooterProps} />
    </Page>
  );
}
