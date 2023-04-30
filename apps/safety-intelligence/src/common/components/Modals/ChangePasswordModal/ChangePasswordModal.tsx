import { Input, StyleVariables } from '@alcumus/components';
import React, { useState } from 'react';
import { useStateFromInput } from '@alcumus/hooks';
import { postNewPassword } from './changePassword';
import { showToastState } from '../../Toast/Toast';
import CustomModal from '../CustomModal';
import { atom, useRecoilState } from 'recoil/dist';
import { TFunction } from 'react-i18next';
import { makeStyles } from '@mui/styles';

interface ChangePasswordModalProps {
  t: TFunction;
}

export const changePasswordModalVisibleState = atom<boolean>({
  key: 'changePasswordModalVisibleState',
  default: false,
});

interface PasswordErrors {
  newPasswordError?: string;
  confirmedPasswordError?: string;
}

const useStyles = makeStyles({
  inputLabel: {
    fontWeight: StyleVariables.fonts.weight.regular,
  },
});

export function ChangePasswordModal({
  t,
}: ChangePasswordModalProps): React.ReactElement {
  const classes = useStyles();

  const [visible, setVisible] = useRecoilState(changePasswordModalVisibleState);
  const [newPassword, handleNewPasswordChange, setNewPassword] =
    useStateFromInput('');
  const [oldPassword, handleOldPasswordChange, setOldPassword] =
    useStateFromInput('');
  const [
    confirmedPassword,
    handleConfirmedPasswordChange,
    setConfirmedPassword,
  ] = useStateFromInput('');
  const [toastProps, setToastProps] = useRecoilState(showToastState);
  const [passwordErrors, setPasswordErrors] = useState<PasswordErrors>({});
  const [isUpdatingPassword, setIsUpdatingPassword] = useState(false);

  const validateNewPasswordChange = (e: any) => {
    const newPassword = e.target.value;

    if (newPassword.trim() === oldPassword.trim()) {
      setPasswordErrors({
        ...passwordErrors,
        newPasswordError: t(
          'passwordErrors.newPasswordCannotBeTheSameAsOldPassword'
        ),
      });
    } else {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { newPasswordError, ...rest } = passwordErrors;
      setPasswordErrors(rest);
      handleNewPasswordChange(e);
    }
  };

  const validateConfirmPasswordChange = (e: any) => {
    const confirmedPassword = e.target.value;
    if (newPassword.trim() !== confirmedPassword.trim()) {
      setPasswordErrors({
        ...passwordErrors,
        confirmedPasswordError: t(
          'passwordErrors.newPasswordAndConfirmPasswordMustMatch'
        ),
      });
    } else {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { confirmedPasswordError, ...rest } = passwordErrors;
      setPasswordErrors(rest);
      handleConfirmedPasswordChange(e);
    }
  };

  const handleUpdatePassword = async () => {
    if (newPassword?.trim().length && newPassword?.trim().length) {
      setIsUpdatingPassword(true);
      postNewPassword(newPassword, oldPassword)
        .then(() => {
          setVisible(false);
          resetModal();
          setToastProps({
            ...toastProps,
            showToast: true,
            severity: 'success',
            message: t('passwordUpdatedSuccessfully'),
          });
        })
        .catch(() => {
          setToastProps({
            ...toastProps,
            showToast: true,
            severity: 'error',
            message: t('errorUpdatingPassword'),
          });
        })
        .finally(() => setIsUpdatingPassword(false));
    }
  };

  function resetModal() {
    if (isUpdatingPassword) return;
    setPasswordErrors({});
    setOldPassword('');
    setNewPassword('');
    setConfirmedPassword('');
    setVisible(false);
  }
  return (
    <CustomModal
      open={visible}
      data-testId="changePasswordModal"
      disablePrimaryButton={
        !(
          newPassword?.length &&
          confirmedPassword?.length &&
          newPassword === confirmedPassword
        )
      }
      headerText={t('editPassword')}
      primaryButtonText={t('save')}
      onHide={resetModal}
      isValidating={isUpdatingPassword}
      onPrimaryAction={handleUpdatePassword}
      modalBody={
        <>
          <Input
            label={t('currentPassword')}
            type="password"
            value={oldPassword}
            onChange={handleOldPasswordChange}
            data-testid="currentPasswordInput"
            disabled={isUpdatingPassword}
            required
            labelClassName={classes.inputLabel}
          />
          <Input
            label={t('newPassword')}
            type="password"
            autoComplete="new-password"
            value={newPassword}
            onChange={validateNewPasswordChange}
            data-testid="newPasswordInput"
            state={passwordErrors?.newPasswordError ? 'error' : 'default'}
            hint={passwordErrors?.newPasswordError}
            required
            labelClassName={classes.inputLabel}
          />
          <Input
            label={t('confirmNewPassword')}
            type="password"
            value={confirmedPassword}
            onChange={validateConfirmPasswordChange}
            data-testid="confirmedPasswordInput"
            state={passwordErrors?.confirmedPasswordError ? 'error' : 'default'}
            hint={passwordErrors?.confirmedPasswordError}
            required
            labelClassName={classes.inputLabel}
          />
        </>
      }
    />
  );
}
