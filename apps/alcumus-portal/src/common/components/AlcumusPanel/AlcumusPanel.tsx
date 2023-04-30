import React from 'react';
import { Image, StyleVariables, Text } from '@alcumus/components';
import { Paper } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useTranslation } from 'react-i18next';
import Link from '../Link';
import clsx from 'clsx';

interface AlcumusPanelProps {
  className?: string;
  title?: string;
  children?: React.ReactNode;
  showFooter?: boolean;
  footerContent?: React.ReactNode;
}

const useStyles = makeStyles(() => ({
  alcumusPanel: {
    boxShadow: `20px 20px 20px ${StyleVariables.colors.boxShadowGrey}`,
    padding: '0 2rem 2rem',
  },
  logoContainer: {
    paddingTop: '1rem',
    paddingBottom: '1rem',
    textAlign: 'center',
  },
  logo: {
    maxWidth: '250px',
    minWidth: '150px',
    maxHeight: '150px',
    transform: 'translateX(-8.5%)',
  },
  title: {
    textAlign: 'center',
    fontWeight: StyleVariables.fonts.weight.medium,
  },
  formAction: {
    textAlign: 'right',
    marginTop: '1rem',
    marginBottom: '1rem',
  },
  footer: {
    textAlign: 'center',
  },
  footerText: {
    color: StyleVariables.colors.black,
    fontFamily: StyleVariables.fonts.family.heading,
    fontSize: StyleVariables.fonts.size.xs,
  },
  disclaimerLink: {
    fontSize: StyleVariables.fonts.size.xs,
  },
  grayFooterText: {
    color: StyleVariables.colors.text.subdued,
  },
}));

export default function AlcumusPanel({
  className,
  children,
  showFooter = true,
  footerContent = undefined,
  title,
}: AlcumusPanelProps) {
  const classes = useStyles();
  const { t } = useTranslation(['Login']);

  return (
    <Paper elevation={1} className={clsx(classes.alcumusPanel, className)}>
      <div className={classes.logoContainer}>
        <Image
          data-testid="alcumusLogo"
          src="/images/alcumus-logo-with-tagline.svg"
          alt="Alcumus - Safer, Healthier, Stronger"
          className={classes.logo}
        />
      </div>
      {!!title?.length && (
        <React.Fragment>
          <Text as="h5" component="h2" className={classes.title}>
            {title}
          </Text>
          <br />
        </React.Fragment>
      )}
      {children}
      {showFooter && (
        <React.Fragment>
          <hr />
          <div className={classes.footer}>
            {footerContent}
            <Text
              as="p"
              className={clsx(classes.footerText, classes.grayFooterText)}
            >
              {t('agreement', { ns: 'Login' })}
              <br />
              <Link
                to="https://www.ecompliance.com/legal/"
                target="_blank"
                rel="noreferrer"
                className={classes.disclaimerLink}
              >
                {t('termsAndConditions', { ns: 'Login' })}
              </Link>{' '}
              &{' '}
              <Link
                to="https://www.ecompliance.com/privacy/"
                target="_blank"
                rel="noreferrer"
                className={classes.disclaimerLink}
              >
                {t('privacyPolicy', { ns: 'Login' })}
              </Link>
            </Text>
          </div>
        </React.Fragment>
      )}
    </Paper>
  );
}
