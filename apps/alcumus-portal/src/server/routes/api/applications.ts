import { Response, Router } from 'express';
import { Types } from '@alcumus/core';
import { getAccessToken } from '../../../lib/utils/getAccessToken';
import { getProductCategories, getProducts } from '../../models/products';
import { getActiveApplicationsForMember } from '../../models/applications';

export default async function applications(router: Router) {
  router.get('/', async (req: Types.Request, res: Response) => {
    const accessToken = getAccessToken(req);
    const applications = await getProducts(accessToken);
    res.json({ applications });
  });

  router.get('/categories', async (req: Types.Request, res: Response) => {
    const accessToken = getAccessToken(req);
    const categories = await getProductCategories(accessToken);
    res.json({ categories });
  });

  router.get(
    '/:memberId/activeApplications',
    async (req: Types.Request, res: Response) => {
      const accessToken = getAccessToken(req);
      const activeApplications = await getActiveApplicationsForMember(
        accessToken,
        Number(req.params.memberId)
      );

      res.json(activeApplications);
    }
  );
}
