import React from 'react';
import { Button, StyleVariables } from '@alcumus/components';
import { Grid, Typography } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import { KeyboardBackspaceRounded } from '@mui/icons-material';
import { FooterBackgroundColor } from '../constants';
import { Link } from 'react-router-dom';

interface FooterSectionMainProps {
  register: Function;
  footerSectionProps?: FooterSectionProps;
}

interface FooterSectionProps {
  visibility?: string;
  from?: string;
  to?: string;
  impaired?: boolean;
  page?: string;
  text?: string;
  prevText?: string;
  type?: string;
}
const useStyles = makeStyles({
  footer: {
    padding: '20px',
    backgroundColor: FooterBackgroundColor,
    position: 'fixed',
    bottom: '0',
    left: '0',
    width: '100%',
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
  },
  transformButton: {
    transform: 'rotate(180deg)',
  },
  buttonText: {
    fontWeight: StyleVariables.fonts.weight.semiBold,
    fontSize: StyleVariables.fonts.mobile.size.h5,
    lineHeight: StyleVariables.fonts.mobile.lineHeight.h4,
  },
  padding: {
    paddingTop: '1rem',
    paddingBottom: '1rem',
  },
  invisible: {
    display: 'none',
  },
});

export default function FooterSection(
  footerSectionMainProps: FooterSectionMainProps
) {
  const submit = () => {
    footerSectionMainProps.register();
  };
  const classes = useStyles();

  return (
    <Grid container className={classes.footer}>
      <Grid item xs={6}>
        <Link
          to={`/${footerSectionMainProps?.footerSectionProps?.from}`}
          className={classes.link}
          tabIndex={-1}
        >
          <Button
            startIcon={<KeyboardBackspaceRounded aria-hidden="false" />}
            title={
              footerSectionMainProps?.footerSectionProps?.prevText
                ? `Click here to ${footerSectionMainProps?.footerSectionProps?.prevText}`
                : 'Click here to Previous question'
            }
            data-testid={`${footerSectionMainProps?.footerSectionProps?.from}`}
            className={`${
              footerSectionMainProps?.footerSectionProps?.visibility === 'none'
                ? classes.invisible
                : classes.previousSection
            }`}
            rounded
            tabIndex={0}
            aria-hidden="false"
          >
            <Typography className={classes.buttonText}>
              {footerSectionMainProps?.footerSectionProps?.prevText
                ? footerSectionMainProps?.footerSectionProps?.prevText
                : 'Previous question'}
            </Typography>
          </Button>
        </Link>
      </Grid>
      <Grid item xs={6}>
        {footerSectionMainProps?.footerSectionProps?.to !== undefined ? (
          <Link
            to={`/${footerSectionMainProps?.footerSectionProps?.to}`}
            className={classes.link}
            tabIndex={-1}
          >
            <Button
              endIcon={
                <KeyboardBackspaceRounded
                  className={classes.transformButton}
                  aria-hidden="false"
                />
              }
              className={classes.nextSection}
              data-testid={`${footerSectionMainProps?.footerSectionProps?.to}`}
              rounded
              title={
                footerSectionMainProps?.footerSectionProps?.text
                  ? `Click here to ${footerSectionMainProps?.footerSectionProps?.text}`
                  : 'Click here to Next question'
              }
              disabled={!footerSectionMainProps?.footerSectionProps?.impaired}
              tabIndex={0}
              aria-hidden="false"
            >
              <Typography className={classes.buttonText}>
                {footerSectionMainProps?.footerSectionProps?.text
                  ? footerSectionMainProps?.footerSectionProps?.text
                  : 'Next question'}
              </Typography>
            </Button>
          </Link>
        ) : (
          <Button
            endIcon={
              <KeyboardBackspaceRounded
                className={classes.transformButton}
                aria-hidden="false"
              />
            }
            className={classes.nextSection}
            rounded
            data-testid={`${footerSectionMainProps?.footerSectionProps?.page}`}
            onClick={submit}
            title={
              footerSectionMainProps?.footerSectionProps?.text
                ? `Click here to ${footerSectionMainProps?.footerSectionProps?.text}`
                : 'Click here to Next question'
            }
            disabled={!footerSectionMainProps?.footerSectionProps?.impaired}
            tabIndex={0}
            aria-hidden="false"
          >
            <Typography className={classes.buttonText}>
              {footerSectionMainProps?.footerSectionProps?.text
                ? footerSectionMainProps?.footerSectionProps?.text
                : 'Next question'}
            </Typography>
          </Button>
        )}
      </Grid>
    </Grid>
  );
}
