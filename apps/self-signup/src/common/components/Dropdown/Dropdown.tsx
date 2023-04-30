import { useStateFromInput } from '@alcumus/hooks';
import { Divider, Menu, MenuItem, Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';
import clsx from 'clsx';
import React, { useCallback, useRef, useState } from 'react';
import { Button, Input, StyleVariables } from '@alcumus/components';

export interface DropdownProps {
  width?: string;
  value?: string;
  options: Array<string>;
  onSelect: (value: string) => void;
  customValueLabel?: string;
  customValueSubmitButtonText?: string;
  onCustomValue?: (value: string) => void;
  'data-testid'?: string;
  classes?: {
    menu?: string;
  };
}

const useStyles = makeStyles((theme: Theme) => ({
  dropdown: {
    display: 'inline-block',
    margin: '0',
    cursor: 'pointer',
    position: 'relative',
    height: '1rem',
  },
  emptyDropdown: {
    width: '300px',
  },
  empty: {
    display: 'block',
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    borderBottom: '2px solid',
    borderBottomColor: StyleVariables.colors.action.primary.default,
  },
  value: {
    color: StyleVariables.colors.action.primary.default,
  },
  menu: {
    marginTop: '0.5rem',
    '& .MuiMenu-paper': {
      minWidth: '300px',
    },
    '& .MuiMenuItem-root': {
      fontFamily: 'inherit',
      [theme.breakpoints.down('xs')]: {
        fontSize: '0.8rem',
      },
    },
  },
  menuFooter: {
    padding: '6px 16px',
    '& .label': {
      fontSize: '0.8rem',
    },
  },
  button: {
    marginTop: '12px',
    fontSize: '0.8rem',
    fontWeight: 500,
  },
  customValueLabel: {
    [theme.breakpoints.down('xs')]: {
      fontSize: '0.8rem',
    },
  },
  divider: {
    marginBottom: '16px',
  },
}));

export default function Dropdown({
  value,
  options = [],
  onCustomValue,
  customValueLabel,
  customValueSubmitButtonText = 'Submit',
  onSelect,
  classes: propClasses,
  'data-testid': dataTestId,
}: DropdownProps) {
  const classes = useStyles();
  const anchorEl = useRef(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [inputValue, handleInputValueChange, setInputValue] =
    useStateFromInput('');

  const handleDropdownOpen = (event) => {
    anchorEl.current = event.currentTarget;
    setIsOpen(true);
  };

  const handleOptionSelect = useCallback(
    (option) => {
      setIsOpen(false);
      onSelect(option);
    },
    [onSelect]
  );

  const handleClose = () => setIsOpen(false);

  const handleCustomValueSubmit = useCallback(() => {
    setIsOpen(false);
    if (onCustomValue) {
      onCustomValue(inputValue);
      setInputValue('');
    }
  }, [inputValue, onCustomValue]);

  return (
    <div
      className={clsx(classes.dropdown, { [classes.emptyDropdown]: !value })}
    >
      <div
        ref={anchorEl}
        className={clsx(value ? classes.value : classes.empty)}
        onClick={handleDropdownOpen}
        data-testid={dataTestId}
      >
        {value}
      </div>
      <Menu
        open={isOpen}
        anchorEl={anchorEl.current}
        getContentAnchorEl={null}
        elevation={2}
        keepMounted
        className={clsx(classes.menu, propClasses?.menu)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'left' }}
        onClose={handleClose}
      >
        {options.map((option, index) => (
          <MenuItem
            key={index}
            selected={option === value}
            onClick={() => handleOptionSelect(option)}
            data-testid={`dropdown-option-${option}`}
          >
            {option}
          </MenuItem>
        ))}
        {onCustomValue && (
          <div
            className={classes.menuFooter}
            /*
            The stopPropagation() method prevents propagation of the same event from being called.
            Propagation means bubbling up to parent elements or capturing down to child elements.
            This is necessary to enter any custom value in the Input field below.
            */
            onKeyDown={(e) => e.stopPropagation()}
          >
            <Divider className={classes.divider} />
            <Input
              data-testid={dataTestId?.concat('-', 'custom-value-input')}
              label={customValueLabel}
              value={inputValue}
              onChange={handleInputValueChange}
              maxLength={255}
              labelClassName={classes.customValueLabel}
            />
            <Button
              size="small"
              data-testid={dataTestId?.concat('-', 'submit-button')}
              className={classes.button}
              rounded
              onClick={() => handleCustomValueSubmit()}
              disabled={!inputValue}
            >
              {customValueSubmitButtonText}
            </Button>
          </div>
        )}
      </Menu>
    </div>
  );
}
