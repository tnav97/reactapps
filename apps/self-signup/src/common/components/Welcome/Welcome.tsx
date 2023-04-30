import {
  Text,
  Button,
  TranslateReady,
  PageWithNavbar as SelfSignupPage,
  StyleVariables,
} from '@alcumus/components';
import { Grid, Hidden } from '@mui/material';
import { makeStyles } from '@mui/styles';
import clsx from 'clsx';
import { TFunction } from 'i18next';
import React, { useEffect, useState } from 'react';
import { Transition } from 'react-transition-group';
import { useHistory } from 'react-router-dom';
import Analytics from '@alcumus/analytics-package';
import { getFadeAndUpStyles } from './fadeAndUpStyles';

export interface WelcomeProps {
  firstName: string;
  lastName: string;
  t: TFunction;
  tReady: boolean;
}

const useStyles = makeStyles({
  welcomeUser: {
    marginTop: '10vh',
  },
  welcomeBody: {
    marginTop: '2rem',
  },
  button: {
    marginTop: '4rem',
    fontSize: StyleVariables.fonts.size.regular,
  },
  headingFont: {
    fontWeight: 600,
  },
  contentFont: {
    fontWeight: 500,
  },
  gridContainer: {
    padding: '1rem',
  },
});

export default function Welcome({
  firstName = '',
  lastName = '',
  t,
  tReady,
}: WelcomeProps) {
  const classes = useStyles();
  const history = useHistory();

  const [fadeAndUp, setFadeAndUp] = useState<boolean>(false);
  const defaultStyle = {
    opacity: 0,
  };
  const fadeAndUpDuration = 500;
  const nameFadeAndUpDelay = 500;
  const welcomeFadeAndUpDelay = 800;
  const buttonFadeAndUpDelay = 1000;

  const handleClick = () => {
    Analytics.getInstance().trackWithCategory(
      'Questionnaire',
      'Questionnaire Proceeded'
    );
    history.push('/questionnaire');
  };

  useEffect(() => {
    const analytics = Analytics.getInstance();
    analytics.trackWithCategory('Questionnaire', 'Questionnaire Initiated');
    analytics.timeEvent('Free Trial Initiated');
    setFadeAndUp(true);
  }, []);

  return (
    <TranslateReady tReady={tReady}>
      <SelfSignupPage>
        <Grid container className={clsx([classes.gridContainer])}>
          <Hidden mdDown>
            <Grid item sm={2} />
          </Hidden>
          <Grid item xs={12} md={10}>
            <Grid item xs={12}>
              <Transition in={fadeAndUp} timeout={fadeAndUpDuration}>
                {(state) => (
                  <Text
                    className={clsx([classes.headingFont, classes.welcomeUser])}
                    data-testid="fullName"
                    as="h2"
                    style={{
                      ...defaultStyle,
                      ...getFadeAndUpStyles(
                        nameFadeAndUpDelay,
                        fadeAndUpDuration
                      )[state],
                    }}
                  >
                    {t('welcomeUser', { firstName, lastName })},
                  </Text>
                )}
              </Transition>
            </Grid>
            <Grid item xs={12}>
              <Transition in={fadeAndUp} timeout={fadeAndUpDuration}>
                {(state) => (
                  <Text
                    className={clsx([classes.contentFont, classes.welcomeBody])}
                    as="h4"
                    style={{
                      ...defaultStyle,
                      ...getFadeAndUpStyles(
                        welcomeFadeAndUpDelay,
                        fadeAndUpDuration
                      )[state],
                    }}
                  >
                    {t('welcomeText')}
                  </Text>
                )}
              </Transition>
            </Grid>
            <Grid>
              <Transition in={fadeAndUp} timeout={fadeAndUpDuration}>
                {(state) => (
                  <Button
                    size="large"
                    rounded
                    className={classes.button}
                    data-testid="soundsGreat"
                    onClick={handleClick}
                    style={{
                      ...defaultStyle,
                      ...getFadeAndUpStyles(
                        buttonFadeAndUpDelay,
                        fadeAndUpDuration
                      )[state],
                    }}
                  >
                    {t('welcomeAcknowledgmentButtonText')}
                  </Button>
                )}
              </Transition>
            </Grid>
          </Grid>
        </Grid>
      </SelfSignupPage>
    </TranslateReady>
  );
}
