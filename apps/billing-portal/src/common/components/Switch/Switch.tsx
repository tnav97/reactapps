import React from 'react';
import {
  Switch as SwitchComponent,
  SwitchProps as SwitchComponentProps,
  Box,
  Theme,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { StyleVariables, Text } from '@alcumus/components';
import clsx from 'clsx';
const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: 44,
    height: 24,
    padding: 0,
    display: 'flex',
    [theme.breakpoints.down('xs')]: {
      height: 18,
    },
  },
  switchBase: {
    padding: '2px 4px',
    color: StyleVariables.colors.interactive.default,
    '&:hover': { backgroundColor: StyleVariables.colors.surface.selected },
    '&$checked': {
      color: StyleVariables.colors.interactive.default,
      padding: '2px 4px',
      transform: 'translateX(16px)',
      '&:hover': { backgroundColor: StyleVariables.colors.surface.selected },
      '& + $track': {
        opacity: 1,
        backgroundColor: StyleVariables.colors.surface.selected,
      },
    },
    [theme.breakpoints.down('xs')]: {
      '&$checked': {
        color: StyleVariables.colors.interactive.default,
        padding: '2px 4px',
        transform: 'translateX(22px)',
        '&:hover': { backgroundColor: StyleVariables.colors.surface.selected },
        '& + $track': {
          opacity: 1,
          backgroundColor: StyleVariables.colors.surface.selected,
        },
      },
    },
  },
  thumb: {
    width: 20,
    height: 20,
    boxShadow: 'none',
    [theme.breakpoints.down('xs')]: {
      width: 14,
      height: 14,
    },
  },
  track: {
    borderRadius: 16,
    opacity: 1,
    backgroundColor: StyleVariables.colors.surface.selected,
  },
  checked: {},
  leftLabel: {
    marginRight: '0.5rem',
  },
  rightLabel: {
    marginLeft: '0.5rem',
  },
  labelFont: {
    fontWeight: StyleVariables.fonts.weight.medium,
    color: StyleVariables.colors.text.default,
    fontSize: StyleVariables.fonts.size.h6,
    [theme.breakpoints.down('xs')]: {
      fontSize: StyleVariables.fonts.mobile.size.h6,
    },
  },
}));

export interface SwitchProps extends Omit<SwitchComponentProps, 'onChange'> {
  onChange: (value: boolean) => void;
  leftLabel?: string;
  rightLabel?: string;
  className?: string;
}

export default function Switch({
  onChange,
  leftLabel,
  rightLabel,
  className,
  ...rest
}: SwitchProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.checked);
  };

  const classes = useStyles();

  return (
    <Box
      display="flex"
      flexDirection="horizontal"
      alignItems="center"
      className={className}
    >
      {leftLabel && (
        <Text
          as="h6"
          className={clsx(classes.labelFont, classes.leftLabel)}
          data-testid="leftLabel"
        >
          {leftLabel}
        </Text>
      )}
      <SwitchComponent
        disableRipple
        onChange={handleChange}
        classes={{
          root: classes.root,
          switchBase: classes.switchBase,
          thumb: classes.thumb,
          track: classes.track,
          checked: classes.checked,
        }}
        data-testid="switchComponent"
        {...rest}
      />
      {rightLabel && (
        <Text
          as="h6"
          className={clsx(classes.labelFont, classes.rightLabel)}
          data-testid="rightLabel"
        >
          {rightLabel}
        </Text>
      )}
    </Box>
  );
}
