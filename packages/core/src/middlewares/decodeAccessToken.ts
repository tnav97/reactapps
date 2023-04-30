import { Response, NextFunction } from 'express';
import { RequestHeaders } from '../constants';
import { DecodedUserInfo } from './types';
import { getApiUrl, sendAxiosGetRequest } from '../utils';
import { Request } from '../types';

function decodeToken(encodedUserInfo?: string): DecodedUserInfo {
  if (!encodedUserInfo) {
    return {};
  }
  try {
    const buffer = Buffer.from(encodedUserInfo, 'base64');
    const decodedString = buffer.toString('utf8');
    return JSON.parse(decodedString);
  } catch (error) {
    return {};
  }
}

/**
 * Decodes user information from x-access-token if found in request header and injects it into req.user
 */
export default function decodeAccessToken(useAzureAd = false) {
  return async (req: Request, res: Response, next: NextFunction) => {
    const accessToken = req.headers[RequestHeaders.AccessToken] as string;
    if (accessToken?.length) {
      if (!useAzureAd) {
        const [, userInfoToken] = accessToken.split('.');
        const { userId, organizationId } = decodeToken(userInfoToken);
        req.session.userId = userId;
        req.user = { userId, organizationId };
      } else {
        try {
          // Users logged in with AzureAD would need to be fetched from database based on their access token
          // as the accessToken itself does not have a direct mapping of the user's id
          // Fetching user on every request can impact performance, hence storing userId into session in the first fetch is required
          if (!req.session.userId) {
            const { data: user } = await sendAxiosGetRequest(
              getApiUrl('/users/api/v1/me'),
              {
                Authorization: `Bearer ${accessToken}`,
              }
            );
            req.session.userId = user.id;
          }
          req.user = { userId: req.session.userId };
        } catch (err) {
          console.log('Error decoding user', err);
          res.sendStatus(401);
          return;
        }
      }
    }

    next();
  };
}
