import { Types } from '@alcumus/core';
import ExpressSession from 'express-session';
import { UpgradeTrialAccountRequestDto } from '../types/upgradeTrialAccountRequestDto';

interface ISession extends ExpressSession.Session {
  transferredSession?: UpgradeTrialAccountRequestDto | undefined;
  checkoutSessionId?: string;
}

export interface Request extends Types.Request {
  session: ISession;
}
