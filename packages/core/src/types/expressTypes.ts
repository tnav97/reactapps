import { Request as ExpressRequest } from 'express';
import ExpressSession from 'express-session';
import { Organization } from './servicesPayloadsV1';

interface IRequest extends ExpressRequest {
  id?: string;
  initialState?: any;
  user?: {
    userId?: number;
    organizationId?: number;
  };
  sessionID: string;
  translations?: object;
  detectedLanguage?: string;
}

export interface ISession extends ExpressSession.Session {
  userId?: number;
  isRootOrganizationMember?: boolean;
  accessToken?: string;
  currentOrganization?: Organization;
  user?: {
    firstName?: string;
    lastName?: string;
    email?: string;
    username?: string;
  };
  tokens?: {
    accessToken: string;
    expiresIn: string;
    refreshToken: string;
  };
  csrfToken?: string;
}

export interface Request extends IRequest {
  session: ISession;
}
