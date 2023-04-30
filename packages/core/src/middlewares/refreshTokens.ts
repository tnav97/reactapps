import { NextFunction, Response } from 'express';
import { getApiUrl, sendAxiosPostRequest } from '../utils';
import { Request } from '../types';
import { Constants } from '..';
import ProcessEnv from '../utils/processEnv';

export default async function refreshTokens(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { refreshToken } = req.body;
  const accessToken = req.headers[
    Constants.RequestHeaders.AccessToken
  ] as string;
  if (!refreshToken || !accessToken) {
    res.sendStatus(401);
  } else {
    try {
      const headers = {
        [Constants.RequestHeaders.AccessToken]: accessToken,
        [Constants.RequestHeaders.ApiKey]:
          ProcessEnv.getValueOrThrow('SERVICES_API_KEY'),
      };
      const { data, status } = await sendAxiosPostRequest(
        getApiUrl('/auth/api/v1/tokens/refresh'),
        { refreshToken },
        headers
      );
      if (status === 200) {
        // Refresh the ongoing session on server side
        req.session.touch();
        req.session.accessToken = accessToken;
        // Return fresh tokens
        res.json(data);
      } else {
        res.sendStatus(403);
      }
    } catch (err: any) {
      console.error(`Refreshing tokens failed: ${err.message}`);
      if (err.isAxiosError) {
        res.status(err.response?.status || 403).json({
          message: 'Unable to refresh tokens',
        });
      } else {
        res.status(500).json({ message: 'Server failed to refresh tokens' });
      }
    }
    next();
  }
}
