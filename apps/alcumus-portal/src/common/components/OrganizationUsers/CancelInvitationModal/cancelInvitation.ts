import axios, { AxiosError } from 'axios';
import { OrganizationMember, UpdateUserRequest } from '../../../types';
import { UpdateUserValidationError } from '../../EditUserModal/updateUser';

export async function cancelInvitation(member: OrganizationMember) {
  if (!member.organizationMemberId) {
    throw new Error('Organization member Id is not defined');
  }
  const updateUserDto: UpdateUserRequest = {
    userId: member.userId,
    firstName: member.firstName ? member.firstName : null,
    lastName: member.lastName ? member.lastName : null,
    email: member.emailAddress,
    roleId: member.roleId,
    applicationIds: [],
    organizationMemberId: member.organizationMemberId,
  };
  await axios.delete(`/api/invitations/${member.invitation?.invitationId}`);
  try {
    await axios.patch('/api/users', updateUserDto);
  } catch (e: any) {
    if (e.isAxiosError) {
      const err = e as AxiosError;

      if (err.response?.status === 400 || err.response?.status === 409) {
        throw new UpdateUserValidationError(err);
      }
    }
    throw e;
  }
}
