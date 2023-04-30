import React, { useEffect, useState } from 'react';
import { Page, StyleVariables  } from '@alcumus/components';
import { Typography } from '@mui/material';
import { Grid } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import AboutSection from '../../components/AboutSection';
import { mobileLiveChatContainerBox } from '../../constants';
import clsx from 'clsx';
import { FooterBackgroundColor } from '../../components/constants';

interface StatusSection {
  validateStatusHealth: Function;
  messageFromApi?: string;
  isFetching: boolean;
  error?: string;
}
const useStyles = makeStyles((theme) => ({
  footer: {
    padding: '2.5rem',
    backgroundColor: FooterBackgroundColor,
    position: 'fixed',
    bottom: '0',
    left: '0',
    width: '100%',
  },
  textTitle: {
    color: StyleVariables.colors.text.default,
    fontFamily: StyleVariables.fonts.family.heading,
    fontSize: StyleVariables.fonts.size.h3,
    lineHeight: StyleVariables.fonts.lineHeight.h3,
    fontWeight: StyleVariables.fonts.weight.semiBold,
    [theme.breakpoints.down('xs')]: {
      fontSize: StyleVariables.fonts.size.small,
      lineHeight: StyleVariables.fonts.lineHeight.small,
      marginTop: '8px',
    },
    textAlign: 'center',
  },
  errorTitle: {
    color: StyleVariables.colors.text.critical,
    fontFamily: StyleVariables.fonts.family.heading,
    fontSize: StyleVariables.fonts.size.h3,
    lineHeight: StyleVariables.fonts.lineHeight.h3,
    fontWeight: StyleVariables.fonts.weight.semiBold,
    [theme.breakpoints.down('xs')]: {
      fontSize: StyleVariables.fonts.size.small,
      lineHeight: StyleVariables.fonts.lineHeight.small,
      marginTop: '8px',
    },
    textAlign: 'center',
  },
  scrollablediv: {
    height: 'calc(100vh - 80px)',
    overflow: 'auto',
    scrollbarWidth: 'none',
    [theme.breakpoints.down('xs')]: {
      height: 'calc(100vh - 105px)',
    },
  },
  cssPage: {
    padding: 0,
    margin: 0,
  },
  statusContainer: {
    justifyContent: 'center',
    marginTop: '3rem',
  },
}));

export default function Status(statusSectionProps: StatusSection) {
  const classes = useStyles();
  const [statusMessage, setStatusMessage] = useState('');
  const [host, setHost] = useState('');
  const [statusError, setStatusError] = useState(false);
  const [environment, setEnvironment] = useState('');
  useEffect(() => {
    statusSectionProps.validateStatusHealth().then((res) => {
      if (res?.payload?.status === 'UNHEALTHY') {
        setStatusError(true);
      }
      setStatusMessage(`Status = ${res?.payload?.status}`);
      setHost(`Host = ${res?.payload?.Host}`);
      if (res?.payload?.Host.includes('localhost')) {
        setEnvironment(`Environment = Localhost`);
      } else if (res?.payload?.Host.includes('qa')) {
        setEnvironment(`Environment = QA`);
      } else if (res?.payload?.Host.includes('staging')) {
        setEnvironment(`Environment = Staging`);
      } else if (res?.payload?.Host.includes('dev')) {
        setEnvironment(`Environment = Development`);
      } else {
        setEnvironment(`Environment = Production`);
      }
    });
  }, []);

  return (
    <Page className={classes.cssPage}>
      <style type="text/css">{mobileLiveChatContainerBox}</style>
      <Grid item xs={12} className={classes.scrollablediv}>
        <AboutSection />
        <div>
          <Grid container className={classes.statusContainer}>
            <Grid item xs={12}>
              <Typography
                className={clsx(
                  `${
                    statusError === false
                      ? classes.textTitle
                      : classes.errorTitle
                  }`
                )}
                variant="h2"
                component="h2"
              >
                {statusMessage}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography
                className={classes.textTitle}
                variant="h2"
                component="h2"
              >
                {environment}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography
                className={classes.textTitle}
                variant="h2"
                component="h2"
              >
                {host}
              </Typography>
            </Grid>
          </Grid>
        </div>
      </Grid>
      <Grid container className={classes.footer}></Grid>
    </Page>
  );
}
