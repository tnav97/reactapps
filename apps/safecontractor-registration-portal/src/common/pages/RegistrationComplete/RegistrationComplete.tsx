import React, { useEffect, useState } from 'react';
import { Grid } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import Typography from '@mui/material/Typography';
import { Image, Page, StyleVariables, Button } from '@alcumus/components';
import RightOrderComponent from '../../components/RightOrderComponentSection';
import AboutSection from '../../components/AboutSection';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import {
  DevRedirectionUrl,
  liveChatContainer,
  ProdRedirectionUrl,
  QaRedirectionUrl,
  StagingRedirectionUrl,
} from '../../constants';

const useStyles = makeStyles((theme) => ({
  logo: {
    alignItems: 'center',
    marginLeft: '20px',
    marginTop: '24px',
    maxWidth: '175px',
    maxHeight: '32px',
    [theme.breakpoints.down('md')]: {
      display: 'none',
    },
  },
  title: {
    color: StyleVariables.colors.text.default,
    fontFamily: StyleVariables.fonts.family.heading,
    fontSize: StyleVariables.fonts.size.h3,
    lineHeight: StyleVariables.fonts.lineHeight.h3,
    fontWeight: StyleVariables.fonts.weight.semiBold,
    [theme.breakpoints.down('lg')]: {
      fontWeight: StyleVariables.fonts.weight.semiBold,
      fontSize: StyleVariables.fonts.size.h3,
      lineHeight: StyleVariables.fonts.lineHeight.h3,
      marginTop: '24px',
    },
    [theme.breakpoints.down('sm')]: {
      fontWeight: StyleVariables.fonts.weight.medium,
      marginTop: '24px',
    },
    marginTop: '42px',
    textAlign: 'center',
  },
  textTitle: {
    color: StyleVariables.colors.text.default,
    fontFamily: StyleVariables.fonts.family.heading,
    fontSize: StyleVariables.fonts.size.h5,
    lineHeight: StyleVariables.fonts.lineHeight.regular,
    fontWeight: StyleVariables.fonts.weight.semiBold,
    [theme.breakpoints.down('lg')]: {
      fontWeight: StyleVariables.fonts.weight.semiBold,
      marginTop: '34px',
    },
    [theme.breakpoints.down('sm')]: {
      marginTop: '32px',
    },
    marginTop: '32px',
  },
  subTextTitle: {
    color: StyleVariables.colors.text.default,
    fontFamily: StyleVariables.fonts.family.heading,
    fontSize: StyleVariables.fonts.size.h5,
    lineHeight: StyleVariables.fonts.lineHeight.regular,
    fontWeight: StyleVariables.fonts.weight.semiBold,
    [theme.breakpoints.down('lg')]: {
      fontWeight: StyleVariables.fonts.weight.semiBold,
      fontSize: StyleVariables.fonts.size.h5,
      lineHeight: StyleVariables.fonts.lineHeight.regular,
      marginTop: '24px',
    },
    marginTop: '8px',
  },
  logoLink: {
    textDecoration: 'none',
  },
  subtitle: {
    color: StyleVariables.colors.text.default,
    fontFamily: StyleVariables.fonts.family.heading,
    fontWeight: StyleVariables.fonts.weight.regular,
    fontSize: StyleVariables.fonts.size.h6,
    lineHeight: StyleVariables.fonts.lineHeight.regular,
    marginTop: '8px',
    marginBottom: '8px',
    [theme.breakpoints.down('sm')]: {
      marginTop: '12px',
      marginBottom: '12px',
    },
  },
  subNextTitle: {
    color: StyleVariables.colors.text.default,
    fontFamily: StyleVariables.fonts.family.heading,
    fontWeight: StyleVariables.fonts.weight.regular,
    fontSize: StyleVariables.fonts.size.h6,
    lineHeight: StyleVariables.fonts.lineHeight.regular,
    marginTop: '8px',
    marginBottom: '8px',
  },
  subNextMail: {
    color: StyleVariables.colors.interactive.default,
  },
  cssPage: {
    padding: 0,
    margin: 0,
  },
  margin: {
    marginTop: '1rem',
    marginBottom: '1rem',
  },
  paymentContainer: {
    marginTop: '1.5rem',
    marginBottom: '1.5rem',
    [theme.breakpoints.down('sm')]: {
      marginTop: '0.875rem',
      marginBottom: '0.875rem',
    },
  },
  paymentText: {
    fontWeight: StyleVariables.fonts.weight.semiBold,
  },
  marginLeft: {
    marginLeft: '4px',
  },
  flex: {
    display: 'flex',
    marginTop: '8px',
  },
  buttonText: {
    fontWeight: StyleVariables.fonts.weight.semiBold,
    fontSize: StyleVariables.fonts.mobile.size.h5,
    lineHeight: StyleVariables.fonts.mobile.lineHeight.h4,
  },
  containerPadding: {
    paddingLeft: '1rem',
    paddingRight: '1rem',
  },
  buttonContainer: {
    height: '40px',
    borderRadius: '100px',
  },
  header: {
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
}));
export default function RegistrationCompletePage() {
  const [membershipId, setMembershipId] = useState('');
  const paymentDetailsSelector = useSelector((state: any) => state.payment);
  const [redirectionLink, setRedirectionLink] = useState('');
  useEffect(() => {
    if (paymentDetailsSelector.membershipId !== undefined) {
      setMembershipId(paymentDetailsSelector.membershipId);
    }
  }, [paymentDetailsSelector]);
  useEffect(() => {
    const Host = window.location.host;
    if (Host.includes('localhost')) {
      setRedirectionLink(DevRedirectionUrl);
    } else if (Host.includes('qa')) {
      setRedirectionLink(QaRedirectionUrl);
    } else if (Host.includes('staging')) {
      setRedirectionLink(StagingRedirectionUrl);
    } else if (Host.includes('dev')) {
      setRedirectionLink(DevRedirectionUrl);
    } else {
      setRedirectionLink(ProdRedirectionUrl);
    }
  }, []);

  const classes = useStyles();
  return (
    <Page className={classes.cssPage}>
      <style type="text/css">{liveChatContainer}</style>
      <Grid container>
        <Grid item xs={12} lg={12} className={classes.header}>
          <AboutSection />
        </Grid>
        <Grid item md={12} lg={6}>
          <Image
            src="images/SafeContractorLogo.png"
            alt="Alcumus-logo"
            className={classes.logo}
          />
          <Grid container>
            <Grid item sm={2} md={2} lg={1}></Grid>
            <Grid
              item
              xs={12}
              sm={8}
              lg={10}
              className={classes.containerPadding}
            >
              <Grid container>
                <Grid item xs={12}>
                  <Typography
                    className={classes.title}
                    variant="h1"
                    component="h1"
                  >
                    Registration complete
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography
                    className={classes.textTitle}
                    variant="h2"
                    component="h2"
                  >
                    Thank you for providing your company information
                  </Typography>
                </Grid>
                <Grid item lg={12}>
                  <Typography
                    className={classes.subtitle}
                    data-testid={`${membershipId}`}
                  >
                    Your membership number is: [{membershipId}]. Your
                    registration will now be verified, please use the BACS
                    details below to continue to make the required payment. Once
                    this has taken place you will be contacted by telephone to
                    confirm the next steps in your accreditation process. An
                    email has been sent to you confirming your application.
                  </Typography>
                </Grid>
                <Grid item lg={12}>
                  <Typography className={classes.subtitle}>
                    Please note: Your membership and support will not begin
                    until your payment has been fully processed.
                  </Typography>
                </Grid>
                <Grid item lg={12} className={classes.paymentContainer}>
                  <Grid container>
                    <Grid item xs={12} sm={6}>
                      <Grid container>
                        <Grid item xs={12} className={classes.flex}>
                          <Grid item>
                            <Typography className={classes.paymentText}>
                              Payment transfers to:
                            </Typography>
                          </Grid>
                          <Grid item>
                            <Typography className={classes.marginLeft}>
                              HSBC
                            </Typography>
                          </Grid>
                        </Grid>
                        <Grid item xs={12} className={classes.flex}>
                          <Grid item>
                            <Typography className={classes.paymentText}>
                              Sort code:
                            </Typography>
                          </Grid>
                          <Grid item>
                            <Typography className={classes.marginLeft}>
                              40-16-13
                            </Typography>
                          </Grid>
                        </Grid>
                        <Grid item xs={12} className={classes.flex}>
                          <Grid item>
                            <Typography className={classes.paymentText}>
                              Account:
                            </Typography>
                          </Grid>
                          <Grid item>
                            <Typography className={classes.marginLeft}>
                              61501739
                            </Typography>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Grid container>
                        <Grid item xs={12} className={classes.flex}>
                          <Grid item>
                            <Typography className={classes.paymentText}>
                              IBAN:
                            </Typography>
                          </Grid>
                          <Grid item>
                            <Typography className={classes.marginLeft}>
                              GB66HBUK40161361501739
                            </Typography>
                          </Grid>
                        </Grid>
                        <Grid item xs={12} className={classes.flex}>
                          <Grid item>
                            <Typography className={classes.paymentText}>
                              SWIFT:
                            </Typography>
                          </Grid>
                          <Grid item>
                            <Typography className={classes.marginLeft}>
                              HBUKGB4B
                            </Typography>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item lg={12}>
                  <Typography className={classes.subNextTitle}>
                    Our in-house support team are here to help. For any
                    questions please call us on 0333 242 9083 or email{' '}
                    <a
                      href="safecontractor@safecontractor.com"
                      className={classes.subNextMail}
                    >
                      safecontractor@safecontractor.com
                    </a>
                    . Our normal office hours are Monday to Friday, 8am to 5pm.
                  </Typography>
                </Grid>
                <Grid item lg={12} className={classes.margin}>
                  <a
                    href={redirectionLink}
                    target="_blank"
                    rel="noreferrer"
                    className={classes.logoLink}
                  >
                    <Button
                      data-testid="registrationComplete"
                      className={classes.buttonContainer}
                      title="Click here to log into the SafeContractor portal"
                      tabIndex="number"
                    >
                      <Typography className={classes.buttonText}>
                        Log in to SafeContractor portal
                      </Typography>
                    </Button>
                  </a>
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={1} sm={2} lg={1}></Grid>
          </Grid>
        </Grid>
        <RightOrderComponent />
      </Grid>
    </Page>
  );
}
