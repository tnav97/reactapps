import React, { ChangeEventHandler, useCallback, useState } from 'react';
import {
  Button,
  Input,
  Modal,
  StyleVariables,
  Text,
  CheckBanner,
  CheckBannerItem,
  OutlinedIcon,
} from '@alcumus/components';
import { IconButton } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { TFunction } from 'i18next';
import { PasswordValidator } from './PasswordValidator';

const useStyles = makeStyles(() => ({
  error: {
    color: StyleVariables.colors.text.critical,
  },
  button: {
    marginLeft: '0.5rem',
  },
  passwordField: {
    marginBottom: StyleVariables.spacing(0.5),
  },
  meter: {
    marginBottom: StyleVariables.spacing(2.5),
  },
  checkBanner: {
    marginBottom: StyleVariables.spacing(3),
    marginTop: StyleVariables.spacing(0.75),
  },
  passwordVisibilityToggle: {
    padding: 0,
  },
  visibilityAdornment: {
    color: StyleVariables.colors.text.subdued,
  },
  adornment: { bottom: StyleVariables.spacing(0.5) },
}));

interface EditPasswordModalContentProps {
  onUpdate: (newPassword) => void;
  onCancel: () => void;
  error?: string;
  isUpdatingPassword?: boolean;
  t: TFunction;
}

interface ConfirmPassword {
  password: string;
  error?: string;
}

interface NewPassword {
  password: string;
  error?: string;
}

export default function EditPasswordModalContent({
  onUpdate,
  onCancel,
  error,
  t,
  isUpdatingPassword = false,
}: EditPasswordModalContentProps) {
  const classes = useStyles();

  const [newPassword, setNewPassword] = useState<NewPassword>({
    password: '',
  });
  const [confirmPassword, setConfirmPassword] = useState<ConfirmPassword>({
    password: '',
  });

  const [confirmPasswordFieldIsDirty, setConfirmPasswordFieldIsDirty] =
    useState<boolean>(false);
  const [passwordChecks, setPasswordChecks] = useState<Array<CheckBannerItem>>([
    { title: t('modal.passwordChecks.minLength'), checked: false },
    { title: t('modal.passwordChecks.upperAndLower'), checked: false },
    { title: t('modal.passwordChecks.number'), checked: false },
    { title: t('modal.passwordChecks.specialCharacter'), checked: false },
  ]);
  const [isPasswordVisible, setIsPasswordVisible] = useState<Boolean>(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState<Boolean>(false);

  const handleIsPasswordVisibleChange = useCallback(
    () => setIsPasswordVisible(!isPasswordVisible),
    [isPasswordVisible]
  );
  const handleIsConfirmPasswordVisibleChange = useCallback(
    () => setIsConfirmPasswordVisible(!isConfirmPasswordVisible),
    [isConfirmPasswordVisible]
  );
  const handleNewPasswordChange: ChangeEventHandler<HTMLInputElement> = ({
    target,
  }) => {
    const { value } = target;

    passwordChecks[0].checked = PasswordValidator.hasMinLength(value);
    passwordChecks[1].checked =
      PasswordValidator.hasLower(value) && PasswordValidator.hasUpper(value);
    passwordChecks[2].checked = PasswordValidator.hasNumber(value);
    passwordChecks[3].checked = PasswordValidator.hasSpecialCharacter(value);
    setPasswordChecks([...passwordChecks]);
    if (PasswordValidator.isMaching(confirmPassword.password, value)) {
      setConfirmPassword({ ...confirmPassword, error: undefined });
    }
    setNewPassword({
      password: value,
      error:
        confirmPasswordFieldIsDirty &&
        !PasswordValidator.isMaching(confirmPassword.password, value)
          ? t('modal.passwordsNotMaching')
          : undefined,
    });
  };

  const handleConfirmPasswordChange: ChangeEventHandler<HTMLInputElement> = ({
    target,
  }) => {
    const { value } = target;
    setConfirmPasswordFieldIsDirty(true);
    if (PasswordValidator.isMaching(newPassword.password, value)) {
      setNewPassword({ ...newPassword, error: undefined });
    }
    setConfirmPassword({
      password: value,
      error: !PasswordValidator.isMaching(newPassword.password, value)
        ? t('modal.passwordsNotMaching')
        : undefined,
    });
  };

  const isPasswordValid = () =>
    PasswordValidator.isMaching(
      newPassword.password,
      confirmPassword.password
    ) &&
    PasswordValidator.hasMinLength(newPassword.password) &&
    PasswordValidator.hasUpper(newPassword.password) &&
    PasswordValidator.hasLower(newPassword.password) &&
    PasswordValidator.hasNumber(newPassword.password) &&
    PasswordValidator.hasSpecialCharacter(newPassword.password);

  const handleUpdate = useCallback(() => {
    onUpdate(newPassword.password);
    setConfirmPasswordFieldIsDirty(false);
  }, [onUpdate, newPassword]);

  return (
    <React.Fragment>
      <Modal.Body>
        <Input
          type={isPasswordVisible ? 'text' : 'password'}
          onChange={handleNewPasswordChange}
          label={t('modal.newPassword')}
          className={classes.passwordField}
          required
          data-testid="password"
          adornmentClassName={classes.adornment}
          adornment={
            <IconButton
              className={classes.passwordVisibilityToggle}
              onClick={handleIsPasswordVisibleChange}
            >
              {isPasswordVisible ? (
                <OutlinedIcon
                  icon="visibility"
                  className={classes.visibilityAdornment}
                />
              ) : (
                <OutlinedIcon
                  icon="visibility_off"
                  className={classes.visibilityAdornment}
                />
              )}
            </IconButton>
          }
        />
        <CheckBanner
          items={passwordChecks}
          className={classes.checkBanner}
          header={t('modal.passwordChecksHeader')}
        />
        <Input
          type={isConfirmPasswordVisible ? 'text' : 'password'}
          data-testid="confirm-password"
          onChange={handleConfirmPasswordChange}
          label={t('modal.confrimNewPassword')}
          className={classes.passwordField}
          required
          hint={confirmPassword.error || newPassword.error}
          state={
            confirmPassword.error || newPassword.error ? 'error' : 'default'
          }
          adornmentClassName={classes.adornment}
          adornment={
            <IconButton
              className={classes.passwordVisibilityToggle}
              onClick={handleIsConfirmPasswordVisibleChange}
            >
              {isConfirmPasswordVisible ? (
                <OutlinedIcon
                  icon="visibility"
                  className={classes.visibilityAdornment}
                />
              ) : (
                <OutlinedIcon
                  icon="visibility_off"
                  className={classes.visibilityAdornment}
                />
              )}
            </IconButton>
          }
        />
        {!!error?.length && <Text color="error">{error}</Text>}
      </Modal.Body>
      <Modal.Actions>
        <Button
          variant="outlined"
          rounded
          className={classes.button}
          onClick={onCancel}
          data-testid="edit-password-cancel-button"
        >
          {t('modal.cancel')}
        </Button>
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          rounded
          onClick={handleUpdate}
          data-testid="edit-password-update-button"
          disabled={!isPasswordValid() || isUpdatingPassword}
        >
          {isUpdatingPassword ? `${t('modal.updating')}...` : t('modal.update')}
        </Button>
      </Modal.Actions>
    </React.Fragment>
  );
}
