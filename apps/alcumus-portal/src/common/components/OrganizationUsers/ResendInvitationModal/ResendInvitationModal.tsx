import { TFunction } from 'i18next';
import React from 'react';
import { OrganizationMember } from '../../../types';
import { sendInvitation } from './../SendInvitationModal/sendInvitation';
import ConfirmModal from '../../ConfirmModal';

export interface ResendInvitationModalProps {
  t: TFunction;
  onClose: () => void;
  onSuccess: () => void;
  member: OrganizationMember;
  isOpen: boolean;
}

export function ResendInvitationModal({
  t,
  onClose,
  onSuccess,
  member,
  isOpen,
}: ResendInvitationModalProps) {
  const { firstName, lastName, emailAddress } = member;
  const hasName = firstName || lastName;
  const messages = {
    successMessage: hasName
      ? t(
          'successResendingInvitation.invitationForMemberWithNameHasBeenResent',
          {
            firstName,
            lastName,
          }
        )
      : t(
          'successResendingInvitation.invitationForMemberWithEmailAddressHasBeenResent',
          {
            emailAddress,
          }
        ),
    errorMessage: hasName
      ? t(
          'errorResendingInvitation.couldNotResendInvitationForMemberWithName',
          {
            firstName,
            lastName,
          }
        )
      : t(
          'errorResendingInvitation.couldNotResendInvitationForMemberWithEmailAddress',
          {
            emailAddress,
          }
        ),
    confirmMessage: hasName
      ? t('confirmResendInvitation.resendInvitationForMemberWithName', {
          firstName,
          lastName,
        })
      : t('confirmResendInvitation.resendInvitationForMemberWithEmailAddress', {
          emailAddress,
        }),
    headerText: t('resendInvitation'),
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
