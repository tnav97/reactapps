import { TFunction } from 'i18next';
import React from 'react';
import { OrganizationMember } from '../../../types';
import { activateOrganizationMember } from './activateOrganizationMember';
import ConfirmModal from '../../ConfirmModal';

export interface ActivateOrganizationMemberModalProps {
  t: TFunction;
  onClose: () => void;
  onSuccess: () => void;
  member: OrganizationMember;
  isOpen: boolean;
}

export function ActivateOrganizationMemberModal({
  t,
  onClose,
  onSuccess,
  member,
  isOpen,
}: ActivateOrganizationMemberModalProps) {
  const { firstName, lastName, emailAddress } = member;
  const hasName = firstName || lastName;
  const messages = {
    successMessage: hasName
      ? t('memberActivationSuccess.memberWithNameHasBeenActivated', {
          firstName,
          lastName,
        })
      : t('memberActivationSuccess.memberWithEmailAddressHasBeenActivated', {
          emailAddress,
        }),
    errorMessage: hasName
      ? t('memberActivationError.couldNotActivateMemberWithName', {
          firstName,
          lastName,
        })
      : t('memberActivationError.couldNotActiveMemberWithEmailAddress', {
          emailAddress,
        }),
    confirmMessage: hasName
      ? t('confirmMemberActivation.activateMemberWithName', {
          firstName,
          lastName,
        })
      : t('confirmMemberActivation.activateMemberWithEmailAddress', {
          emailAddress,
        }),
    headerText: t('activateUser'),
    bodyText: t('immediateEffect'),
  };

  return (
    <ConfirmModal
      isOpen={isOpen}
      messages={messages}
      onClose={onClose}
      onSuccess={onSuccess}
      confirmAction={() =>
        activateOrganizationMember(
          {
            isEnabled: true,
            organizationId: member.organizationId,
          },
          Number(member.organizationMemberId)
        )
      }
      confirmButtonText={messages.headerText}
      size="sm"
    />
  );
}
