import React from 'react';
import { Grid } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import Typography from '@mui/material/Typography';
import { StyleVariables, Button, Page } from '@alcumus/components';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import AboutSection from '../../components/AboutSection';
import MobileFooterSection from '../../components/MobileFooterSection';
import { liveChatContainer, mobileLiveChatContainerBox } from '../../constants';
import ProgressBar from '../../components/ProgressBar';

const PROGRESS = 0;

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

export default function Questionnaire() {
  const classes = useStyles();
  const createAccountValue = useSelector((state: any) => state.createAccount);
  const FooterProps = {
    register: () => undefined,
    footerSectionProps: {
      visibility: 'none',
      to: 'referral',
      text: 'Start questions',
      mobileText: 'Start questions',
      impaired: true,
    },
  };
  return (
    <Page className={classes.cssPage}>
      <style type="text/css">{liveChatContainer}</style>
      <style type="text/css">{mobileLiveChatContainerBox}</style>
      <Grid item xs={12}>
        <AboutSection progress={PROGRESS} />
      </Grid>
      <Grid className={classes.stepper}>
        <ProgressBar progress={PROGRESS}></ProgressBar>
      </Grid>
      <Grid container>
        <Grid item xs={1} md={1}></Grid>
        <Grid item xs={10} md={9} className={classes.paddingRight}>
          <Typography className={classes.title} variant="h1" component="h1">
            Hello {createAccountValue.firstName} {createAccountValue.lastName}
          </Typography>
          <Typography className={classes.subtitle}>
            We want to make it as easy as possible to become SafeContractor
            accredited. Please answer the following questions so we can match
            your needs with the right level of service.
          </Typography>
          <Typography className={classes.questionButton}>
            <Link to="/referral" tabIndex={-1} className={classes.link}>
              <Button
                title="Click here to Start questions"
                rounded
                data-testid="startQuestions"
                className={classes.padding}
                tabIndex={0}
              >
                <Typography className={classes.buttonText}>
                  Start questions
                </Typography>
              </Button>
            </Link>
          </Typography>
        </Grid>
      </Grid>
      <MobileFooterSection {...FooterProps} />
    </Page>
  );
}
