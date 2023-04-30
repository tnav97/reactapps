import { Request, Response, Router } from 'express';
import { getECMSWebUrl } from '../../../../lib/utils/ecmsEnvURLs';

export default async (router: Router) => {
  router.get('/', (request: Request, response: Response) => {
    response.redirect(getECMSWebUrl('') || '/');
  });
};
