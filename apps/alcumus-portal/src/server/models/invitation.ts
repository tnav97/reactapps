import { getAuthorizationHeader } from '../../lib/utils';
import { Utilities } from '@alcumus/core';

export async function deleteInvitation(
  accessToken: string,
  invitationId: number
) {
  const headers = getAuthorizationHeader(accessToken);
  await Utilities.sendAxiosPostRequest(
    Utilities.getApiUrl(`/users/api/v2/invitations/cancel`),
    {
      invitationId,
    },
    headers
  );
}

export async function sendInvitation(accessToken: string, memberId: number) {
  const headers = getAuthorizationHeader(accessToken);
  await Utilities.sendAxiosPostRequest(
    Utilities.getApiUrl('/users/api/v2/invitations/send'),
    {
      memberId,
    },
    headers
  );
}
