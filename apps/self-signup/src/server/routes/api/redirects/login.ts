import { Request, Response, Router } from 'express';
import { getECMSWebUrl } from '../../../../lib/utils/getECMSApiUrl';

export default async (router: Router) => {
  router.get('/', (request: Request, response: Response) => {
    response.redirect(getECMSWebUrl('/Login') || '/');
  });
};
