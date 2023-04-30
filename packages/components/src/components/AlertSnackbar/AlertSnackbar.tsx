import { Snackbar, SnackbarProps } from '@mui/material';
import React from 'react';
import Alert, { AlertSeverity } from '../Alert';
import { SnackbarCloseReason } from '@mui/material/Snackbar';

export interface AlertSnackbarProps extends SnackbarProps {
  message: string;
  severity: AlertSeverity;
  onClose?: (event?: any, reason?: SnackbarCloseReason) => void;
}

export default function AlertSnackbar({
  message,
  severity,
  onClose,
  ...props
}: AlertSnackbarProps) {
  return (
    <Snackbar
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      onClose={onClose}
      {...props}
    >
      <Alert message={message} severity={severity} onClose={onClose} />
    </Snackbar>
  );
}
