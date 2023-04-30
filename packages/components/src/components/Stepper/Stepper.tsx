import React from 'react';
import makeStyles from '@mui/styles/makeStyles';
import clsx from 'clsx';
import { StyleVariables } from '../../index';

export interface StepperProps extends React.HTMLAttributes<HTMLDivElement> {
  steps: number;
  activeStep?: number;
  activeColor?: string;
  inactiveColor?: string;
}
const useStyles = makeStyles({
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    '& div:nth-child(n)': {
      marginTop: 0,
      marginBottom: 0,
    },
    '& div:first-child': {
      marginRight: '4px',
    },
    '& div:last-child': {
      marginLeft: '4px',
    },
    '& div:not(:last-child):not(:first-child)': {
      marginLeft: '4px',
      marginRight: '4px',
    },
  },
  spot: {
    height: '8px',
    width: ({ steps }: StepperProps) => String(100 / steps) + '%',
    borderRadius: '15px',
  },
  spotInactiveColor: ({ inactiveColor }: StepperProps) => ({
    backgroundColor: inactiveColor || StyleVariables.colors.border.default,
  }),
  spotActiveColor: ({ activeColor }: StepperProps) => ({
    backgroundColor: activeColor || StyleVariables.colors.icon.success,
  }),
});

export default function Stepper({
  steps,
  activeStep = 0,
  activeColor,
  inactiveColor,
  className,
  ...res
}: StepperProps) {
  const classes = useStyles({ steps, activeColor, inactiveColor });
  const renderedSpots: Array<React.ReactNode> = [];

  for (let index = 1; index <= steps; index++) {
    renderedSpots.push(
      <div
        key={index}
        className={clsx([
          className,
          classes.spot,
          index <= activeStep
            ? classes.spotActiveColor
            : classes.spotInactiveColor,
        ])}
        data-testid={index <= activeStep ? 'active' : 'inactive'}
      />
    );
  }
  return (
    <div
      className={clsx(classes.container, classes['&div:first-child'])}
      {...res}
    >
      {renderedSpots}
    </div>
  );
}
