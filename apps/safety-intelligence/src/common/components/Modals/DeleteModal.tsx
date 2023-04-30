import React, { FunctionComponent, useEffect, useRef, useState } from 'react';
import { Skeleton } from '@mui/material';
import CustomModal from './CustomModal';
import { useRecoilState } from 'recoil';
import { TFunction } from 'i18next';
import { withTranslation } from 'react-i18next';
import { showToastState } from '../Toast/Toast';
import { makeStyles } from '@mui/styles';
import { StyleVariables } from '@alcumus/components';

export interface DeleteModalProps {
  formSubmitCallback: (
    itemToDeleteName?: string
  ) => Promise<boolean | undefined>;
  successCallback: (result: any) => void;
  successMessage: string;
  autoFocus?: boolean;
  failureMessage: string;
  errorMessage?: string;
  typeOfItemToDelete: string;
  headerText: string;
  primaryButtonText: string;
  visible: boolean;
  setVisible: (isVisible: boolean) => void;
  t: TFunction;
  folderCount?: number;
  dashboardCount?: number;
  lookCount?: number;
  loading?: boolean;
}

const useStyles = makeStyles(() => ({
  moveRight: {
    marginLeft: '10px',
  },
  checkboxModify: {
    margin: '4px 10px 0 !important',
    transform: 'scale(1.35)',
  },
  divText: {
    fontWeight: 'normal',
    color: StyleVariables.colors.black,
  },
}));

const DestructiveModal: FunctionComponent<DeleteModalProps> = ({
  formSubmitCallback,
  successCallback,
  successMessage,
  failureMessage,
  errorMessage,
  headerText,
  primaryButtonText,
  t,
  visible,
  setVisible,
  folderCount,
  dashboardCount,
  lookCount,
  loading = false,
}: DeleteModalProps) => {
  const [isFormSubmitting, setIsFormSubmitting] = useState(false);
  const isMounted = useRef(true);
  const [toastProps, setToastProps] = useRecoilState(showToastState);
  const [hasAcknowledged, setHasAcknowledged] = useState(false);
  const classes = useStyles();

  const handleFormSubmit = async () => {
    formSubmitCallback()
      .then((result) => {
        resetModal();

        if (successCallback) successCallback(result);
        return result
          ? setToastProps({
              ...toastProps,
              showToast: true,
              severity: 'success',
              message: successMessage,
            })
          : setToastProps({
              ...toastProps,
              showToast: true,
              severity: 'error',
              message: failureMessage,
            });
      })
      .catch((err) => {
        console.log(err);
        setToastProps({
          ...toastProps,
          showToast: true,
          severity: 'error',
          message:
            errorMessage ?? t('genericErrorMessage', { ns: 'ModalWindow' }),
        });
      })
      .finally(() => {
        if (isMounted.current) setIsFormSubmitting(false);
      });
  };

  function resetModal() {
    if (isFormSubmitting) return;
    setHasAcknowledged(false);
    setVisible(false);
  }

  const handleCheck = () => {
    hasAcknowledged ? setHasAcknowledged(false) : setHasAcknowledged(true);
  };

  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  });

  return loading ? (
    <CustomModal
      open={visible}
      headerText=""
      danger
      primaryButtonText={primaryButtonText}
      disablePrimaryButton={true}
      onHide={resetModal}
      isValidating={isFormSubmitting}
      onPrimaryAction={async () => await handleFormSubmit()}
      modalBody={
        <>
          <Skeleton width="20%" data-testid="SkeletonLoading" />
          <br />
          <Skeleton width="10%" />
          <br />
          <Skeleton width="100%" />
        </>
      }
    />
  ) : (
    <CustomModal
      open={visible}
      headerText={headerText}
      danger
      primaryButtonText={primaryButtonText}
      disablePrimaryButton={!hasAcknowledged}
      onHide={resetModal}
      isValidating={isFormSubmitting}
      onPrimaryAction={async () => await handleFormSubmit()}
      modalBody={
        <>
          <div className={classes.divText}>
            <div>{t('folderDeleteMessage', { ns: 'ModalWindow' })}</div>
            <br />
            <div>{t('folderDeleteMessage2', { ns: 'ModalWindow' })}</div>
            <br />
            <ul>
              <li>
                {folderCount}{' '}
                {t('folderDeleteFolderCount', { ns: 'ModalWindow' })}
              </li>
              <li>
                {dashboardCount}{' '}
                {t('folderDeleteDashboardCount', { ns: 'ModalWindow' })}
              </li>
              <li>
                {lookCount} {t('folderDeleteLookCount', { ns: 'ModalWindow' })}
              </li>
            </ul>
            <br />
            <br />
            <div className={classes.moveRight}>
              <input
                type="checkbox"
                required={true}
                onChange={handleCheck}
                className={classes.checkboxModify}
                data-testid="acknCheckbox"
                aria-label={t('deleteAcknowledge', { ns: 'AriaLabels' })}
              />
              {t('folderDeleteAcknowledge', { ns: 'ModalWindow' })}
            </div>
          </div>
        </>
      }
    />
  );
};

export default withTranslation(['ModalWindow', 'AriaLabels'])(DestructiveModal);
