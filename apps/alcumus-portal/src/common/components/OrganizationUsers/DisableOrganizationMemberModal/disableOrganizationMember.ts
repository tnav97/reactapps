import axios from 'axios';
import { OrganizationMemberStatusRequest } from '../../../types';

export async function disableOrganizationMember(
  disableMemberDto: OrganizationMemberStatusRequest,
  memberId: number
) {
  return await axios.patch(
    `/api/members/${memberId}/disable`,
    disableMemberDto
  );
}
