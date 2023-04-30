import React, { FunctionComponent } from 'react';
import {
  FormControl,
  MenuItem,
  OutlinedInput,
  Select,
} from '@mui/material';
import { StyleVariables } from '@alcumus/components';
import { createStyles, makeStyles } from '@mui/styles';
import { Check, ExpandMore } from '@mui/icons-material';
import clsx from 'clsx';

export interface MenuItems {
  value: string;
  displayName: string;
}

interface DropdownProps {
  value: string;
  id: string;
  children: MenuItems[];
  handleChange?: (e) => void;
  formControlClassName?: string;
  dropdownClassName?: string;
  disabled?: boolean;
  placeholder?: string;
}

const useStyles = makeStyles((theme) =>
  createStyles({
    dropdown: {
      display: 'flex',
      borderRadius: theme.spacing(1),
      height: theme.spacing(4),
    },
    menuItem: {
      justifyContent: 'space-between',
      padding: '8px 12px',
      '&.Mui-selected': {
        backgroundColor: StyleVariables.colors.surface.selected,
        '& svg': {
          display: 'inline',
        },
        '&:hover': {
          backgroundColor: StyleVariables.colors.surface.selected,
        },
      },
      '&:not(.Mui-selected)': {
        '&:focus': {
          backgroundColor: 'transparent',
        },
      },
      '&.MuiInputBase-input': {
        '&:hover': {
          backgroundColor: 'transparent',
        },
      },
      '&:hover': {
        backgroundColor: StyleVariables.colors.grey2,
      },
    },
    icon: {
      color: StyleVariables.colors.grey4,
    },
    checkIcon: {
      color: StyleVariables.colors.interactive.default,
      display: 'none',
    },
    root: {
      boxShadow: `0 2px 8px ${StyleVariables.colors.boxShadowGrey}`,
      borderRadius: theme.spacing(1),
      border: `1px solid ${StyleVariables.colors.border.default}`,
    },
    placeholder: {
      color: StyleVariables.colors.grey4,
    },
  })
);

const useOutlinedInputStyles = makeStyles(() => ({
  root: {
    '&:hover $notchedOutline': {
      border: `1px solid ${StyleVariables.colors.interactive.default}`,
    },
    '&$focused $notchedOutline': {
      border: `1px solid ${StyleVariables.colors.interactive.default}`,
    },
  },
  focused: {},
  notchedOutline: {},
}));

const SingleSelectDropdown: FunctionComponent<DropdownProps> = ({
  value,
  handleChange,
  children,
  id,
  formControlClassName,
  dropdownClassName,
  disabled,
  placeholder,
}: DropdownProps) => {
  const classes = useStyles();
  const outlinedInputClasses = useOutlinedInputStyles();

  const generateMenuItems = (): JSX.Element[] => {
    return children.map((child: MenuItems) => {
      return (
        <MenuItem
          key={child.value}
          value={child.value}
          className={classes.menuItem}
          disableRipple
        >
          {child.displayName}
          <Check className={classes.checkIcon} />
        </MenuItem>
      );
    });
  };
  return (
    <FormControl
      variant="outlined"
      className={formControlClassName}
      disabled={disabled}
    >
      <Select
        id={id}
        value={value}
        onChange={handleChange}
        className={clsx(classes.dropdown, dropdownClassName)}
        input={<OutlinedInput classes={outlinedInputClasses} />}
        IconComponent={ExpandMore}
        inputProps={{
          classes: {
            icon: classes.icon,
            root: classes.menuItem,
          },
          'data-testid': `${id}-input`,
        }}
        MenuProps={{
          anchorOrigin: {
            vertical: 'bottom',
            horizontal: 'left',
          },
          getContentAnchorEl: null,
          classes: {
            paper: classes.root,
          },
          PaperProps: {
            id: `${id}-dropdown`,
          },
        }}
        displayEmpty
        renderValue={
          value !== ''
            ? undefined
            : () => <div className={classes.placeholder}>{placeholder}</div>
        }
      >
        {generateMenuItems()}
      </Select>
    </FormControl>
  );
};
export default SingleSelectDropdown;
