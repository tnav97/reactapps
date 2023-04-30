import React from 'react';
import {
  Checkbox,
  FormHelperText,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Select as BaseSelect,
  SelectProps as BaseSelectProps,
} from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import { ExpandMore } from '@mui/icons-material';
import Label from './Label';
import StyleVariables from '../../styles/variables';

const useStyles = makeStyles({
  select: {
    backgroundColor: StyleVariables.colors.surface.default,
    '&:focus': {
      backgroundColor: 'inherit',
    },
    '&.MuiOutlinedInput-input': {
      padding: '9px 12px',
    },
  },
  baseSelect: {
    borderRadius: '8px',
    borderColor: StyleVariables.colors.border.default,
    '&.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: StyleVariables.colors.border.active,
    },
  },
  helperText: { color: StyleVariables.colors.text.subdued },
  label: {
    marginBottom: StyleVariables.spacing(0.5),
    lineHeight: StyleVariables.fonts.lineHeight.regular,
  },
});

export interface Item {
  id: number | string;
  name: string;
  disabled?: boolean;
}

export interface SelectProps extends BaseSelectProps {
  items: Array<Item>;
  label: string;
  helperText?: string;
  required?: boolean;
  className?: string;
  customSelectText?: string;
}

export default function Select({
  items,
  label,
  helperText,
  value,
  required,
  className,
  multiple,
  customSelectText,
  ...rest
}: SelectProps) {
  const classes = useStyles();

  const itemsMap = new Map<string | number, Item>();
  for (const item of items) {
    itemsMap.set(item.id, item);
  }

  const renderValue = (value) => {
    if (multiple && customSelectText) {
      if (value.length === 0) {
        return `Select ${customSelectText}`;
      }
      return `${value.length} ${customSelectText}${
        value.length > 1 ? 's' : ''
      } selected`;
    } else {
      return itemsMap.get(value)?.name;
    }
  };

  return (
    <div className={className}>
      <Label label={label} required={required} className={classes.label} />
      <BaseSelect
        IconComponent={ExpandMore}
        fullWidth
        value={value || ''}
        variant="outlined"
        className={classes.baseSelect}
        data-testid="baseSelect"
        classes={{ select: classes.select }}
        multiple={multiple}
        displayEmpty
        renderValue={renderValue}
        {...rest}
      >
        {items.map((item) => (
          <MenuItem key={item.id} value={item.id} disabled={item.disabled}>
            {multiple && (
              <ListItemIcon>
                <Checkbox
                  checked={Array.isArray(value) && value.includes(item.id)}
                />
              </ListItemIcon>
            )}
            <ListItemText>{item.name}</ListItemText>
          </MenuItem>
        ))}
      </BaseSelect>
      {helperText && (
        <FormHelperText className={classes.helperText} data-testid="helperText">
          {helperText}
        </FormHelperText>
      )}
    </div>
  );
}
