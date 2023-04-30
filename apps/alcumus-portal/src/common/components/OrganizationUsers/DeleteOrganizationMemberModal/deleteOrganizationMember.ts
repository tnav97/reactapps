import axios from 'axios';

export async function deleteOrganizationMember(memberId: number) {
  return await axios.delete(`/api/members/${memberId}/delete`);
}
