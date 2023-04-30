import React, { useCallback, useEffect, useState } from 'react';
import { Avatar } from '@mui/material';
import { makeStyles } from '@mui/styles';
import {
  AlertSnackbar,
  Modal,
  StyleVariables,
  Text,
} from '@alcumus/components';
import MyAccountSection from '../MyAccountSection';
import { TFunction } from 'i18next';
import clsx from 'clsx';
import EditUserProfile from './EditUserProfile';

const useStyles = makeStyles({
  userProfileSection: {
    color: StyleVariables.colors.text.default,
  },
  nameValues: {
    display: 'flex',
    marginTop: StyleVariables.spacing(0.5),
    '& > *': {
      marginRight: StyleVariables.spacing(2),
    },
  },
  avatar: { width: '104px', height: '104px', marginBottom: '24px' },
});

export interface UserProfileViewProps {
  firstName?: string;
  lastName?: string;
  className?: string;
  t: TFunction;
  errorUpdatingProfile?: string;
  profileUpdated?: boolean;
  isUpdatingProfile?: boolean;
  isFetching?: boolean;
  updateProfile: (updatedFirstName?: string, updatedLastName?: string) => void;
  fetchUserProfile: () => void;
  resetProfileUpdateStatus: () => void;
}

export default function UserProfileView({
  firstName,
  lastName,
  className,
  t,
  errorUpdatingProfile = undefined,
  updateProfile,
  fetchUserProfile,
  resetProfileUpdateStatus,
  profileUpdated = false,
  isUpdatingProfile = false,
}: UserProfileViewProps) {
  const classes = useStyles();

  const [showEditProfileModal, setShowEditProfileModal] =
    useState<boolean>(false);
  const [showSnackBar, setShowSnackBar] = useState<boolean>(false);

  const onCloseSnackBar = useCallback(
    () => setShowSnackBar(false),
    [showSnackBar]
  );

  const onCancelUserProfileEdit = useCallback(() => {
    setShowEditProfileModal(false);
  }, [showEditProfileModal]);

  const onUserProfileUpdate = useCallback(
    (updatedFirstName?: string, updatedLastName?: string) => {
      updateProfile(updatedFirstName, updatedLastName);
    },
    []
  );

  const handleEdit = useCallback(() => {
    setShowEditProfileModal(true);
  }, [showEditProfileModal]);

  useEffect(() => {
    if (!showEditProfileModal && profileUpdated) {
      setShowSnackBar(true);
    }
  }, [showEditProfileModal, profileUpdated]);

  useEffect(() => {
    if (showEditProfileModal && profileUpdated) {
      resetProfileUpdateStatus();
      setShowEditProfileModal(false);
    }
  }, [showEditProfileModal, profileUpdated]);

  useEffect(() => {
    if (showSnackBar) setTimeout(() => setShowSnackBar(false), 3000);
  }, [showSnackBar]);

  useEffect(() => {
    if (!isUpdatingProfile && !errorUpdatingProfile && profileUpdated) {
      fetchUserProfile();
    }
  }, [
    isUpdatingProfile,
    errorUpdatingProfile,
    profileUpdated,
    fetchUserProfile,
  ]);

  return (
    <MyAccountSection
      className={clsx(classes.userProfileSection, className)}
      header="User profile"
      subHeader="This information will be displayed on your public profile."
      editable
      onEdit={handleEdit}
      data-testid="EditUserProfileButton"
    >
      <Avatar className={classes.avatar} src="/icons/Profile.svg" />
      <div className={classes.nameValues}>
        <div>
          <Text as="small">{t('firstName')}</Text>
          <Text as="h6" data-testid="firstName">
            {firstName}
          </Text>
        </div>
        <div>
          <Text as="small">{t('lastName')}</Text>
          <Text as="h6" data-testid="lastName">
            {lastName}
          </Text>
        </div>
      </div>
      <Modal
        open={showEditProfileModal}
        title={t('editUserProfile')}
        onClose={onCancelUserProfileEdit}
        size="sm"
        dataTestId="edit-user-profile-modal"
      >
        <EditUserProfile
          firstName={firstName || ''}
          lastName={lastName || ''}
          onCancel={onCancelUserProfileEdit}
          onUpdate={onUserProfileUpdate}
          error={errorUpdatingProfile}
          isUpdatingProfile={isUpdatingProfile}
        />
      </Modal>
      <AlertSnackbar
        open={showSnackBar}
        message={t('successMessage')}
        severity="success"
        onClose={onCloseSnackBar}
      />
    </MyAccountSection>
  );
}
