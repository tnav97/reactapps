import { Actions } from '../index';
import { generateRequest } from '../generateRequest';
import qs from 'querystring';

export const fetchOauthUrl = ({ domain }: { domain?: string }) => {
  return generateRequest({
    endpoint: `/api/auth/url?${qs.stringify({
      organizationIdentifier: domain,
    })}`,
    method: 'GET',
    types: [
      Actions.Auth.FetchOauthUrlPending,
      Actions.Auth.FetchOauthUrlCompleted,
      Actions.Auth.FetchOauthUrlFailed,
    ],
  });
};
