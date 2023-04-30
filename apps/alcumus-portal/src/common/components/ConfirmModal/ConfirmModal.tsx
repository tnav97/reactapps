import React, { useContext, useState } from 'react';
import {
  Button,
  Modal,
  OutlinedIcon,
  OutlinedIconType,
  StyleVariables,
  Text,
} from '@alcumus/components';
import { Grid } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { TFunction } from 'i18next';
import { ToastContext } from '../../context/ToastContext';

export interface ConfirmModalProps {
  t: TFunction;
  onClose: () => void;
  confirmAction: () => Promise<any>;
  icon?: OutlinedIconType;
  confirmButtonText: string;
  isConfirmButtonCritical?: boolean;
  isOpen: boolean;
  size: 'sm' | 'md' | 'lg';
  onSuccess: () => void;
  messages: {
    successMessage: string;
    errorMessage: string;
    confirmMessage: string;
    headerText: string;
    bodyText?: string;
  };
}

const useStyles = makeStyles({
  header: {
    display: 'flex',
    alignItems: 'center',
  },
  headerText: {
    fontWeight: StyleVariables.fonts.weight.medium,
    color: StyleVariables.colors.text.default,
  },
  message: {
    color: StyleVariables.colors.text.default,
  },
  icon: {
    marginRight: '1.5rem',
    fontSize: '2rem',
    color: (critical) =>
      critical
        ? StyleVariables.colors.icon.critical
        : StyleVariables.colors.icon.warning,
  },
  cancelButton: {
    marginRight: '1rem',
  },
});

export function ConfirmModal({
  icon,
  t,
  onClose,
  confirmAction,
  confirmButtonText,
  isConfirmButtonCritical = false,
  isOpen,
  size,
  onSuccess,
  messages,
}: ConfirmModalProps) {
  const classes = useStyles(isConfirmButtonCritical);
  const [isUpdating, setIsUpdating] = useState(false);
  const { setToast } = useContext(ToastContext);

  const handleConfirm = async () => {
    setIsUpdating(true);
    try {
      await confirmAction();
      setIsUpdating(false);
      onSuccess();
      if (setToast) {
        setToast({
          message: messages.successMessage,
          severity: 'success',
        });
      }
    } catch (e: any) {
      setIsUpdating(false);
      if (setToast) {
        setToast({
          message: messages.errorMessage,
          severity: 'error',
        });
      }
      throw e;
    }
  };

  return (
    <Modal open={isOpen} size={size}>
      <Modal.Header onClose={onClose}>
        <div className={classes.header}>
          {icon && (
            <OutlinedIcon
              icon={icon}
              className={classes.icon}
              data-testid="confirmModal.headerIcon"
            />
          )}
          <Text
            as="h4"
            data-testid="confirmModal.headerText"
            className={classes.headerText}
          >
            {messages.headerText}
          </Text>
        </div>
      </Modal.Header>
      <Modal.Body>
        <Grid container>
          <Grid item xs={1} />
          <Grid item xs={10}>
            <div data-testid="confirmModal.message" className={classes.message}>
              <>
                <Text>{messages.confirmMessage}</Text>
                {messages.bodyText && <Text>{messages.bodyText}</Text>}
              </>
            </div>
          </Grid>
          <Grid item xs={1} />
        </Grid>
      </Modal.Body>
      <Modal.Actions>
        <Button
          variant="outlined"
          rounded
          onClick={onClose}
          data-testid="confirmModal.cancelButton"
          disabled={isUpdating}
        >
          {t('cancel')}
        </Button>
        <Button
          variant={isConfirmButtonCritical ? 'critical' : 'contained'}
          rounded
          onClick={handleConfirm}
          data-testid="confirmModal.confirmButton"
          disabled={isUpdating}
        >
          {confirmButtonText}
        </Button>
      </Modal.Actions>
    </Modal>
  );
}
