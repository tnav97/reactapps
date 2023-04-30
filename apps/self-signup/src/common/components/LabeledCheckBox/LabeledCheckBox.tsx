import React from 'react';
import FormControlLabel, {
  FormControlLabelProps,
} from '@mui/material/FormControlLabel';
import { makeStyles } from '@mui/styles';
import Checkbox from '@mui/material/Checkbox';
import { StyleVariables } from '@alcumus/components';

export interface LabeledCheckBoxProps
  extends Omit<FormControlLabelProps, 'label' | 'control'> {
  children?: React.ReactNode;
  labelClassName?: string;
  'data-testid'?: string;
}

const useStyles = makeStyles(() => ({
  checkBoxUnchecked: {
    color: StyleVariables.colors.icon.default,
    padding: 0,
    borderRadius: '0',
    marginRight: '0.6rem',
  },
  checkBoxChecked: {
    color: StyleVariables.colors.interactive.default,
  },

  formControlLabel: {
    alignItems: 'flex-start',
    marginLeft: 0,
  },
}));

function LabeledCheckBox(
  {
    name,
    labelClassName,
    children,
    onChange,
    checked = false,
    'data-testid': testId,
    ...props
  }: LabeledCheckBoxProps,
  ref
) {
  const classes = useStyles();
  const formControlLabelControl = (
    <Checkbox
      name={name}
      color="default"
      disableRipple
      disableFocusRipple
      classes={{
        root: classes.checkBoxUnchecked,
        checked: classes.checkBoxChecked,
      }}
      checked={checked}
      onChange={onChange}
      inputRef={ref}
      data-testid={testId}
    />
  );
  return (
    <FormControlLabel
      control={formControlLabelControl}
      label={children}
      classes={{ label: labelClassName, root: classes.formControlLabel }}
      {...props}
    />
  );
}

export default React.forwardRef(LabeledCheckBox);
