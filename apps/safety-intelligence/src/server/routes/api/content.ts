import { Router, Response } from 'express';
import { Types } from '@alcumus/core';
import { apiVersion } from '../../../common/constants/apiVersion';
import { ProxyRequest } from '../../../domain/proxyRequest';
import { ContentFavoriteDto } from '../../../dtos/ContentFavoriteDto';
import { del, get, post } from '../../../utilities/Api';
import { ProxyRequestHandler } from '../../../utilities/proxyRequestHandler';
import requireAccessToken from '../../models/middleware';

export default async function ContentRouter(router: Router) {
  router.post(
    '/favorite',
    requireAccessToken,
    async (req: Types.Request, res: Response) => {
      const { contentFavorite } = req.body;
      const request = new ProxyRequestHandler(
        'POST',
        `${apiVersion}/content/favorite`,
        {},
        contentFavorite
      ).proxyRequest();

      const headers = {
        Authorization: req.headers.authorization,
        Accept: 'application/json',
        'Content-Type': 'application/json',
        applicationKey: req.headers.applicationkey,
      };

      const newContentFavorite = await post<ContentFavoriteDto, any>({
        url: request.requestUrl,
        data: request.requestContent,
        headers,
      });

      res.json(newContentFavorite);
    }
  );

  router.get(
    '/thumbnail',
    requireAccessToken,
    async (req: Types.Request, res: Response) => {
      const { type, contentId } = req.query;
      const headers = {
        Authorization: req.headers.authorization,
        Accept: 'application/json',
        applicationKey: req.headers.applicationkey,
      };

      const request = new ProxyRequestHandler(
        'GET',
        `${apiVersion}/content/thumbnail/${type}/${contentId}`,
        {}
      ).proxyRequest();
      const response = await get({
        url: request.requestUrl,
        headers,
      });
      res.json(response);
    }
  );

  router.delete(
    '/favorite/:contentFavoriteId',
    requireAccessToken,
    async (req: Types.Request, res: Response) => {
      const headers = {
        Authorization: req.headers.authorization,
        Accept: 'application/json',
        applicationKey: req.headers.applicationkey,
      };

      const request = new ProxyRequestHandler(
        'DELETE',
        `${apiVersion}/content/favorite/${req.params.contentFavoriteId}`,
        {}
      ).proxyRequest();
      const response = await del<any>({
        url: request.requestUrl,
        headers,
      });
      res.json(response);
    }
  );

  router.get(
    '/thumbnail/type',
    requireAccessToken,
    async (req: Types.Request, res: Response) => {
      const headers = {
        Authorization: req.headers.authorization,
        Accept: 'application/json',
        'Content-Type': 'image/svg+xml',
        applicationKey: req.headers.applicationkey,
      };

      const request = new ProxyRequestHandler(
        'GET',
        `/content_thumbnail/${req.params.type}/${req.params.contentId}`,
        {}
      ).proxyRequest();
      const response = await post<any, ProxyRequest>({
        url: ProxyRequestHandler.SI2_PROXY_URL,
        data: request,
        headers,
      });

      res.json(response);
    }
  );

  router.post(
    '/users',
    requireAccessToken,
    async (req: Types.Request, res: Response) => {
      const userIds = req.body;
      const headers = {
        Authorization: req.headers.authorization,
        Accept: 'application/json',
        'Content-Type': 'application/json',
        applicationKey: req.headers.applicationkey,
      };
      const request = new ProxyRequestHandler(
        'POST',
        `${apiVersion}/content/users`,
        {},
        userIds
      ).proxyRequest();

      const users = await post({
        url: request.requestUrl,
        data: request.requestContent,
        headers,
      });

      res.json(users);
    }
  );
}
