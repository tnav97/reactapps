import { TFunction } from 'i18next';
import React from 'react';
import { OrganizationMember } from '../../../types';
import { cancelInvitation } from './cancelInvitation';
import ConfirmModal from '../../ConfirmModal';

export interface CancelInvitationModalProps {
  t: TFunction;
  onClose: () => void;
  onSuccess: () => void;
  member: OrganizationMember;
  isOpen: boolean;
}

export function CancelInvitationModal({
  t,
  onClose,
  onSuccess,
  member,
  isOpen,
}: CancelInvitationModalProps) {
  const { firstName, lastName, emailAddress } = member;
  const hasName = firstName || lastName;
  const messages = {
    successMessage: hasName
      ? t(
          'successCancelingInvitation.invitationForMemberWithNameHasBeenCanceled',
          {
            firstName,
            lastName,
          }
        )
      : t(
          'successCancelingInvitation.invitationForMemberWithEmailAddressHasBeenCanceled',
          {
            emailAddress,
          }
        ),
    errorMessage: hasName
      ? t(
          'errorCancelingInvitation.couldNotCancelInvitationForMemberWithName',
          {
            firstName,
            lastName,
          }
        )
      : t(
          'errorCancelingInvitation.couldNotCancelInvitationForMemberWithEmailAddress',
          {
            emailAddress,
          }
        ),
    confirmMessage: hasName
      ? t('confirmCancelInvitation.cancelInvitationForMemberWithName', {
          firstName,
          lastName,
        })
      : t('confirmCancelInvitation.cancelInvitationForMemberWithEmailAddress', {
          emailAddress,
        }),
    headerText: t('cancelInvitation'),
  };
  return (
    <ConfirmModal
      isOpen={isOpen}
      messages={messages}
      onClose={onClose}
      onSuccess={onSuccess}
      confirmAction={() => cancelInvitation(member)}
      icon="error_outline"
      isConfirmButtonCritical
      confirmButtonText={messages.headerText}
      size="sm"
    />
  );
}
