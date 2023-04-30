import { makeStyles } from '@mui/styles';
import { TFunction } from 'i18next';
import React from 'react';
import { Trans } from 'react-i18next';
import ContinueFreeTrialButton from '../../buttons/ContinueFreeTrialButton';
import { ActionPage, StyleVariables } from '@alcumus/components';

const useStyles = makeStyles({
  highlightedText: {
    color: StyleVariables.colors.action.primary.default,
    fontWeight: 600,
  },
});

export default function TrialExtended({ t }: { t: TFunction }) {
  const classes = useStyles();

  return (
    <ActionPage
      pageTitle={t('trialExtended.header')}
      header={
        <Trans key="trialExtended.header">
          Your free trial has been extended by{' '}
          <span className={classes.highlightedText}>7 days!</span>
        </Trans>
      }
      imgSrc="/images/trial_extended.svg"
      imgAlt={t('trialExtended.altText')}
      buttons={<ContinueFreeTrialButton t={t} />}
    />
  );
}
