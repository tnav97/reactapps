import { atom, useRecoilState } from 'recoil';
import ToggleButton from '@mui/lab/ToggleButton';
import ToggleButtonGroup from '@mui/lab/ToggleButtonGroup';
import React from 'react';
import { makeStyles } from '@mui/styles';
import { StyleVariables } from '@alcumus/components';
import { TFunction } from 'i18next';
import { withTranslation } from 'react-i18next';
import { ReportElementTypes } from '../../../domain/reportElementTypes';

export const reportTypeSwitchState = atom<ReportElementTypes>({
  key: 'reportTypeSwitchState',
  default: ReportElementTypes.Dashboard,
});

interface Props {
  t: TFunction;
}

const useStyles = makeStyles({
  toggleText: {
    fontFamily: StyleVariables.fonts.family.body,
    fontHeight: StyleVariables.fonts.lineHeight.smaller,
    letterSpacing: StyleVariables.fonts.letterSpacing.regular,
    textTransform: 'capitalize',
    height: 32,
    fontWeight: StyleVariables.fonts.weight.semiBold,
    lineHeight: StyleVariables.fonts.lineHeight.small,
    color: StyleVariables.colors.black,
    '&:focus': {
      color: StyleVariables.colors.white,
      backgroundColor: StyleVariables.colors.action.primary.default,
    },
    '&:active': {
      color: StyleVariables.colors.white,
      backgroundColor: StyleVariables.colors.action.primary.default,
    },
    '&$selected': {
      color: StyleVariables.colors.white,
      backgroundColor: StyleVariables.colors.action.primary.default,
      '&:hover': {
        color: StyleVariables.colors.white,
        backgroundColor: StyleVariables.colors.action.primary.default,
      },
    },
  },
  lookToggleText: {
    width: 70,
  },
  dashboardToggleText: {
    width: 108,
  },
  selected: {},
  buttonGroup: {
    height: '32px',
    '& > button:first-child': {
      borderTopLeftRadius: '8px',
      borderBottomLeftRadius: '8px',
    },
    '& > button:last-child': {
      borderTopRightRadius: '8px',
      borderBottomRightRadius: '8px',
    },
  },
});

function ReportTypeToggle({ t }: Props) {
  const [toggle, setToggle] = useRecoilState(reportTypeSwitchState);
  const classes = useStyles();

  const handleToggle = (event, newView) => {
    if (newView !== null) {
      setToggle(newView);
    }
  };

  return (
    <ToggleButtonGroup
      value={toggle}
      exclusive
      onChange={handleToggle}
      aria-label={t('reportToggle', { ns: 'AriaLabels' })}
      className={classes.buttonGroup}
    >
      <ToggleButton
        classes={{
          root: `${classes.dashboardToggleText} ${classes.toggleText}`,
          selected: classes.selected,
        }}
        value={ReportElementTypes.Dashboard}
        aria-label={t('dashboardReport', { ns: 'AriaLabels' })}
        data-testid="dashboardToggle"
      >
        <div>{t('dashboards', { ns: 'translation' })}</div>
      </ToggleButton>
      <ToggleButton
        classes={{
          root: `${classes.lookToggleText} ${classes.toggleText}`,
          selected: classes.selected,
        }}
        value={ReportElementTypes.Look}
        aria-label={t('lookReport', { ns: 'AriaLabels' })}
        data-testid="lookToggle"
      >
        <div>{t('looks', { ns: 'translation' })}</div>
      </ToggleButton>
    </ToggleButtonGroup>
  );
}

export default withTranslation(['translation', 'AriaLabels'])(ReportTypeToggle);
