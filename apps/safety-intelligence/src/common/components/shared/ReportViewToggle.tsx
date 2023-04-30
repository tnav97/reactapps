import React from 'react';
import { atom, useRecoilState } from 'recoil';
import { createStyles, makeStyles, withStyles } from '@mui/styles';
import { Box, Grid } from '@mui/material';
import { ToggleButton, ToggleButtonGroup } from '@mui/lab';
import { TFunction } from 'i18next';
import { withTranslation } from 'react-i18next';
import { StyleVariables, Text } from '@alcumus/components';
import SingleSelectDropdown, { MenuItems } from './SingleSelectDropdown';

export interface ToggleButtonProps {
  showCount?: boolean;
  showDropdown?: boolean;
  t: TFunction;
}
const useStyles = makeStyles((theme) =>
  createStyles({
    formControl: {
      marginRight: theme.spacing(1),
      minWidth: 143,
    },
    icon: {
      fontSize: StyleVariables.fonts.size.h1,
    },
  })
);

const StyledToggleButton = withStyles({
  root: {
    '&$selected': {
      color: StyleVariables.colors.action.primary.default,
      backgroundColor: StyleVariables.colors.white,
      '&:hover': {
        backgroundColor: StyleVariables.colors.grey2,
      },
      '&:active': {
        backgroundColor: StyleVariables.colors.surface.selected,
      },
    },
    '&:hover': {
      backgroundColor: StyleVariables.colors.grey2,
    },
    '&:active': {
      backgroundColor: StyleVariables.colors.surface.selected,
    },
  },
  selected: {},
})(ToggleButton);

const StyledGroupButton = withStyles({
  grouped: {
    border: 'none',
    padding: '4px',
  },
})(ToggleButtonGroup);

export const tableTileViewSwitcherState = atom<string>({
  key: 'tableTileViewSwitcherState',
  default: 'table',
});

export const recordTypeSwitcherState = atom<string>({
  key: 'recordTypeSwitcherState',
  default: 'all',
});

export const recordCountTableState = atom<number>({
  key: 'recordCountTableState',
  default: 0,
});

export enum ReportSwitcherTypes {
  All = 'all',
  Looks = 'looks',
  Folders = 'folders',
  Dashboards = 'dashboards',
}

function ReportViewToggle({
  showCount = true,
  showDropdown = true,
  t,
}: ToggleButtonProps) {
  const [toggle, setToggle] = useRecoilState(tableTileViewSwitcherState);
  const [type, setType] = useRecoilState(recordTypeSwitcherState);
  const [count] = useRecoilState(recordCountTableState);

  const classes = useStyles();

  const handleToggle = (event, newView) => {
    if (newView !== null) {
      setToggle(newView);
    }
  };

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setType(event.target.value as string);
  };
  const menuItems: MenuItems[] = [
    {
      value: ReportSwitcherTypes.All,
      displayName: t('allType', { ns: 'translation' }),
    },
    {
      value: ReportSwitcherTypes.Folders,
      displayName: t('folders', { ns: 'translation' }),
    },
    {
      value: ReportSwitcherTypes.Dashboards,
      displayName: t('dashboards', { ns: 'translation' }),
    },
    {
      value: ReportSwitcherTypes.Looks,
      displayName: t('looks', { ns: 'translation' }),
    },
  ];

  return (
    <Grid
      container
      direction="row"
      justifyContent="space-between"
      alignItems="center"
    >
      <Grid item>
        <Box
          display="flex"
          alignItems="center"
          flexDirection="column"
          data-testid="resultsCount"
        >
          {!!showCount && (
            <Text>
              {count} {t('results', { ns: 'translation' })}
            </Text>
          )}
        </Box>
      </Grid>
      <Grid item>
        <Box display="flex" alignItems="center" flexDirection="row">
          {showDropdown && (
            <SingleSelectDropdown
              value={type}
              id="single-select-dropdown"
              handleChange={handleChange}
              formControlClassName={classes.formControl}
            >
              {menuItems}
            </SingleSelectDropdown>
          )}
          <StyledGroupButton
            value={toggle}
            exclusive
            onChange={handleToggle}
            aria-label={t('viewToggle', { ns: 'AriaLabels' })}
          >
            <StyledToggleButton
              value="table"
              aria-label={t('tableView', { ns: 'AriaLabels' })}
              data-testid="tableView"
              disableRipple
            >
              <span className="material-icons">format_list_bulleted</span>
            </StyledToggleButton>
            <StyledToggleButton
              value="tile"
              aria-label={t('tileView', { ns: 'AriaLabels' })}
              data-testid="tileView"
              disableRipple
            >
              <span className="material-icons">grid_view</span>
            </StyledToggleButton>
          </StyledGroupButton>
        </Box>
      </Grid>
    </Grid>
  );
}

export default withTranslation(['translation', 'AriaLabels'])(ReportViewToggle);
