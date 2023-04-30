import { TFunction } from 'i18next';
import React from 'react';
import { OrganizationMember } from '../../../types';
import { deleteOrganizationMember } from './deleteOrganizationMember';
import ConfirmModal from '../../ConfirmModal';

export interface DeleteOrganizationMemberModalProps {
  t: TFunction;
  onClose: () => void;
  member: OrganizationMember;
  isOpen: boolean;
  onSuccess: () => void;
}

export function DeleteOrganizationMemberModal({
  t,
  onClose,
  member,
  isOpen,
  onSuccess,
}: DeleteOrganizationMemberModalProps) {
  const { firstName, lastName, emailAddress } = member;
  const hasName = firstName || lastName;
  const messages = {
    successMessage: hasName
      ? t('successDeletingMember.memberWithNameHasBeenDeleted', {
          firstName,
          lastName,
        })
      : t('successDeletingMember.memberWithEmailAddressHasBeenDeleted', {
          emailAddress,
        }),
    errorMessage: hasName
      ? t('errorDeletingMember.couldNotDeleteMemberWithName', {
          firstName,
          lastName,
        })
      : t('errorDeletingMember.couldNotDeleteMemberWithEmailAddress', {
          emailAddress,
        }),
    confirmMessage: hasName
      ? t('confirmMemberDelete.deleteMemberWithName', {
          firstName,
          lastName,
        })
      : t('confirmMemberDelete.deleteMemberWithEmailAddress', {
          emailAddress,
        }),
    headerText: t('deleteUser'),
    bodyText: t('immediateEffect'),
  };
  return (
    <ConfirmModal
      isOpen={isOpen}
      messages={messages}
      onClose={onClose}
      onSuccess={onSuccess}
      confirmAction={() =>
        deleteOrganizationMember(Number(member.organizationMemberId))
      }
      isConfirmButtonCritical
      icon="error_outline"
      confirmButtonText={messages.headerText}
      size="sm"
    />
  );
}
