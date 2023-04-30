import { Response, Router } from 'express';
import { getRedisSingleton } from '../../../../lib/utils/redisSingleton';
import { Request } from '../../../sessionTypes';
import { SESSION_TRANSFER_REDIS_KEY_PREFIX } from '../../../../common/constants/sessionTransfer';

export default function handover(router: Router) {
  router.get('/', async (req: Request, res: Response) => {
    const sessionId = req.query.sessionId;

    if (!sessionId) {
      res.status(401).json({
        errorId: 'hydrateSession.sessionIdRequired',
        message: 'Session hydration failed: Session ID Required',
      });
      return;
    }

    const value = await getRedisSingleton().getAndDelete(
      `${SESSION_TRANSFER_REDIS_KEY_PREFIX}_${sessionId}`
    );

    if (!value) {
      res.status(401).json({
        errorId: 'hydrateSession.invalidSessionId',
        message: 'Session hydration failed: Invalid / Expired Session ID',
      });
      return;
    }

    req.session.transferredSession = JSON.parse(value);

    res.status(302).redirect('/plans');
  });
}
