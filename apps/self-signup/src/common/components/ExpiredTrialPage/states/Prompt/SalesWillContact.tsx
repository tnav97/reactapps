import { makeStyles } from '@mui/styles';
import React from 'react';
import { Trans } from 'react-i18next';
import ContinueFreeTrialButton from '../../buttons/ContinueFreeTrialButton';
import WithTFunctionAsProp from '../../../../types/WithTFunctionAsProp';
import { ActionPage, StyleVariables, Text } from '@alcumus/components';

const useStyles = makeStyles({
  actionPageBody: {
    fontWeight: 500,
  },
  highlightedText: {
    color: StyleVariables.colors.action.primary.default,
    fontWeight: 600,
  },
});

export default function SalesWillContact({
  t,
  trialExtended = false,
}: { trialExtended: boolean } & WithTFunctionAsProp) {
  const classes = useStyles();

  return (
    <ActionPage
      pageTitle={t('contactSales.header')}
      header={t('contactSales.header')}
      imgSrc="/images/calendar.svg"
      imgAlt={t('contactSales.altText')}
      body={
        !trialExtended ? (
          t('contactSales.bodyLine1')
        ) : (
          <Text center as="h4" className={classes.actionPageBody}>
            {t('contactSales.bodyLine1')}
            <br />
            <Trans key="contactSales.bodyLine2">
              In the meantime we will be{' '}
              <span className={classes.highlightedText}>
                extending your free trial.
              </span>
            </Trans>
            <br />
            {t('contactSales.bodyLine3')}
          </Text>
        )
      }
      buttons={trialExtended && <ContinueFreeTrialButton t={t} />}
    />
  );
}
