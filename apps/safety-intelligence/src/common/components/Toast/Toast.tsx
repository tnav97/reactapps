import React from 'react';
import { IconButton, Snackbar } from '@mui/material';
import { makeStyles } from '@mui/styles';
import MuiAlert from '@mui/lab/Alert';
import { atom, useRecoilState } from 'recoil';
import { StyleVariables } from '@alcumus/components';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined';
import CloseIcon from '@mui/icons-material/Close';

interface StyleProps {
  severity: 'success' | 'error';
}

export interface ToastProps {
  showToast: boolean;
  onClose?: () => void;
  severity: 'success' | 'error';
  message: React.ReactNode;
  duration?: number;
}
export const showToastState = atom<ToastProps>({
  key: 'showToastState',
  default: {
    showToast: false,
    severity: 'success',
    message: '',
    duration: 3000,
  },
});

const useStyles = makeStyles(() => ({
  alert: {
    lineHeight: StyleVariables.fonts.lineHeight.h5,
    border: `1px solid ${StyleVariables.colors.border.default}`,
    borderRadius: 8,
  },
  icon: {
    alignSelf: 'center',
    '&.MuiAlert-icon': {
      color: (props: StyleProps) =>
        props.severity === 'success'
          ? StyleVariables.colors.text.success
          : StyleVariables.colors.text.critical,
    },
  },
  success: {
    backgroundColor: StyleVariables.colors.alert.success,
    borderLeft: `8px solid ${StyleVariables.colors.text.success}`,
  },
  error: {
    borderLeft: `8px solid ${StyleVariables.colors.border.critical}`,
  },
  closeIcon: {
    borderRadius: 4,
  },
}));

export default function Toast() {
  const [items, setProps] = useRecoilState<ToastProps>(showToastState);
  const classes = useStyles({ severity: items.severity });

  const handleClose = () => {
    setProps({ ...items, showToast: false });
    if (items.onClose) items.onClose();
  };
  const getIcon = () => {
    if (items.severity === 'success') return <CheckCircleIcon />;
    return <ErrorOutlineOutlinedIcon />;
  };
  return (
    <Snackbar
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      open={items.showToast}
      onClose={handleClose}
      autoHideDuration={items.duration}
    >
      <MuiAlert
        className={classes.alert}
        classes={{
          icon: classes.icon,
          standardSuccess: classes.success,
          standardError: classes.error,
        }}
        action={
          <IconButton
            disableRipple
            className={classes.closeIcon}
            onClick={handleClose}
          >
            {<CloseIcon />}{' '}
          </IconButton>
        }
        icon={getIcon()}
        severity={items.severity}
        onClose={handleClose}
      >
        {items.message}
      </MuiAlert>
    </Snackbar>
  );
}
