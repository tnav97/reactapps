import { Types } from '@alcumus/core';

export function getAccessToken(req: Types.Request): string {
  const accessToken = req.session?.accessToken;

  if (!accessToken) {
    throw new Error('Access token not present in session');
  }

  return accessToken;
}

export function getAccessTokenIfPresent(
  req: Types.Request
): string | undefined {
  return req.session.accessToken;
}
