import React from 'react';
import makeStyles from '@mui/styles/makeStyles';
import StyleVariables from '../../styles/variables';
import clsx from 'clsx';
const useStyles = makeStyles({
  label: {
    color: StyleVariables.colors.text.default,
    fontSize: StyleVariables.fonts.size.small,
  },
  asterisk: { color: StyleVariables.colors.text.critical, marginLeft: '2px' },
});

export interface LabelProps {
  required?: boolean;
  label: string;
  className?: string;
}
export default function Label({ label, required, className }: LabelProps) {
  const classes = useStyles();
  let asterisk;
  if (required) {
    asterisk = (
      <span className={classes.asterisk} data-testid="asterisk">
        *
      </span>
    );
  }
  return (
    <div className={clsx(classes.label, className)} data-testid="inputLabel">
      {label}
      {asterisk}
    </div>
  );
}
