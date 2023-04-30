import { Types } from '@alcumus/core';
import { Router, Response } from 'express';
import { apiVersion } from '../../../common/constants/apiVersion';
import { RecentlyViewedDto } from '../../../dtos/RecentlyViewedDto';
import { get } from '../../../utilities/Api';
import { ProxyRequestHandler } from '../../../utilities/proxyRequestHandler';
import requireAccessToken from '../../models/middleware';

export default async function recentRouter(router: Router) {
  router.get(
    '/:reportType',
    requireAccessToken,
    async (req: Types.Request, res: Response) => {
      const headers = {
        Authorization: req.headers.authorization,
        Accept: 'application/json',
        'Content-Type': 'application/json',
        applicationKey: req.headers.applicationkey,
      };
      const request = new ProxyRequestHandler(
        'GET',
        `${apiVersion}/recentlyviewed/${req.params.reportType}`,
        {}
      ).proxyRequest();
      const reports: RecentlyViewedDto[] = await get({
        url: request.requestUrl,
        headers,
      });

      res.json(reports);
    }
  );
}
