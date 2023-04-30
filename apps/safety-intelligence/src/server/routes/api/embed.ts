import { Types } from '@alcumus/core';
import axios from 'axios';
import { Router, Response } from 'express';
import { apiVersion } from '../../../common/constants/apiVersion';
import { get } from '../../../utilities/Api';
import { ProxyRequestHandler } from '../../../utilities/proxyRequestHandler';
import requireAccessToken from '../../models/middleware';

type EmbedReportProps = {
  uri: string;
};

export default async function embedUriRouter(router: Router) {
  router.get(
    '/dashboard/:dashboardId',
    requireAccessToken,
    async (req: Types.Request, res: Response) => {
      const headers = {
        Authorization: req.headers.authorization as string,
        Accept: 'application/json',
        'Content-Type': 'application/json',
        applicationKey: req.headers.applicationkey as string,
      };

      const siteFilterString = req.query.siteFilterString || '';

      const url = new ProxyRequestHandler(
        'GET',
        `${apiVersion}/dashboards/embed?dashboardId=${req.params.dashboardId}&isExternalEmbed=false${siteFilterString}`,
        {}
      ).proxyRequest();

      const response = await get<EmbedReportProps>({
        url: url.requestUrl,
        headers,
      });

      res.json(response);
    }
  );

  router.get(
    '/look/:lookId',
    requireAccessToken,
    async (req: Types.Request, res: Response) => {
      const headers = {
        Authorization: req.headers.authorization as string,
        Accept: 'application/json',
        'Content-Type': 'application/json',
        applicationKey: req.headers.applicationkey as string,
      };

      const url = new ProxyRequestHandler(
        'GET',
        `${apiVersion}/looks/embed/${req.params.lookId}`,
        {}
      ).proxyRequest();

      const response = await get<EmbedReportProps>({
        url: url.requestUrl,
        headers,
      });

      res.json(response);
    }
  );

  router.get(
    '/explore/:model/:dataSource',
    requireAccessToken,
    async (req: Types.Request, res: Response) => {
      const { model, dataSource } = req.params;
      const headers = {
        Authorization: req.headers.authorization as string,
        Accept: 'application/json',
        'Content-Type': 'application/json',
        applicationKey: req.headers.applicationkey as string,
      };

      const request = new ProxyRequestHandler(
        'GET',
        `${apiVersion}/explores/embed/${model}/${dataSource}`,
        {}
      ).proxyRequest();

      const { data } = await axios.get(request.requestUrl, { headers });

      res.json(data);
    }
  );
}
