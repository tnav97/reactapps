import axios from 'axios';

export async function sendInvitation(memberId: number) {
  return await axios.post(`/api/invitations`, { memberId });
}
