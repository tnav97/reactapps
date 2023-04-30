import React, { FunctionComponent, useEffect, useRef, useState } from 'react';
import Form from 'antd/lib/form';
import { useRecoilState } from 'recoil';
import isFunction from 'lodash/isFunction';
import { IconType } from 'antd/es/notification';
import { DataNode } from 'rc-tree-select/lib/interface';
import { TFunction } from 'i18next';
import { withTranslation } from 'react-i18next';
import FoldersTree, { selectedFolderState } from '../FoldersPage/FoldersTree';
import CustomModal from './CustomModal';
import { makeStyles } from '@mui/styles';
import { StyleVariables } from '@alcumus/components';
import { showToastState } from '../Toast/Toast';

interface ModalFormProps {
  id?: string;
  dashboardName: string;
  titleName: string;
  currentFolderId: number;
  currentFolderName?: string | undefined;
  titleValidationCallback: () => Promise<boolean>;
  duplicateErrorMessage: string;
  visible: boolean;
  autoFocus?: boolean;
  t: TFunction;
}

export interface MoveToFolderModalProps extends ModalFormProps {
  formSubmitCallback: (folderId: number) => Promise<unknown | undefined>;
  successCallback?: (result: any) => void;
  successMessage: string;
  failureMessage: string;
  errorMessage: string;
  notificationMessage?: string;
  notificationMessageWaitTime?: number;
  notificationMessageType?: IconType;
  headerText: string;
  primaryButtonText: string;
  setVisible: (isVisible: boolean) => void;
}

const useStyles = makeStyles(() => ({
  headerText: {
    fontWeight: 'normal',
    color: StyleVariables.colors.text.default,
  },
  divText: {
    fontWeight: 'normal',
    color: StyleVariables.colors.text.default,
  },
  mandatoryText: {
    color: StyleVariables.colors.text.critical,
    marginLeft: '5px',
  },
  successModal: {
    backgroundColor: StyleVariables.colors.surface.neutral.default,
    borderRadius: '6px',
    border: `1px solid ${StyleVariables.colors.border.default}`,
    fontWeight: 400,
    borderLeft: `8px solid ${StyleVariables.colors.text.success}`,
  },
  iconColor: {
    color: `${StyleVariables.colors.text.success}`,
  },
}));

const MoveToFolderModal: FunctionComponent<MoveToFolderModalProps> = ({
  id,
  dashboardName,
  formSubmitCallback,
  successCallback,
  successMessage,
  failureMessage,
  errorMessage,
  titleValidationCallback,
  currentFolderName,
  duplicateErrorMessage,
  headerText,
  primaryButtonText,
  visible,
  setVisible,
  t,
}: MoveToFolderModalProps) => {
  const [isFormSubmitting, setIsFormSubmitting] = useState(false);
  const [selectedFolderNode, setSelectedFolder] = useRecoilState<
    DataNode | undefined
  >(selectedFolderState);
  const [, setTitle] = useState<string>();
  const isMounted = useRef(true);
  const [form] = Form.useForm();
  const classes = useStyles();
  const [toastProps, setToastProps] = useRecoilState(showToastState);

  const validateTitleUniqueness = async () => {
    if (isFormSubmitting) {
      const isTitleUnique = await titleValidationCallback();
      if (!isTitleUnique) {
        setIsFormSubmitting(false);
        return Promise.reject(duplicateErrorMessage);
      }
      return Promise.resolve();
    }
  };

  const handleFormSubmit = async () => {
    setIsFormSubmitting(true);
    validateTitleUniqueness();

    const selectedFolder = selectedFolderNode?.value as number;

    formSubmitCallback(selectedFolder)
      .then((result) => {
        resetModal();

        if (successCallback && isFunction(successCallback))
          successCallback(result);
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
          message: errorMessage,
        });
      })
      .finally(() => {
        if (isMounted.current) setIsFormSubmitting(false);
      });
  };

  function resetModal() {
    if (isFormSubmitting) return;
    form.resetFields();
    setSelectedFolder(undefined);
    setTitle(undefined);
    setVisible(false);
  }

  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  });

  return (
    <CustomModal
      open={visible}
      data-testid={id}
      headerText={headerText}
      primaryButtonText={primaryButtonText}
      disablePrimaryButton={!selectedFolderNode}
      onHide={resetModal}
      isValidating={isFormSubmitting}
      onPrimaryAction={async () => await handleFormSubmit()}
      modalBody={
        <>
          <div className={classes.headerText}>{t('dashboard')}</div>
          <br />
          <div className={classes.divText}>{dashboardName}</div>
          <br />
          <br />
          <div className={classes.headerText}>{t('currentFolder')}</div>
          <br />
          <div className={classes.divText}>{currentFolderName}</div>
          <br />
          <br />
          <div>
            <label className={classes.headerText}>{t('moveTo')}</label>
            <label className={classes.mandatoryText}>{'*'}</label>
          </div>
          <FoldersTree visible={visible} />
        </>
      }
    />
  );
};

export default withTranslation('ModalWindow')(MoveToFolderModal);
