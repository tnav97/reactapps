import IconButton from '@mui/material/IconButton';
import { makeStyles } from '@mui/styles';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import React, { useCallback, useState } from 'react';
import {
  Input,
  InputProps,
  StyleVariables,
  Stepper as PasswordStrengthMeter,
} from '@alcumus/components';

export interface PasswordProps
  extends Omit<InputProps, 'type' | 'adornment' | 'tooltip'> {
  tooltip?: React.ReactNode;
  score?: number;
  threshold?: number;
}

const useStyles = makeStyles(() => ({
  doneAdornment: {
    color: StyleVariables.colors.text.success,
  },
  visibilityAdornment: {
    color: StyleVariables.colors.text.subdued,
  },
  passwordVisibilityToggle: {
    padding: 0,
  },
  passwordStrength: {
    marginTop: '0.75rem',
  },
  tooltip: {
    marginTop: StyleVariables.spacing(1.5),
    fontSize: StyleVariables.fonts.size.small,
    lineHeight: StyleVariables.fonts.lineHeight.small,
    padding: `${StyleVariables.spacing(1)} ${StyleVariables.spacing(2)}`,
    borderRadius: StyleVariables.spacing(1),
    backgroundColor: StyleVariables.colors.surface.neutral?.disabled,
  },
}));

function PasswordField(
  { value, tooltip, score = 0, threshold = 4, ...props }: PasswordProps,
  ref
) {
  const classes = useStyles();
  const [isPasswordVisible, setIsPasswordVisible] = useState<Boolean>(false);

  const handleIsPasswordVisibleChange = useCallback(() => {
    setIsPasswordVisible(!isPasswordVisible);
  }, [isPasswordVisible]);

  return (
    <div>
      <Input
        type={isPasswordVisible ? 'text' : 'password'}
        ref={ref}
        value={value}
        isValid={score >= threshold}
        adornment={
          !!value && (
            <IconButton
              className={classes.passwordVisibilityToggle}
              onClick={handleIsPasswordVisibleChange}
            >
              {isPasswordVisible ? (
                <Visibility className={classes.visibilityAdornment} />
              ) : (
                <VisibilityOff className={classes.visibilityAdornment} />
              )}
            </IconButton>
          )
        }
        {...props}
      />
      <div className={classes.passwordStrength}>
        <PasswordStrengthMeter
          steps={4}
          activeStep={score}
          activeColor={
            score < threshold ? StyleVariables.colors.icon.critical : undefined
          }
        />
      </div>
      {tooltip && (
        <div data-testid="password-tooltip" className={classes.tooltip}>
          {tooltip}
        </div>
      )}
    </div>
  );
}

export default React.forwardRef<HTMLInputElement, PasswordProps>(PasswordField);
