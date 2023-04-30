import React from 'react';
import MyAccountSection from '../MyAccountSection';
import { TFunction } from 'i18next';
import { StyleVariables, Text } from '@alcumus/components';
import { Box, Link } from '@mui/material';
import { makeStyles } from '@mui/styles';
import clsx from 'clsx';

const useStyles = makeStyles({
  body: { marginTop: '32px' },
  linksContainer: { marginTop: '24px' },
  verticalLine: {
    borderLeft: `1px solid ${StyleVariables.colors.border.default}`,
    height: '24px',
  },
  linksContainerItems: { marginRight: '1rem' },
});

export const dataTestIds = {
  tosLink: 'ToS-Link',
  privacyPolicyLink: 'Pp-Link',
  body: 'body',
};

export interface AboutSectionProps {
  t: TFunction;
  className?: string;
}
export default function AboutSection({ t, className }: AboutSectionProps) {
  const classes = useStyles();

  return (
    <MyAccountSection header={t('header')} className={clsx(className)}>
      <Text className={classes.body} data-testid={dataTestIds.body}>
        {t('body')}
      </Text>
      <Box className={classes.linksContainer} display="flex">
        <Link
          data-testid={dataTestIds.tosLink}
          href="https://www.alcumus.com/wp-content/uploads/2022/06/Alcumus.com-Portal-EULA-1.pdf"
          target="_blank"
          underline="always"
          className={classes.linksContainerItems}
        >
          {t('termsOfService')}
        </Link>
        <div
          className={clsx(classes.verticalLine, classes.linksContainerItems)}
        ></div>
        <Link
          data-testid={dataTestIds.privacyPolicyLink}
          href="https://www.alcumus.com/en-gb/privacy-policy/"
          target="_blank"
          underline="always"
        >
          {t('privacyPolicy')}
        </Link>
      </Box>
    </MyAccountSection>
  );
}
