import { Request as ExpressRequest } from 'express';
import ExpressSession from 'express-session';

interface ISession extends ExpressSession.Session {
  invitationCode?: string;
}

export interface Request extends ExpressRequest {
  session: ISession;
}
