import { Request, Response, Router } from 'express';
import { getRedisSingleton } from '../../../../lib/utils/redisSingleton';
import { v4 as uuidV4 } from 'uuid';
import {
  SESSION_TRANSFER_REDIS_KEY_PREFIX,
  SESSION_TRANSFER_TIMEOUT_IN_MS,
} from '../../../../common/constants/sessionTransfer';
import { Constants } from '@alcumus/core';
import { EnvironmentVariables } from '../../../../common/constants/environmentVariables';

export default function initiate(router: Router) {
  router.post('/', async (req: Request, res: Response) => {
    const sessionId = uuidV4();

    if (
      req.headers[Constants.RequestHeaders.ApiKey] !==
      EnvironmentVariables.sessionTransferSecret()
    ) {
      // Ensure the request has the valid API Key
      res.status(401).json({
        errorId: 'createSession.invalidApiKey',
        message: 'Create Session: Invalid API Key',
      });
      return;
    }

    await getRedisSingleton().set(
      `${SESSION_TRANSFER_REDIS_KEY_PREFIX}_${sessionId}`,
      SESSION_TRANSFER_TIMEOUT_IN_MS,
      JSON.stringify(req.body)
    );

    res.status(201).json({
      sessionId,
      url: `/api/sessionTransfer/handover?sessionId=${sessionId}`,
    });
  });
}
