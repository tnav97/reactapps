import React, { useState } from 'react';
import { Menu, MenuItem } from '@mui/material';
import { MenuItemContent } from '../../MenuItemContent';
import { MemberDetails } from '../../../types';
import { TFunction } from 'i18next';
import DeleteOrganizationMemberModal from '../DeleteOrganizationMemberModal';
import DisableOrganizationMemberModal from '../DisableOrganizationMemberModal';
import CancelInvitationModal from '../CancelInvitationModal';
import ActivateOrganizationMemberModal from '../ActivateOrganizationMemberModal';
import { MemberStatus } from '../../../constants';
import { OutlinedIconType } from '@alcumus/components';
import ResendInvitationModal from '../ResendInvitationModal';
import SendInvitationModal from '../SendInvitationModal';

export interface KebabMenuProps {
  anchorEl: Element | null;
  t: TFunction;
  onClose: () => void;
  memberToEdit: MemberDetails;
  reload: () => void;
}

interface MenuItemProps {
  icon: OutlinedIconType;
  onClick: () => void;
  title: string;
  isEnabled: boolean;
  isCritical?: boolean;
  divider?: boolean;
}

export default function OrganizationMemberContextMenu({
  anchorEl,
  onClose,
  t,
  memberToEdit,
  reload,
}: KebabMenuProps) {
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);
  const [openDisableModal, setOpenDisableModal] = useState<boolean>(false);
  const [openCancelInvitationModal, setOpenCancelInvitationModal] =
    useState<boolean>(false);
  const [openSendInvitationModal, setOpenSendInvitationModal] =
    useState<boolean>(false);
  const [openResendInvitationModal, setOpenResendInvitationModal] =
    useState<boolean>(false);
  const [openActiveModal, setOpenActiveModal] = useState<boolean>(false);

  const sendInvitationOption: MenuItemProps = {
    icon: 'send',
    onClick: () => setOpenSendInvitationModal(true),
    title: t('sendInvitation'),
    isEnabled: true,
  };

  const resendInvitationOption: MenuItemProps = {
    icon: 'send',
    onClick: () => setOpenResendInvitationModal(true),
    title: t('resendInvitation'),
    isEnabled: true,
  };

  const cancelInvitationOption: MenuItemProps = {
    icon: 'cancel',
    onClick: () => setOpenCancelInvitationModal(true),
    title: t('cancelInvitation'),
    isEnabled: true,
  };

  const disableOption: MenuItemProps = {
    icon: 'do_disturb',
    onClick: () => setOpenDisableModal(true),
    title: t('disableUser'),
    isEnabled: true,
    divider: true,
  };

  const activateOption: MenuItemProps = {
    icon: 'check',
    onClick: () => setOpenActiveModal(true),
    title: t('activateUser'),
    isEnabled: true,
    divider: true,
  };

  const deleteOption: MenuItemProps = {
    icon: 'delete_outline',
    onClick: () => setOpenDeleteModal(true),
    title: t('deleteAccount'),
    isEnabled: true,
    isCritical: true,
  };
  function generateMenu(): MenuItemProps[] {
    switch (memberToEdit.memberStatus) {
      case MemberStatus.ACTIVE:
        return [disableOption, deleteOption];
      case MemberStatus.DISABLED:
        return [activateOption, deleteOption];
      case MemberStatus.PENDING_INVITE:
        return [sendInvitationOption, deleteOption];
      case MemberStatus.INVITE_EXPIRED:
        return [sendInvitationOption, deleteOption];
      case MemberStatus.PENDING_ACCEPTANCE:
        return [cancelInvitationOption, resendInvitationOption, deleteOption];
      case MemberStatus.CANCELED:
        return [sendInvitationOption, deleteOption];
      default:
        throw new Error('Unknown member status!');
    }
  }
  return (
    <>
      <DeleteOrganizationMemberModal
        isOpen={openDeleteModal}
        member={memberToEdit}
        onClose={() => {
          setOpenDeleteModal(false);
          onClose();
        }}
        onSuccess={() => {
          setOpenDeleteModal(false);
          onClose();
          reload();
        }}
      />
      <DisableOrganizationMemberModal
        isOpen={openDisableModal}
        member={memberToEdit}
        onClose={() => {
          setOpenDisableModal(false);
          onClose();
        }}
        onSuccess={() => {
          setOpenDisableModal(false);
          onClose();
          reload();
        }}
      />
      <CancelInvitationModal
        isOpen={openCancelInvitationModal}
        member={memberToEdit}
        onClose={() => {
          setOpenCancelInvitationModal(false);
          onClose();
        }}
        onSuccess={() => {
          setOpenCancelInvitationModal(false);
          onClose();
          reload();
        }}
      />

      <SendInvitationModal
        isOpen={openSendInvitationModal}
        member={memberToEdit}
        onClose={() => {
          setOpenSendInvitationModal(false);
          onClose();
        }}
        onSuccess={() => {
          setOpenSendInvitationModal(false);
          onClose();
          reload();
        }}
      />
      <ResendInvitationModal
        isOpen={openResendInvitationModal}
        member={memberToEdit}
        onClose={() => {
          setOpenResendInvitationModal(false);
          onClose();
        }}
        onSuccess={() => {
          setOpenResendInvitationModal(false);
          onClose();
          reload();
        }}
      />
      <ActivateOrganizationMemberModal
        isOpen={openActiveModal}
        member={memberToEdit}
        onClose={() => {
          setOpenActiveModal(false);
          onClose();
        }}
        onSuccess={() => {
          setOpenActiveModal(false);
          onClose();
          reload();
        }}
      />
      {
        <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={onClose}>
          {generateMenu().map((menuItem: MenuItemProps, i: number) => (
            <MenuItem
              key={i}
              onClick={menuItem.onClick}
              disabled={!menuItem.isEnabled}
              divider={menuItem.divider}
            >
              <MenuItemContent
                title={menuItem.title}
                icon={menuItem.icon}
                critical={menuItem.isCritical}
              />
            </MenuItem>
          ))}
        </Menu>
      }
    </>
  );
}
