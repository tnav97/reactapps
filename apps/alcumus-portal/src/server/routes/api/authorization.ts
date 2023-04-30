import { Types } from '@alcumus/core';
import { Response, Router } from 'express';
import { getAccessToken } from '../../../lib/utils/getAccessToken';
import { getAllRoles } from '../../models/authorization';

export default async function authorization(router: Router) {
  router.get('/roles', async (req: Types.Request, res: Response) => {
    const accessToken = getAccessToken(req);
    res.json(await getAllRoles(accessToken));
  });
}
