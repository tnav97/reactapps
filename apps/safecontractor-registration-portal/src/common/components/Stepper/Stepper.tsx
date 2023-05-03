import React from 'react';
import { StyleVariables } from '@alcumus/components';
import makeStyles from '@mui/styles/makeStyles';
import Typography from '@mui/material/Typography';
import clsx from 'clsx';
import { createTheme} from '@mui/material';
interface StepperSection {
  count?: number;
}
const Breakpoints = createTheme().breakpoints;
const useStyles = makeStyles((theme) => ({
  stepper: {
    width: '8px',
    height: '8px',
    marginRight: '8px',
    borderRadius: '8px',
  },
  stepperTrue: {
    backgroundColor: StyleVariables.colors.base.primary,
  },
  stepperFalse: {
    backgroundColor: StyleVariables.colors.action.secondary.hover,
  },
  ellipsis: {
    marginTop: '30px',
    display: 'flex',
    justifyContent: 'center',
    [Breakpoints.down('md')]: {
      marginTop: '24px',
    },
  },
}));
export default function StepperSection(stepperSectionProps: StepperSection) {
  const classes = useStyles();
  const stepper = [false, false, false, false, false];
  if (stepperSectionProps?.count) {
    for (let i = 0; i < stepperSectionProps?.count; i++) {
      stepper[i] = true;
    }
  }
  return (
    <div className={classes.ellipsis}>
      {stepper.map((e, index) =>
        e ? (
          <Typography
            key={index}
            className={clsx(classes.stepperTrue, classes.stepper)}
          ></Typography>
        ) : (
          <Typography
            key={index}
            className={clsx(classes.stepperFalse, classes.stepper)}
          ></Typography>
        )
      )}
    </div>
  );
}
