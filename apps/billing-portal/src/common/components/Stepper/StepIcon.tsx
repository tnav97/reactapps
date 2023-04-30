import React from 'react';
import { StepIconProps } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { StyleVariables } from '@alcumus/components';
import clsx from 'clsx';

const useStyles = makeStyles({
  outerCircle: {
    width: '22px',
    height: '22px',
    borderRadius: '50%',
    backgroundColor: StyleVariables.colors.border.default,
    zIndex: 1,
    position: 'relative',
  },
  innerCircle: {
    width: '18px',
    height: '18px',
    borderRadius: '50%',
    borderColor: StyleVariables.colors.surface.default,
    backgroundColor: StyleVariables.colors.surface.default,
    border: '3px solid',
    top: '50%',
    left: '50%',
    position: 'absolute',
    margin: '-9px 0px 0px -9px',
  },
  activeOrCompleted: {
    backgroundColor: StyleVariables.colors.interactive.default,
  },
});

export function StepIcon({ active, completed }: StepIconProps) {
  const classes = useStyles();
  return (
    <>
      <div className={classes.outerCircle}>
        <div
          className={clsx(classes.innerCircle, {
            [classes.activeOrCompleted]: active || completed,
          })}
        />
      </div>
    </>
  );
}
