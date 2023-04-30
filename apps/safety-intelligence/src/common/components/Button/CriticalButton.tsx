import {
  Button as BaseButton,
  StyleVariables,
  Text,
} from '@alcumus/components';
import { makeStyles } from '@mui/styles';
import React from 'react';

interface Props {
  text: string;
  ariaLabel: string;
  onClick?: (e) => void;
  disabled?: boolean;
}
const useStyles = makeStyles(() => ({
  buttonBase: {
    borderRadius: 100,
    padding: '10px 24px',
  },
  buttonText: {
    fontWeight: StyleVariables.fonts.weight.semiBold,
    lineHeight: StyleVariables.fonts.lineHeight.h5,
  },
  root: {
    backgroundColor: StyleVariables.colors.text.critical,
    color: StyleVariables.colors.white,
    textTransform: 'none',
    '&:hover': {
      backgroundColor: StyleVariables.colors.action.critical.hover,
    },
    '&:active': {
      backgroundColor: StyleVariables.colors.action.critical.pressed,
    },
    '&:disabled': {
      opacity: 0.3,
      backgroundColor: StyleVariables.colors.text.critical,
      color: StyleVariables.colors.white,
    },
  },
}));
export function CriticalButton({
  text,
  ariaLabel,
  onClick,
  disabled = false,
}: Props) {
  const classes = useStyles();

  return (
    <BaseButton
      aria-label={ariaLabel}
      uppercase={false}
      rounded
      className={classes.buttonBase}
      size="medium"
      disabled={disabled}
      data-testid="criticalButton"
      classes={{
        root: classes.root,
      }}
      onClick={(e) => onClick && onClick(e)}
    >
      <Text center className={classes.buttonText}>
        {text}
      </Text>
    </BaseButton>
  );
}
