/* eslint-disable prefer-promise-reject-errors */
import React, { FunctionComponent, useEffect, useRef, useState } from 'react';
import Form, { FormProps } from 'antd/lib/form';
import Input from 'antd/lib/input';
import { useRecoilState } from 'recoil';
import { RuleObject, StoreValue } from 'rc-field-form/lib/interface';
import _ from 'lodash';
import { DataNode } from 'rc-tree-select/lib/interface';
import { TFunction } from 'i18next';
import { withTranslation } from 'react-i18next';
import FoldersTree, { selectedFolderState } from '../FoldersPage/FoldersTree';
import CustomModal from './CustomModal';
import { makeStyles } from '@mui/styles';
import { StyleVariables, Text } from '@alcumus/components';
import { showToastState } from '../Toast/Toast';

interface ModalFormProps {
  id?: string;
  titleName: string;
  placeholder: string;
  defaultFolderId: number;
  currentFolderName?: string | undefined;
  hideFolderTree?: boolean | undefined;
  titleValidationCallback: (
    title: string,
    folderId: number
  ) => Promise<boolean>;
  duplicateErrorMessage: string;
  visible: boolean;
  autoFocus?: boolean;
  t: TFunction;
  singleSelect?: React.ReactNode;
}

export interface SaveInFolderModalProps extends ModalFormProps {
  formSubmitCallback: (
    title: string,
    folderId: number,
    modelName?: string,
    dataSource?: string
  ) => Promise<unknown | undefined>;
  successCallback?: (result: any) => void;
  successMessage: string;
  failureMessage: string;
  errorMessage: string;
  notificationMessage?: string;
  headerText: string;
  primaryButtonText: string;
  setVisible: (isVisible: boolean) => void;
  resetModalCallback?: () => void;
}

const useStyles = makeStyles(() => ({
  dashboardText: {
    fontWeight: StyleVariables.fonts.weight.regular,
  },
  dashboardInput: {
    borderRadius: '8px',
    borderLeft: `4px solid ${StyleVariables.colors.border.critical}`,
    height: 40,
  },
  folderText: {
    display: 'flex',
    marginBottom: 5,
  },
  iconColor: {
    color: `${StyleVariables.colors.text.success}`,
  },
  mandatoryText: {
    color: StyleVariables.colors.text.critical,
    fontSize: `${StyleVariables.fonts.size.small} !important`,
    marginLeft: 2,
  },
}));

const SaveInFolderModal: FunctionComponent<SaveInFolderModalProps> = ({
  id,
  formSubmitCallback,
  successCallback,
  successMessage,
  failureMessage,
  errorMessage,
  titleName,
  titleValidationCallback,
  currentFolderName,
  placeholder,
  duplicateErrorMessage,
  hideFolderTree,
  autoFocus,
  headerText,
  primaryButtonText,
  visible,
  setVisible,
  t,
  singleSelect,
  resetModalCallback,
}: SaveInFolderModalProps) => {
  const [isFormSubmitting, setIsFormSubmitting] = useState(false);
  const [selectedFolderNode, setSelectedFolder] = useRecoilState<
    DataNode | undefined
  >(selectedFolderState);
  const [title, setTitle] = useState<string>();
  const isMounted = useRef(true);
  const [form] = Form.useForm();
  const classes = useStyles();
  const [toastProps, setToastProps] = useRecoilState(showToastState);
  const validateTitleUniqueness = async (title: string, folderId: number) => {
    if (folderId !== undefined) {
      const isTitleUnique = await titleValidationCallback(title, folderId);
      if (!isTitleUnique) {
        setIsFormSubmitting(false);
        return Promise.reject(duplicateErrorMessage);
      }
      return Promise.resolve();
    }
  };

  const handleFormSubmit = async () => {
    setIsFormSubmitting(true);
    const values = await form
      .validateFields()
      .catch((errors) => console.log('errors', errors));

    if (!values) {
      setIsFormSubmitting(false);
      return;
    }

    validateTitleUniqueness(
      values[titleName],
      selectedFolderNode?.value as number
    )
      .then(() => {
        const _title = values[titleName];
        const selectedFolder = selectedFolderNode?.value as number;

        formSubmitCallback(_title, selectedFolder)
          .then((result) => {
            resetModal();
            if (successCallback && _.isFunction(successCallback))
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
          .catch(() => {
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
      })
      .catch(() => {
        setToastProps({
          ...toastProps,
          showToast: true,
          severity: 'error',
          message: duplicateErrorMessage,
        });
      });
  };

  function resetModal() {
    if (isFormSubmitting) return;
    if (resetModalCallback) resetModalCallback();
    form.resetFields();
    setSelectedFolder(undefined);
    setTitle(undefined);
    setVisible(false);
  }

  const formProps: FormProps = {
    name: `${titleName}-form`,
    layout: 'vertical',
    form,
    requiredMark: true,
    onFinish: handleFormSubmit,
  };

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
      disablePrimaryButton={!title || isFormSubmitting}
      onHide={resetModal}
      isValidating={isFormSubmitting}
      onPrimaryAction={async () => await handleFormSubmit()}
      modalBody={
        <>
          {singleSelect}
          <Form {...formProps}>
            <Form.Item
              label={
                <>
                  <div className={classes.dashboardText}>{t('title')}</div>
                  <label className={classes.mandatoryText}>{'*'}</label>
                </>
              }
              initialValue={currentFolderName}
              name={titleName}
              rules={[
                {
                  required: true,
                  type: 'string',
                  validator: async (rule: RuleObject, value: StoreValue) => {
                    setTitle(value);
                    if (!value)
                      return Promise.reject(t('dashboardTitleRequired'));

                    return await validateTitleUniqueness(
                      value,
                      selectedFolderNode?.value as number
                    );
                  },
                },
              ]}
            >
              <Input
                data-testid="inputTitleBox"
                placeholder={placeholder}
                autoFocus={autoFocus}
                className={classes.dashboardInput}
              />
            </Form.Item>
          </Form>
          {!hideFolderTree && (
            <>
              <div className={classes.folderText}>
                <Text as="span">{t('saveTo')}</Text>
                <label className={classes.mandatoryText}>{'*'}</label>
              </div>
              <FoldersTree visible={visible} />
            </>
          )}
        </>
      }
    />
  );
};

export default withTranslation('ModalWindow')(SaveInFolderModal);
