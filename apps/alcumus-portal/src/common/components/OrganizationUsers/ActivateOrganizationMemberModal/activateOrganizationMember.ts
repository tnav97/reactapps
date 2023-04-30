import axios from 'axios';
import { OrganizationMemberStatusRequest } from '../../../types';

export async function activateOrganizationMember(
  enableMemberDto: OrganizationMemberStatusRequest,
  memberId: number
) {
  return await axios.patch(`/api/members/${memberId}/enable`, enableMemberDto);
}
