import React, { useCallback, useEffect } from 'react';
import { makeStyles } from '@mui/styles';
import { StyleVariables, Text } from '@alcumus/components';
import { useStateFromInput } from '@alcumus/hooks';
import { Button, Paper, TextField } from '@mui/material';

const useStyles = makeStyles(() => ({
  setPasswordSection: {
    padding: '2rem',
  },
  error: {
    color: StyleVariables.colors.text.critical,
  },
}));

interface UpdatePasswordFormProps {
  isUpdatingPassword?: boolean;
  errorUpdatingPassword?: string;
  passwordUpdated?: boolean;
  updatePassword: (newPassword: string) => void;
  resetPasswordUpdateStatus: () => void;
}

export default function UpdatePasswordForm({
  isUpdatingPassword = false,
  errorUpdatingPassword = undefined,
  passwordUpdated = false,
  updatePassword,
  resetPasswordUpdateStatus,
}: UpdatePasswordFormProps) {
  const [newPassword, setNewPassword] = useStateFromInput('');
  const [confirmedPassword, setConfirmedPassword] = useStateFromInput('');
  const classes = useStyles();

  const handleNewPasswordChange = useCallback(
    (e) => {
      setNewPassword(e);
      resetPasswordUpdateStatus();
    },
    [resetPasswordUpdateStatus]
  );

  const handleConfirmedPasswordChange = useCallback(
    (e) => {
      setConfirmedPassword(e);
      resetPasswordUpdateStatus();
    },
    [resetPasswordUpdateStatus]
  );

  const handleUpdatePassword = useCallback(() => {
    if (newPassword?.length) {
      updatePassword(newPassword);
    }
  }, [newPassword, updatePassword]);

  useEffect(() => {
    if (!isUpdatingPassword && passwordUpdated) {
      const emptyTargetValue = { target: { value: '' } };
      handleNewPasswordChange(emptyTargetValue);
      handleConfirmedPasswordChange(emptyTargetValue);
    }
  }, [isUpdatingPassword, passwordUpdated]);

  return (
    <Paper elevation={1} className={classes.setPasswordSection}>
      <Text as="h4">Set Password</Text>
      <br />
      <br />
      <TextField
        fullWidth
        label="New Password"
        variant="outlined"
        value={newPassword}
        onChange={handleNewPasswordChange}
        inputProps={{ 'data-testid': 'newPasswordInput', type: 'password' }}
      />
      <br />
      <br />
      <TextField
        fullWidth
        label="Confirm New Password"
        variant="outlined"
        value={confirmedPassword}
        onChange={handleConfirmedPasswordChange}
        inputProps={{
          'data-testid': 'confirmedPasswordInput',
          type: 'password',
        }}
      />
      <br />
      <br />
      {!!errorUpdatingPassword && (
        <React.Fragment>
          <Text as="small" variant="subtitle2" className={classes.error}>
            {errorUpdatingPassword}
          </Text>
          <br />
        </React.Fragment>
      )}
      <Button
        variant="contained"
        color="primary"
        onClick={handleUpdatePassword}
        disabled={
          passwordUpdated ||
          !(
            newPassword?.length &&
            confirmedPassword?.length &&
            newPassword === confirmedPassword
          )
        }
        data-testid="updatePasswordButton"
      >
        {isUpdatingPassword ? 'Updating...' : 'Update Password'}
      </Button>
    </Paper>
  );
}
