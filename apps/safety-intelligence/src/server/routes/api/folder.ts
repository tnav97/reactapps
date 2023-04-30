import { Types } from '@alcumus/core';
import { Router, Response } from 'express';
import { apiVersion } from '../../../common/constants/apiVersion';
import { DashboardDto } from '../../../dtos/dashboardDto';
import { FolderDto } from '../../../dtos/folderDto';
import { FolderNameDto } from '../../../dtos/folderNameDto';
import { LookDto } from '../../../dtos/lookDto';
import { del, get, patch, post } from '../../../utilities/Api';
import { ProxyRequestHandler } from '../../../utilities/proxyRequestHandler';
import requireAccessToken from '../../models/middleware';

export default async function folderRouter(router: Router) {
  router.post(
    '/:folderId/children/search',
    requireAccessToken,
    async (req: Types.Request, res: Response) => {
      const { name, fields = null } = req.body;
      const headers = {
        Authorization: req.headers.authorization,
        Accept: 'application/json',
        'Content-Type': 'application/json',
        applicationKey: req.headers.applicationkey,
      };

      const request = new ProxyRequestHandler(
        'POST',
        `${apiVersion}/folders/${req.params.folderId}/children/search`,
        {
          fields: fields ?? FolderNameDto.QUERY_FIELDS,
          name,
        }
      ).proxyRequest();

      const folders: FolderNameDto = await post({
        url: request.requestUrl,
        data: request,
        headers,
      });

      res.json(folders);
    }
  );

  router.get(
    '/all',
    requireAccessToken,
    async (req: Types.Request, res: Response) => {
      const headers = {
        Authorization: req.headers.authorization,
        Accept: 'application/json',
        'Content-Type': 'application/json',
        applicationKey: req.headers.applicationkey,
      };

      const request = new ProxyRequestHandler('GET', `${apiVersion}/folders`, {
        fields: req.params.fields ?? FolderDto.QUERY_FIELDS,
      }).proxyRequest();
      const folders: FolderDto[] = await get({
        url: request.requestUrl,
        headers,
      });
      res.json(folders);
    }
  );

  router.get(
    '/:folderId',
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
        `${apiVersion}/folders/${req.params.folderId}`,
        {
          fields: req.params.fields ?? FolderDto.QUERY_FIELDS,
        }
      ).proxyRequest();

      const folder: FolderDto = await get({
        url: request.requestUrl,
        headers,
      });

      res.json(folder);
    }
  );

  router.get(
    '/:folderId/ancestors',
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
        `${apiVersion}/folders/${req.params.folderId}/ancestors`,
        {
          folder_Id: parseInt(req.params.folderId),
          fields: FolderDto.ROOT_REQUEST_FIELDS,
        }
      ).proxyRequest();

      const folders: FolderDto[] = await get({
        url: request.requestUrl,
        headers,
      });

      res.json(folders);
    }
  );

  router.get(
    '/:folderId/children/summaries',
    requireAccessToken,
    async (req: Types.Request, res: Response) => {
      const { page, perPage } = req.query;
      const headers = {
        Authorization: req.headers.authorization,
        Accept: 'application/json',
        'Content-Type': 'application/json',
        applicationKey: req.headers.applicationkey,
      };

      const request = new ProxyRequestHandler(
        'GET',
        `${apiVersion}/folders/${req.params.folderId}/children`,
        {
          fields: FolderNameDto.QUERY_FIELDS,
          page,
          perPage,
          sortBy: 'name',
        }
      ).proxyRequest();

      const folders = await get({
        url: request.requestUrl,
        headers,
      });

      res.json(folders);
    }
  );

  router.get(
    '/:folderId/allowedAction',
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
        `${apiVersion}/folders/allowedaction/${req.params.folderId}`,
        {}
      ).proxyRequest();

      const data = await get({
        url: request.requestUrl,
        headers,
      });
      res.json(data);
    }
  );

  router.get(
    '/:folderId/children/count',
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
        `${apiVersion}/folders/${req.params.folderId}/children`,
        {
          sortBy: 'name',
        }
      ).proxyRequest();

      try {
        const response = await get({
          url: request.requestUrl,
          headers,
        });

        res.json(response);
      } catch (e) {
        console.error(e);
        res.json(e);
      }
    }
  );

  router.get(
    '/:folderId/dashboards',
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
        `${apiVersion}/folders/${req.params.folderId}/dashboards`,
        {
          fields: DashboardDto.QUERY_FIELDS,
        }
      ).proxyRequest();

      const dashboards: DashboardDto[] = await get({
        url: request.requestUrl,
        headers,
      });

      res.json(dashboards);
    }
  );

  router.get(
    '/:folderId/looks',
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
        `${apiVersion}/folders/${req.params.folderId}/looks`,
        {
          fields: LookDto.QUERY_FIELDS,
        }
      ).proxyRequest();

      const looks: LookDto[] = await get({
        url: request.requestUrl,
        headers,
      });

      res.json(looks);
    }
  );

  router.post(
    '/',
    requireAccessToken,
    async (req: Types.Request, res: Response) => {
      const folderDto = req.body;
      const headers = {
        Authorization: req.headers.authorization,
        Accept: 'application/json',
        'Content-Type': 'application/json',
        applicationKey: req.headers.applicationkey,
      };

      const request = new ProxyRequestHandler(
        'POST',
        `${apiVersion}/folders`,
        folderDto
      ).proxyRequest();

      const response = await post({
        url: request.requestUrl,
        data: request,
        headers,
      });

      res.json(response);
    }
  );

  router.patch(
    '/:folderId',
    requireAccessToken,
    async (req: Types.Request, res: Response) => {
      const headers = {
        Authorization: req.headers.authorization,
        Accept: 'application/json',
        'Content-Type': 'application/json',
        applicationKey: req.headers.applicationkey,
      };

      const request = new ProxyRequestHandler(
        'PATCH',
        `${apiVersion}/folders/${req.params.folderId}`,
        {},
        req.body
      ).proxyRequest();

      const response = await patch({
        url: request.requestUrl,
        data: request.requestContent,
        headers,
      });
      res.json(response);
    }
  );

  router.delete(
    '/:folderId',
    requireAccessToken,
    async (req: Types.Request, res: Response) => {
      const headers = {
        Authorization: req.headers.authorization,
        Accept: 'application/json',
        'Content-Type': 'application/json',
        applicationKey: req.headers.applicationkey,
      };

      const request = new ProxyRequestHandler(
        'DELETE',
        `${apiVersion}/folders/${req.params.folderId}`,
        {}
      ).proxyRequest();

      const response = await del({
        url: request.requestUrl,
        headers,
      });
      res.json(response);
    }
  );
}
