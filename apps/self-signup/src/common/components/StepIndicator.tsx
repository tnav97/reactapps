import { makeStyles } from '@mui/styles';
import clsx from 'clsx';
import { range } from 'lodash';
import React from 'react';
import { StyleVariables } from '@alcumus/components';

export interface StepIndicatorProps {
  total: number;
  current: number;
  className?: string;
}

const useStyles = makeStyles({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  dot: {
    width: '12px',
    height: '12px',
    borderRadius: '50%',
    margin: '10px',
    backgroundColor: StyleVariables.colors.border.default,
  },
  dotFilled: {
    backgroundColor: StyleVariables.colors.action.primary.default,
  },
});

export default function StepIndicator({
  total,
  current,
  className,
}: StepIndicatorProps) {
  const classes = useStyles();

  return (
    <div className={clsx([classes.container, className])}>
      {range(total).map((index) => (
        <div
          key={index}
          className={clsx([
            classes.dot,
            index + 1 <= current && classes.dotFilled,
          ])}
        ></div>
      ))}
    </div>
  );
}
