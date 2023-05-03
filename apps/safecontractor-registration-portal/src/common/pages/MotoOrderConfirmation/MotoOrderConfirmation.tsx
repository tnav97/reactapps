import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Grid } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import Typography from '@mui/material/Typography';
import { Image, Page, StyleVariables, Button } from '@alcumus/components';
import MotoRightOrderComponent from '../../components/MotoRightOrderComponentSection';
import MotoAboutSection from '../../components/MotoAboutSection';
import { useDispatch } from 'react-redux/es/hooks/useDispatch';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { liveChatContainer } from '../../constants';
import { createTheme} from '@mui/material';

const Breakpoints = createTheme().breakpoints;
const useStyles = makeStyles((theme) => ({
  logo: {
    alignItems: 'center',
    marginLeft: '24px',
    marginTop: '18px',
    maxWidth: '175px',
    maxHeight: '32px',
    [Breakpoints.down('md')]: {
      display: 'none',
    },
  },
  title: {
    color: StyleVariables.colors.text.default,
    fontFamily: StyleVariables.fonts.family.heading,
    fontSize: StyleVariables.fonts.size.h3,
    lineHeight: StyleVariables.fonts.lineHeight.h3,
    fontWeight: StyleVariables.fonts.weight.semiBold,
    [Breakpoints.down('lg')]: {
      fontWeight: StyleVariables.fonts.weight.semiBold,
      marginTop: '24px',
    },
    [Breakpoints.down('sm')]: {
      fontWeight: StyleVariables.fonts.weight.medium,
      marginTop: '24px',
    },
    [Breakpoints.up('xl')]: {
      fontWeight: StyleVariables.fonts.weight.semiBold,
      fontSize: StyleVariables.fonts.size.h1,
      lineHeight: StyleVariables.fonts.lineHeight.h1,
      marginTop: '54px',
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
    [Breakpoints.down('lg')]: {
      fontWeight: StyleVariables.fonts.weight.semiBold,
      fontSize: StyleVariables.fonts.size.h5,
      lineHeight: StyleVariables.fonts.lineHeight.h5,
      marginTop: '40px',
    },
    [Breakpoints.down('sm')]: {
      marginTop: '32px',
    },
    [Breakpoints.up('xl')]: {
      fontWeight: StyleVariables.fonts.weight.semiBold,
      fontSize: StyleVariables.fonts.size.h3,
      lineHeight: StyleVariables.fonts.lineHeight.h3,
      marginTop: '48px',
    },
    marginTop: '32px',
  },
  subTextTitle: {
    color: StyleVariables.colors.text.default,
    fontFamily: StyleVariables.fonts.family.heading,
    fontSize: StyleVariables.fonts.size.h5,
    lineHeight: StyleVariables.fonts.lineHeight.regular,
    fontWeight: StyleVariables.fonts.weight.semiBold,
    [Breakpoints.down('lg')]: {
      fontWeight: StyleVariables.fonts.weight.semiBold,
      fontSize: StyleVariables.fonts.size.h5,
      lineHeight: StyleVariables.fonts.lineHeight.regular,
      marginTop: '16px',
    },
    [Breakpoints.down('sm')]: {
      marginTop: '16px',
    },
    [Breakpoints.up('xl')]: {
      fontWeight: StyleVariables.fonts.weight.semiBold,
      fontSize: StyleVariables.fonts.size.h3,
      lineHeight: StyleVariables.fonts.lineHeight.h3,
    },
    marginTop: '16px',
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
    [Breakpoints.down('lg')]: {
      fontWeight: StyleVariables.fonts.weight.regular,
      fontSize: StyleVariables.fonts.size.h6,
      lineHeight: StyleVariables.fonts.lineHeight.h5,
    },
    marginTop: '8px',
    marginBottom: '8px',
    [Breakpoints.down('sm')]: {
      marginTop: '0.875rem',
      marginBottom: '0.875rem',
    },
    [Breakpoints.up('xl')]: {
      fontWeight: StyleVariables.fonts.weight.regular,
      fontSize: StyleVariables.fonts.size.h4,
      lineHeight: StyleVariables.fonts.lineHeight.h4,
      marginTop: '2rem',
      marginBottom: '2rem',
    },
  },
  subNextTitle: {
    color: StyleVariables.colors.text.default,
    fontFamily: StyleVariables.fonts.family.heading,
    fontWeight: StyleVariables.fonts.weight.regular,
    fontSize: StyleVariables.fonts.size.h6,
    lineHeight: StyleVariables.fonts.lineHeight.regular,
    [Breakpoints.down('lg')]: {
      fontWeight: StyleVariables.fonts.weight.regular,
      fontSize: StyleVariables.fonts.size.h6,
      lineHeight: StyleVariables.fonts.lineHeight.h5,
    },
    [Breakpoints.down('sm')]: {
      marginTop: '0.875rem',
      marginBottom: '0.875rem',
    },
    [Breakpoints.up('xl')]: {
      fontWeight: StyleVariables.fonts.weight.regular,
      fontSize: StyleVariables.fonts.size.h4,
      lineHeight: StyleVariables.fonts.lineHeight.h4,
      marginTop: '2rem',
      marginBottom: '2rem',
    },
    marginTop: '8px',
    marginBottom: '8px',
  },
  cssPage: {
    padding: 0,
    margin: 0,
  },
  assistanceInfo: {
    marginTop: '1rem',
    marginBottom: '1rem',
    [Breakpoints.down('sm')]: {
      marginTop: '0.875rem',
      marginBottom: '0.875rem',
    },
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
    [Breakpoints.up('md')]: {
      display: 'none',
    },
  },
}));
export default function OrderConfirmationPage() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const paymentDetailsSelector = useSelector((state: any) => state.motoPayment);
  const cartIdExist = paymentDetailsSelector.cartIdExist;
  const history = useHistory();

  useEffect(() => {
    if (cartIdExist) {
      dispatch({
        type: 'motoRegisterDetails',
        payload: {
          isRegistered: true,
          to: '/moto/orderConfirmation',
        },
      });
    } else {
      if (!paymentDetailsSelector.isRegistered) {
        history.push('/moto');
      }
    }
  }, []);
  return (
    <Page className={classes.cssPage}>
      <style type="text/css">{liveChatContainer}</style>
      <Grid container>
        <Grid item xs={12} lg={12} className={classes.header}>
          <MotoAboutSection />
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
                  <Typography className={classes.title}>
                    Order confirmation
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography className={classes.textTitle}>
                    Thank you for joining SafeContractor
                  </Typography>
                </Grid>
                <Grid item lg={12}>
                  <Typography className={classes.subtitle}>
                    We are delighted to welcome you to our community of over
                    30,000 members, all using their SafeContractor approved
                    status to demonstrate to hundreds of organisations that they
                    are a safe, stable and ethical business to work with.
                  </Typography>
                </Grid>
                <Grid item lg={12}>
                  <Typography className={classes.subTextTitle}>
                    What happens next
                  </Typography>
                </Grid>
                <Grid item lg={12}>
                  <Typography className={classes.subtitle}>
                    In order to achieve accreditation you must now log in to the
                    SafeContractor portal and complete your health and safety
                    assessment. It is essential that you complete this as until
                    it is completed you cannot be accredited.
                  </Typography>
                </Grid>
                <Grid item lg={12}>
                  <Typography className={classes.subNextTitle}>
                    You&apos;ll receive an email from us containing your
                    membership number. Your membership number is your username
                    and you will need to use this to log in. Your password is
                    the one you chose during this online registration.
                  </Typography>
                </Grid>
                <Grid item lg={12} className={classes.assistanceInfo}>
                  <a
                    href="https://apps.alcumusgroup.net/AccreditationWeb/"
                    target="_blank"
                    rel="noreferrer"
                    className={classes.logoLink}
                  >
                    <Button
                      data-testid="orderConifrmation"
                      className={classes.buttonContainer}
                    >
                      <Typography className={classes.buttonText}>
                        Log in to SafeContractor portal
                      </Typography>
                    </Button>
                  </a>
                </Grid>
                <Grid item lg={12}>
                  <Typography className={classes.subNextTitle}>
                    Our in-house support team are here to help. For any
                    questions please call us on 0333 242 9083 or email{' '}
                    <a href="safecontractor@safecontractor.com">
                      safecontractor@safecontractor.com
                    </a>
                    . Our normal office hours are Monday to Friday, 8am to 5pm.
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item sm={2} lg={1}></Grid>
          </Grid>
        </Grid>
        <MotoRightOrderComponent />
      </Grid>
    </Page>
  );
}
