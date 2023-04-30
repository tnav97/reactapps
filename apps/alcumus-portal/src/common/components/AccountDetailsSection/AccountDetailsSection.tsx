import React, { useCallback, useEffect, useState } from 'react';
import { Modal, Text } from '@alcumus/components';
import { useTimeout } from '@alcumus/hooks';
import EditableContent from './EditableContent';
import EditEmailModalContent from './EditEmailModalContent';
import EditPasswordModalContent from './EditPasswordModalContent';
import EmailUpdateSuccessModalContent from './EmailUpdateSuccessModalContent';
import MyAccountSection from '../MyAccountSection';
import { TFunction } from 'i18next';
import { useUserLogin } from '../../hooks/useUserLogin';
import Analytics from '@alcumus/analytics-package';
import useSWR from 'swr';
import { MyOrganizationDetails } from '../../types';
import { CURRENT_ORGANIZATION_PROFILE_URL } from '../MyOrganization';

interface AccountDetailsSectionProps {
  email: string;
  isUpdatingPassword?: boolean;
  errorUpdatingPassword?: string;
  passwordUpdated?: boolean;
  updatePassword: (newPassword: string) => void;
  resetPasswordUpdateStatus: () => void;
  isUpdatingEmail?: boolean;
  errorUpdatingEmail?: string;
  emailUpdated?: boolean;
  updateEmail: (newEmail: string) => void;
  resetEmailUpdateStatus: () => void;
  logoutUser: () => void;
  t: TFunction;
  className?: string;
}

export default function AccountDetailsSection({
  email,
  isUpdatingPassword = false,
  errorUpdatingPassword = undefined,
  passwordUpdated = false,
  updatePassword,
  resetPasswordUpdateStatus,
  isUpdatingEmail = false,
  errorUpdatingEmail = undefined,
  emailUpdated = false,
  updateEmail,
  resetEmailUpdateStatus,
  logoutUser,
  t,
  className,
}: AccountDetailsSectionProps) {
  const [showEditEmailModal, setShowEditEmailModal] = useState<boolean>(false);
  const [showEmailUpdateSuccess, setShowEmailUpdateSuccess] =
    useState<boolean>(false);
  const [showEditPasswordModal, setShowEditPasswordModal] =
    useState<boolean>(false);

  const { data: userLogin } = useUserLogin();
  const username = userLogin?.username;

  const handleEditEmail = useCallback(() => {
    setShowEditEmailModal(true);
  }, []);

  const handleCancelEditEmail = useCallback(() => {
    setShowEditEmailModal(false);
  }, []);

  const handleUpdateEmail = useCallback(
    (newEmail: string) => {
      updateEmail(newEmail);
    },
    [updateEmail]
  );

  const handleEditPassword = useCallback(() => {
    setShowEditPasswordModal(true);
  }, []);

  const handleCancelEditPassword = useCallback(() => {
    setShowEditPasswordModal(false);
  }, []);

  const handleUpdatePassword = useCallback(
    (newPassword: string) => {
      updatePassword(newPassword);
    },
    [updatePassword]
  );
  const { data: myOrganizationDetails } = useSWR<MyOrganizationDetails>(
    CURRENT_ORGANIZATION_PROFILE_URL
  );

  // Once password update initiated by user finished, ensure hiding the modal
  useEffect(() => {
    if (showEditPasswordModal && !errorUpdatingPassword && passwordUpdated) {
      resetPasswordUpdateStatus();
      setShowEditPasswordModal(false);
      Analytics.getInstance().track('Profile Password Updated', {
        organization: myOrganizationDetails?.tenantName,
      });
    }
  }, [
    showEditPasswordModal,
    resetPasswordUpdateStatus,
    passwordUpdated,
    errorUpdatingPassword,
  ]);

  // Once email update initiated by user finished, ensure hiding the modal
  useEffect(() => {
    if (showEditEmailModal && !errorUpdatingEmail && emailUpdated) {
      resetEmailUpdateStatus();
      setShowEditEmailModal(false);
      setShowEmailUpdateSuccess(true);
    }
  }, [
    showEditEmailModal,
    resetEmailUpdateStatus,
    emailUpdated,
    errorUpdatingEmail,
  ]);

  // After user' email is updated, we need to log user out giving enough notice that they need to re-login.
  useTimeout(
    () => {
      if (showEmailUpdateSuccess) {
        logoutUser();
      }
    },
    3000, // 3 seconds
    [showEmailUpdateSuccess, logoutUser]
  );

  return (
    <MyAccountSection
      header={t('header')}
      subHeader={t('subHeader')}
      className={className}
    >
      {/*
      For simplicity, do not show the username section if they have an email, unless that email is different
      than their username. (Which is not supported - so showing it helps us find a bug).
      TODO: add onEdit handler for editing username
      */}
      {(!email || email !== username) && (
        <EditableContent disableEditButton data-testid="editUsername">
          <Text as="p">{t('username')}</Text>
          <Text as="p" data-testid="username">
            {username}
          </Text>
        </EditableContent>
      )}

      <EditableContent onEdit={handleEditEmail} data-testid="editEmail">
        <Text as="p">{t('email')}</Text>
        <Text as="p" data-testid="email">
          {email}
        </Text>
      </EditableContent>
      <Modal
        open={showEditEmailModal}
        title="Edit email"
        onClose={handleCancelEditEmail}
        size="sm"
        dataTestId="edit-email"
      >
        <EditEmailModalContent
          onCancel={handleCancelEditEmail}
          onUpdate={handleUpdateEmail}
          isUpdatingEmail={isUpdatingEmail}
          error={errorUpdatingEmail}
        />
      </Modal>
      <Modal
        open={showEmailUpdateSuccess}
        title="Email updated"
        dismissible={false}
      >
        <EmailUpdateSuccessModalContent />
      </Modal>
      <EditableContent onEdit={handleEditPassword} data-testid="editPassword">
        <Text as="p">{t('password')}</Text>
        <Text as="p" data-testid="password">
          **********
        </Text>
      </EditableContent>
      <Modal
        open={showEditPasswordModal}
        title="Edit password"
        onClose={handleCancelEditPassword}
        size="sm"
        dataTestId="edit-password"
      >
        <EditPasswordModalContent
          onCancel={handleCancelEditPassword}
          onUpdate={handleUpdatePassword}
          isUpdatingPassword={isUpdatingPassword}
          error={errorUpdatingPassword}
          t={t}
        />
      </Modal>
    </MyAccountSection>
  );
}
