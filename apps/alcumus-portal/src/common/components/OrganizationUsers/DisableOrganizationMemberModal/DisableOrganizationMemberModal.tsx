import { TFunction } from 'i18next';
import React from 'react';
import { OrganizationMember } from '../../../types';
import { disableOrganizationMember } from './disableOrganizationMember';
import ConfirmModal from '../../ConfirmModal';

export interface DisableOrganizationMemberModalProps {
  t: TFunction;
  onClose: () => void;
  member: OrganizationMember;
  isOpen: boolean;
  onSuccess: () => void;
}

export function DisableOrganizationMemberModal({
  t,
  onClose,
  member,
  isOpen,
  onSuccess,
}: DisableOrganizationMemberModalProps) {
  const { firstName, lastName, emailAddress } = member;
  const hasName = firstName || lastName;
  const messages = {
    successMessage: hasName
      ? t('successDisablingMember.memberWithNameHasBeenDisabled', {
          firstName,
          lastName,
        })
      : t('successDisablingMember.memberWithEmailAddressHasBeenDisabled', {
          emailAddress,
        }),
    errorMessage: hasName
      ? t('errorDisablingMember.couldNotDisableMemberWithName', {
          firstName,
          lastName,
        })
      : t('errorDisablingMember.couldNotDisableMemberWithEmailAddress', {
          emailAddress,
        }),
    confirmMessage: hasName
      ? t('confirmMemberDisable.disableMemberWithName', {
          firstName,
          lastName,
        })
      : t('confirmMemberDisable.disableMemberWithEmailAddress', {
          emailAddress,
        }),
    headerText: t('disableUser'),
    bodyText: t('immediateEffect'),
  };
  return (
    <ConfirmModal
      isOpen={isOpen}
      messages={messages}
      onClose={onClose}
      onSuccess={onSuccess}
      confirmAction={() =>
        disableOrganizationMember(
          {
            isEnabled: false,
            organizationId: member.organizationId,
          },
          Number(member.organizationMemberId)
        )
      }
      icon="warning_amber"
      confirmButtonText={messages.headerText}
      size="sm"
    />
  );
}
