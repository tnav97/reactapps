import React, { useCallback, useEffect } from 'react';
import { Button, Paper, TextField } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { StyleVariables, Text } from '@alcumus/components';
import { useStateFromInput } from '@alcumus/hooks';
import clsx from 'clsx';

const useStyles = makeStyles(() => ({
  setPasswordSection: {
    padding: '2rem',
  },
  error: {
    color: StyleVariables.colors.text.critical,
  },
}));

interface KeycloakPasswordUpdateFormProps {
  isUpdatingPassword?: boolean;
  errorUpdatingPassword?: string;
  passwordUpdated?: boolean;
  updatePassword: (oldPassword: string, newPassword: string) => void;
  resetPasswordUpdateStatus: () => void;
  className?: string;
}

export default function KeycloakPasswordUpdateForm({
  isUpdatingPassword = false,
  errorUpdatingPassword = undefined,
  passwordUpdated = false,
  updatePassword,
  resetPasswordUpdateStatus,
  className,
}: KeycloakPasswordUpdateFormProps) {
  const [oldPassword, setOldPassword] = useStateFromInput('');
  const [newPassword, setNewPassword] = useStateFromInput('');
  const [confirmedPassword, setConfirmedPassword] = useStateFromInput('');
  const classes = useStyles();

  const handleOldPasswordChange = useCallback(
    (e) => {
      setOldPassword(e);
      resetPasswordUpdateStatus();
    },
    [resetPasswordUpdateStatus]
  );

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
    if (oldPassword?.length && newPassword?.length) {
      updatePassword(oldPassword, newPassword);
    }
  }, [oldPassword, newPassword, updatePassword]);

  useEffect(() => {
    if (!isUpdatingPassword && passwordUpdated) {
      const emptyTargetValue = { target: { value: '' } };
      handleOldPasswordChange(emptyTargetValue);
      handleNewPasswordChange(emptyTargetValue);
      handleConfirmedPasswordChange(emptyTargetValue);
    }
  }, [isUpdatingPassword, passwordUpdated]);

  return (
    <Paper
      elevation={1}
      className={clsx(classes.setPasswordSection, className)}
    >
      <Text as="h4">Set Password</Text>
      <br />
      <br />
      <TextField
        fullWidth
        label="Current Password"
        variant="outlined"
        defaultValue={oldPassword}
        onChange={handleOldPasswordChange}
        inputProps={{ 'data-testid': 'oldPasswordInput', type: 'password' }}
      />
      <br />
      <br />
      <TextField
        fullWidth
        label="New Password"
        variant="outlined"
        defaultValue={newPassword}
        onChange={handleNewPasswordChange}
        inputProps={{ 'data-testid': 'newPasswordInput', type: 'password' }}
      />
      <br />
      <br />
      <TextField
        fullWidth
        label="Confirm New Password"
        variant="outlined"
        defaultValue={confirmedPassword}
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
            oldPassword?.length &&
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
