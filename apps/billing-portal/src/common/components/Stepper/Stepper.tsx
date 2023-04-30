import React from 'react';
import {
  Step,
  Stepper as StepperBase,
  StepLabel,
  StepperProps as StepperBaseProps,
  StepConnector,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { StepIcon } from './StepIcon';
import { StyleVariables } from '@alcumus/components';
import { getDataTestId } from './getDataTestId';

export interface StepperProps extends Omit<StepperBaseProps, 'children'> {
  activeStep?: number;
  steps?: Array<string>;
}
const labelStyles = {
  color: StyleVariables.colors.text.default,
  fontWeight: 400,
  fontSize: StyleVariables.fonts.size.regular,
  lineHeight: '1.5rem',
};
const useStyles = makeStyles({
  connector: {
    borderTopWidth: '2px',
    borderColor: StyleVariables.colors.border.default,
  },
  iconContainer: {
    marginTop: '2px',
  },
  stepConnector: {
    left: 'calc(-50% + 9px)',
    right: 'calc(50% + 9px)',
    position: 'absolute',
  },
  stepperBase: {
    width: '100%',
    backgroundColor: 'inherit',
  },
  label: {
    ...labelStyles,
    '&$active': labelStyles,
    '&$completed': labelStyles,
  },
  active: labelStyles,
  completed: labelStyles,
  root: {
    padding: 0,
  },
});

export default function Stepper({ activeStep, steps, ...rest }: StepperProps) {
  const classes = useStyles();
  const connector = (
    <StepConnector
      classes={{
        lineHorizontal: classes.connector,
        alternativeLabel: classes.stepConnector,
      }}
    />
  );

  return (
    <StepperBase
      activeStep={activeStep || 0}
      alternativeLabel
      connector={connector}
      {...rest}
      className={classes.stepperBase}
      data-testid="stepperBase"
      classes={{ root: classes.root }}
    >
      {steps?.map((step, index) => (
        <Step
          key={index}
          data-testid={getDataTestId(index, activeStep as number)}
        >
          <StepLabel
            StepIconComponent={StepIcon}
            classes={{
              iconContainer: classes.iconContainer,
              label: classes.label,
              active: classes.active,
              completed: classes.completed,
            }}
          >
            {step}
          </StepLabel>
        </Step>
      ))}
    </StepperBase>
  );
}
