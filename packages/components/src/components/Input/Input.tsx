import makeStyles from '@mui/styles/makeStyles';
import clsx from 'clsx';
import React, { ReactNode, useCallback, useEffect } from 'react';
import { useStateFromInput } from '@alcumus/hooks';
import styleVariables from '../../styles/variables';
import { useDebouncedCallback } from 'use-debounce';
import { Add, Remove } from '@mui/icons-material';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  labelClassName?: string;
  tooltip?: string;
  adornment?: ReactNode;
  hint?: string;
  state?: 'default' | 'error';
  debounceInterval?: number;
  isValid?: boolean;
  required?: boolean;
  helperText?: string;
  showIncrementButtons?: boolean;
  adornmentClassName?: string;
  /**
   * When using showIncrementButtons=true, this callback
   * is called when either of the buttons is clicked.
   *
   * This is necessary because we cannot fire an onChange
   * event on the Input if we change the state value internally.
   *
   * Therefore, it is upto the consumers to implement this callback
   * and update **their** local state values.
   *
   * @param value
   */
  onIncrementButtonClick?: (increment: number) => void;
}

interface StyleProps {
  state: 'default' | 'error';
}

const useStyles = makeStyles({
  wrapper: {
    fontFamily: styleVariables.fonts.family.heading,
    lineHeight: styleVariables.fonts.lineHeight.regular,
    fontSize: styleVariables.fonts.size.regular,
  },
  label: {
    fontSize: styleVariables.fonts.size.small,
    marginBottom: styleVariables.spacing(0.5),
  },
  tooltip: {
    marginTop: styleVariables.spacing(1.5),
    fontSize: styleVariables.fonts.size.small,
    lineHeight: styleVariables.fonts.lineHeight.small,
    padding: `${styleVariables.spacing(1)} ${styleVariables.spacing(2)}`,
    borderRadius: styleVariables.spacing(1),
    backgroundColor: styleVariables.colors.surface.neutral.default,
  },
  hint: {
    marginTop: styleVariables.spacing(0.5),
    fontSize: styleVariables.fonts.size.small,
    lineHeight: styleVariables.fonts.lineHeight.small,
    color: (props: StyleProps) =>
      props.state === 'error'
        ? styleVariables.colors.text.critical
        : styleVariables.colors.text.subdued,
  },
  input: {
    height: '40px',
    fontFamily: styleVariables.fonts.family.heading,
    fontWeight: styleVariables.fonts.weight.regular,
    fontSize: styleVariables.fonts.size.regular,
    padding: `${styleVariables.spacing(1)} ${styleVariables.spacing(1.5)}`,
    borderRadius: styleVariables.spacing(1),
    border: '1px solid',
    borderColor: (props: StyleProps) =>
      props.state === 'error'
        ? styleVariables.colors.border.critical
        : styleVariables.colors.border.default,
    outline: 'none',
    position: 'relative',
    width: '100%',
    boxSizing: 'border-box',
    '&::placeholder': {
      color: styleVariables.colors.text.subdued,
      fontFamily: styleVariables.fonts.family.heading,
      fontSize: styleVariables.fonts.size.regular,
    },
    '&:focus': {
      borderColor: (props: StyleProps) =>
        props.state === 'error'
          ? styleVariables.colors.border.critical
          : styleVariables.colors.border.active,
    },
  },
  validInput: {
    // Todo: clarify valid input state
    // backgroundColor: styleVariables.colors.text.success,
  },
  inputAdornment: {
    position: 'absolute',
    right: '0',
    bottom: '0',
    padding: `${styleVariables.spacing(1)} ${styleVariables.spacing(
      2
    )} ${styleVariables.spacing(1)} ${styleVariables.spacing(1)}`,
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  withAdornment: {
    paddingRight: '38px',
  },
  labelWrapper: {
    position: 'relative',
    width: '100%',
    display: 'block',
  },
  inputWrapper: {
    display: 'flex',
    width: '100%',
  },
  inputWithIncrementButtons: {
    borderRadius: 0,
    textAlign: 'center',
  },
  incrementButton: {
    borderRadius: styleVariables.spacing(1),
    border: '1px solid',
    borderColor: (props: StyleProps) =>
      props.state === 'error'
        ? styleVariables.colors.border.critical
        : styleVariables.colors.border.default,
    outline: 'none',
    background: styleVariables.colors.surface.default,
    color: styleVariables.colors.text.subdued,
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
  },
  incrementButtonLeft: {
    borderRightWidth: 0,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
  },
  incrementButtonRight: {
    borderLeftWidth: 0,
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
  },
  helperText: {
    color: styleVariables.colors.text.subdued,
    fontSize: styleVariables.fonts.size.small,
    marginTop: styleVariables.spacing(0.5),
  },
  asterisk: { color: styleVariables.colors.text.critical, marginLeft: '2px' },
});

function Input(
  {
    label,
    placeholder,
    tooltip,
    value = '',
    onChange,
    adornment,
    adornmentClassName,
    hint,
    state = 'default',
    debounceInterval,
    labelClassName,
    isValid,
    type,
    required,
    helperText,
    className,
    showIncrementButtons,
    onIncrementButtonClick,
    ...props
  }: InputProps,
  ref
) {
  const classes = useStyles({ state });

  const [innerValue, handleInnerValueChange, setInnerValue] = useStateFromInput(
    value as string
  );

  useEffect(() => {
    if (value !== innerValue) {
      setInnerValue(value as string);
    }
  }, [value]);

  const fireOnChange = useCallback(
    (event) => {
      if (onChange) {
        onChange(event);
      }
    },
    [onChange]
  );

  const debouncedHandleOnChange = useDebouncedCallback(
    fireOnChange,
    debounceInterval || 0
  );

  const handleOnChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      event.persist();
      handleInnerValueChange(event);
      if (debounceInterval) {
        debouncedHandleOnChange(event);
      } else {
        fireOnChange(event);
      }
    },
    [
      fireOnChange,
      handleInnerValueChange,
      debounceInterval,
      debouncedHandleOnChange,
    ]
  );
  let asterisk;
  if (required) {
    asterisk = (
      <span className={classes.asterisk} data-testid="asterisk">
        *
      </span>
    );
  }

  const showNumberIncrementButtons = type === 'number' && showIncrementButtons;

  return (
    <div className={classes.wrapper}>
      <label className={classes.labelWrapper}>
        {label && (
          <div className={clsx(classes.label, labelClassName as string)}>
            {label}
            {asterisk}
          </div>
        )}

        <div className={classes.inputWrapper}>
          {showNumberIncrementButtons && (
            <button
              data-testid="decrementBtn"
              className={clsx(
                classes.incrementButton,
                classes.incrementButtonLeft
              )}
              onClick={
                props.disabled
                  ? undefined
                  : () => onIncrementButtonClick && onIncrementButtonClick(-1)
              }
            >
              <Remove />
            </button>
          )}
          <input
            className={clsx([
              className,
              classes.input,
              isValid && classes.validInput,
              adornment && classes.withAdornment,
              showNumberIncrementButtons && classes.inputWithIncrementButtons,
            ])}
            value={innerValue}
            placeholder={placeholder}
            ref={ref}
            onChange={handleOnChange}
            type={type}
            {...props}
          />
          {showNumberIncrementButtons && (
            <button
              data-testid="incrementBtn"
              className={clsx(
                classes.incrementButton,
                classes.incrementButtonRight
              )}
              onClick={
                props.disabled
                  ? undefined
                  : () => onIncrementButtonClick && onIncrementButtonClick(1)
              }
            >
              <Add />
            </button>
          )}
        </div>

        {adornment && (
          <div
            className={clsx([classes.inputAdornment, adornmentClassName])}
            data-testid="input-adornment"
          >
            {adornment}
          </div>
        )}
      </label>
      {hint && (
        <div data-testid="input-hint" className={classes.hint}>
          {hint}
        </div>
      )}
      {tooltip && (
        <div data-testid="input-tooltip" className={classes.tooltip}>
          {tooltip}
        </div>
      )}
      {helperText && (
        <div className={classes.helperText} data-testid="helperText">
          {helperText}
        </div>
      )}
    </div>
  );
}

export default React.forwardRef<HTMLInputElement, InputProps>(Input);
