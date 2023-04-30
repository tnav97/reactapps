import { Types } from '@alcumus/core';
import axios from 'axios';
import { Router, Response } from 'express';
import { apiVersion } from '../../../common/constants/apiVersion';
import { LookQueryDto } from '../../../dtos/lookDto';
import { post, get } from '../../../utilities/Api';
import { ProxyRequestHandler } from '../../../utilities/proxyRequestHandler';
import { searchLooksWithSyncUserAndRecentView } from '../../models/look';
import requireAccessToken from '../../models/middleware';

export default async function lookRouter(router: Router) {
  router.get(
    '/getLooks',
    requireAccessToken,
    async (req: Types.Request, res: Response) => {
      const response = await searchLooksWithSyncUserAndRecentView({});
      res.json(response);
    }
  );

  router.post(
    '/search',
    requireAccessToken,
    async (req: Types.Request, res: Response) => {
      const headers = {
        Authorization: req.headers.authorization as string,
        Accept: 'application/json',
        'Content-Type': 'application/json',
        applicationKey: req.headers.applicationkey as string,
      };
      const request = new ProxyRequestHandler(
        'POST',
        `${apiVersion}/looks/search`,
        req.body.searchOptions
      ).proxyRequest();
      const looks = await post({
        url: request.requestUrl,
        data: request,
        headers,
      });

      res.json(looks);
    }
  );

  router.get(
    '/embed/:lookId',
    requireAccessToken,
    async (req: Types.Request, res: Response) => {
      const headers = {
        Authorization: req.headers.authorization as string,
        Accept: 'application/json',
        'Content-Type': 'application/json',
        applicationKey: req.headers.applicationkey as string,
      };
      const request = new ProxyRequestHandler(
        'GET',
        `${apiVersion}/looks/embed/${req.params.lookId}`,
        {}
      ).proxyRequest();
      const response = await get({
        url: request.requestUrl,
        headers,
      });

      res.json(response);
    }
  );

  router.get(
    '/:lookId',
    requireAccessToken,
    async (req: Types.Request, res: Response) => {
      const headers = {
        Authorization: req.headers.authorization as string,
        Accept: 'application/json',
        'Content-Type': 'application/json',
        applicationKey: req.headers.applicationkey as string,
      };
      const request = new ProxyRequestHandler(
        'GET',
        `${apiVersion}/looks/${req.params.lookId}`,
        {
          fields: LookQueryDto.QUERY_FIELDS,
        }
      ).proxyRequest();
      const response = await get({
        url: request.requestUrl,
        headers,
      });

      res.json(response);
    }
  );

  router.post(
    '/',
    requireAccessToken,
    async (req: Types.Request, res: Response) => {
      const look = req.body;
      const headers = {
        Authorization: req.headers.authorization as string,
        Accept: 'application/json',
        'Content-Type': 'application/json',
        applicationKey: req.headers.applicationkey as string,
      };
      const request = new ProxyRequestHandler(
        'POST',
        `${apiVersion}/looks/`,
        {},
        look
      ).proxyRequest();
      const { data } = await axios.post(
        request.requestUrl,
        request.requestContent,
        { headers }
      );

      res.json(data);
    }
  );
}
