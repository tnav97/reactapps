import { Types } from '@alcumus/core';
import { Router, Response } from 'express';
import { apiVersion } from '../../../common/constants/apiVersion';
import { RecentlyViewedDto } from '../../../dtos/RecentlyViewedDto';
import { get, post } from '../../../utilities/Api';
import { ProxyRequestHandler } from '../../../utilities/proxyRequestHandler';
import requireAccessToken from '../../models/middleware';

export default async function popularRouter(router: Router) {
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
        `${apiVersion}/popular/${req.params.reportType}`,
        {}
      ).proxyRequest();
      const reports: RecentlyViewedDto[] = await get({
        url: request.requestUrl,
        headers,
      });

      res.json(reports);
    }
  );

  router.post(
    '/:reportType',
    requireAccessToken,
    async (req: Types.Request, res: Response) => {
      const reportId = req.body;
      const headers = {
        Authorization: req.headers.authorization,
        Accept: 'application/json',
        'Content-Type': 'application/json',
        applicationKey: req.headers.applicationkey,
      };
      const request = new ProxyRequestHandler(
        'POST',
        `${apiVersion}/popular/${req.params.reportType}`,
        { reportId }
      ).proxyRequest();
      const reports: RecentlyViewedDto[] = await post({
        url: request.requestUrl,
        headers,
        data: request,
      });

      res.json(reports);
    }
  );
}
