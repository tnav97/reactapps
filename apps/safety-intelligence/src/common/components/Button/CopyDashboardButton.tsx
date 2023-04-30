import {
  StyleVariables,
  Text,
  Button as BaseButton,
} from '@alcumus/components';
import { makeStyles } from '@mui/styles';
import React from 'react';
import { useSetRecoilState } from 'recoil';
import { TFunction } from 'i18next';
import { withTranslation } from 'react-i18next';
import Analytics from '@alcumus/analytics-package';
import { copyDashboardModalVisibleState } from '../Modals/CopyDashboardModal';

interface Props {
  t: TFunction;
}

const useStyles = makeStyles(() => ({
  buttonBase: {
    borderRadius: 100,
    padding: '6px 16px',
  },
  buttonText: {
    fontWeight: StyleVariables.fonts.weight.semiBold,
    lineHeight: StyleVariables.fonts.lineHeight.h6,
  },
}));

function CopyDashboardButton({ t }: Props) {
  const classes = useStyles();
  const setCopyDashboardModalVisible = useSetRecoilState(
    copyDashboardModalVisibleState
  );
  const onClick = () => {
    setCopyDashboardModalVisible(true);
    Analytics.getInstance().trackWithCategory(
      'Dashboards',
      'Copied a dashboard'
    );
  };
  return (
    <BaseButton
      aria-label={t('duplicateDashboard', { ns: 'AriaLabels' })}
      uppercase={false}
      rounded
      className={classes.buttonBase}
      size="small"
      onClick={onClick}
      data-testid="copy-dashboard-button"
    >
      <Text center className={classes.buttonText}>
        {t('duplicateDashboardButton', { ns: 'translation' })}
      </Text>
    </BaseButton>
  );
}

export default withTranslation(['translation', 'AriaLabels'])(
  CopyDashboardButton
);
