import { Router, Response } from 'express';
import extendFreeTrial from '../../models/extendFreeTrial';
import { Request } from '../../types';
import { ExtendFreeTrialRequestDto } from '../../models/freeTrialExpiredResponseDto';

export default async (router: Router) => {
  router.post('/', async (req: Request, res: Response) => {
    if (!req.session.invitationCode) {
      res.status(401).json({ message: 'Unauthorized' });
      return;
    }
    const { duration } = req.body;
    const extendFreeTrialData: ExtendFreeTrialRequestDto = {
      duration,
      invitationCode: req.session.invitationCode,
    };
    res.json({
      success: await extendFreeTrial(extendFreeTrialData),
    });
  });
};
