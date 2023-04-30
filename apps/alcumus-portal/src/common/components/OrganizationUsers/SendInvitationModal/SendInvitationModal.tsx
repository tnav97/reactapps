import { TFunction } from 'i18next';
import React from 'react';
import { OrganizationMember } from '../../../types';
import { sendInvitation } from './sendInvitation';
import ConfirmModal from '../../ConfirmModal';

export interface SendInvitationModalProps {
  t: TFunction;
  onClose: () => void;
  onSuccess: () => void;
  member: OrganizationMember;
  isOpen: boolean;
}

export function SendInvitationModal({
  t,
  onClose,
  onSuccess,
  member,
  isOpen,
}: SendInvitationModalProps) {
  const { firstName, lastName, emailAddress } = member;
  const hasName = firstName || lastName;
  const messages = {
    successMessage: hasName
      ? t('successSendingInvitation.invitationForMemberWithNameHasBeenSent', {
          firstName,
          lastName,
        })
      : t(
          'successSendingInvitation.invitationForMemberWithEmailAddressHasBeenSent',
          {
            emailAddress,
          }
        ),
    errorMessage: hasName
      ? t('errorSendingInvitation.couldNotSendInvitationForMemberWithName', {
          firstName,
          lastName,
        })
      : t(
          'errorSendingInvitation.couldNotSendInvitationForMemberWithEmailAddress',
          {
            emailAddress,
          }
        ),
    confirmMessage: hasName
      ? t('confirmSendInvitation.sendInvitationForMemberWithName', {
          firstName,
          lastName,
        })
      : t('confirmSendInvitation.sendInvitationForMemberWithEmailAddress', {
          emailAddress,
        }),
    headerText: t('sendInvitation'),
  };
  return (
    <ConfirmModal
      isOpen={isOpen}
      messages={messages}
      onClose={onClose}
      onSuccess={onSuccess}
      confirmAction={() =>
        sendInvitation(member.organizationMemberId as number)
      }
      icon="error_outline"
      isConfirmButtonCritical
      confirmButtonText={messages.headerText}
      size="sm"
    />
  );
}
