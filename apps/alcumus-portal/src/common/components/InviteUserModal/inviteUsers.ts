import axios from 'axios';
import { InviteUserRequest } from '../../types';

export async function postInviteUsers(inviteUsers: Array<InviteUserRequest>) {
  await axios.post('/api/users/invite', { invitationRequest: inviteUsers });
}
