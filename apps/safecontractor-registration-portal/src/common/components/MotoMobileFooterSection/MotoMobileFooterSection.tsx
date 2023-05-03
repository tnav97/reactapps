import React from 'react';
import { Button, StyleVariables } from '@alcumus/components';
import { Grid, Typography } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import { Link } from 'react-router-dom';
import { FooterBackgroundColor } from '../constants';
import { createTheme} from '@mui/material';

interface FooterSectionMainProps {
  register: Function;
  footerSectionProps?: MobileFooterSectionProps;
}
interface MobileFooterSectionProps {
  visibility?: string;
  from?: string;
  to?: string;
  impaired?: boolean;
  mobileText?: string;
  text?: string;
  prevText?: string;
  type?: string;
  page?: string;
}
const Breakpoints = createTheme().breakpoints;
const useStyles = makeStyles((theme) => ({
  footer: {
    padding: '16px',
    backgroundColor: FooterBackgroundColor,
    position: 'fixed',
    bottom: '0',
    left: '0',
    width: '100%',
    [Breakpoints.up('md')]: {
      display: 'none',
    },
  },
  link: {
    textDecoration: 'none',
    cursor: 'pointer',
  },
  nextSection: {
    float: 'right',
    height: '40px',
    fontSize: StyleVariables.fonts.size.regular,
    lineHeight: StyleVariables.fonts.lineHeight.h3,
    [Breakpoints.down('md')]: {
      width: 'fill-available',
    },
  },
  previousSection: {
    float: 'left',
    height: '40px',
    color: StyleVariables.colors.text.default,
    borderWidth: '1px',
    border: 'solid',
    borderRadius: '205px',
    borderColor: StyleVariables.colors.action.secondary.hover,
    backgroundColor: StyleVariables.colors.action.secondary.default,
    '&:hover': {
      backgroundColor: StyleVariables.colors.action.secondary.default,
    },
    [Breakpoints.down('md')]: {
      width: 'fill-available',
    },
  },
  buttonText: {
    fontWeight: StyleVariables.fonts.weight.semiBold,
    fontSize: StyleVariables.fonts.mobile.size.h5,
    lineHeight: StyleVariables.fonts.mobile.lineHeight.h4,
    [Breakpoints.down('md')]: {
      fontSize: StyleVariables.fonts.mobile.size.h6,
    },
  },
  padding: {
    paddingTop: '12px',
    paddingBottom: '12px',
  },
  invisible: {
    display: 'none',
  },
  firstContainer: {
    marginBottom: '8px',
  },
}));
export default function MotoMobileFooterSection(
  footerSectionMainProps: FooterSectionMainProps
) {
  const classes = useStyles();
  const submit = () => {
    footerSectionMainProps.register();
  };
  return (
    <Grid container className={classes.footer}>
      <Grid item xs={12} className={classes.firstContainer}>
        {footerSectionMainProps?.footerSectionProps?.type !== 'payment' &&
        footerSectionMainProps?.footerSectionProps?.type !== 'createAccount' ? (
          <Link
            to={`/${footerSectionMainProps?.footerSectionProps?.to}`}
            className={classes.link}
          >
            <Button
              className={classes.nextSection}
              rounded
              data-testid={`Mobile${footerSectionMainProps?.footerSectionProps?.to}`}
              title={
                footerSectionMainProps?.footerSectionProps?.mobileText
                  ? footerSectionMainProps?.footerSectionProps?.mobileText
                  : 'Next question'
              }
              disabled={!footerSectionMainProps?.footerSectionProps?.impaired}
            >
              <Typography className={classes.buttonText}>
                {footerSectionMainProps?.footerSectionProps?.mobileText
                  ? footerSectionMainProps?.footerSectionProps?.mobileText
                  : 'Next question'}
              </Typography>
            </Button>
          </Link>
        ) : (
          <Button
            className={classes.nextSection}
            rounded
            onClick={submit}
            data-testid="Mobilepayment"
            title={
              footerSectionMainProps?.footerSectionProps?.text
                ? footerSectionMainProps?.footerSectionProps?.text
                : 'Next question'
            }
            disabled={!footerSectionMainProps?.footerSectionProps?.impaired}
          >
            <Typography className={classes.buttonText}>
              {footerSectionMainProps?.footerSectionProps?.mobileText
                ? footerSectionMainProps?.footerSectionProps?.mobileText
                : 'Next question'}
            </Typography>
          </Button>
        )}
      </Grid>
      <Grid item xs={12}>
        <Link
          to={`/${footerSectionMainProps?.footerSectionProps?.from}`}
          className={classes.link}
        >
          <Button
            title="Go Back"
            data-testid={`Mobile${footerSectionMainProps?.footerSectionProps?.from}`}
            className={`${
              footerSectionMainProps?.footerSectionProps?.visibility === 'none'
                ? classes.invisible
                : classes.previousSection
            }`}
            rounded
          >
            <Typography className={classes.buttonText}>Go back</Typography>
          </Button>
        </Link>
      </Grid>
    </Grid>
  );
}
