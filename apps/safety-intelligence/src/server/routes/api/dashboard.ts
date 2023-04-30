import { Types } from '@alcumus/core';
import axios from 'axios';
import { Router, Response } from 'express';
import { apiVersion } from '../../../common/constants/apiVersion';
import { DashboardFilter } from '../../../dtos/dashboardFilter';
import { get, post } from '../../../utilities/Api';
import { ProxyRequestHandler } from '../../../utilities/proxyRequestHandler';
import requireAccessToken from '../../models/middleware';

export default async function dashboardRouter(router: Router) {
  router.post(
    '/search',
    requireAccessToken,
    async (req: Types.Request, res: Response) => {
      const { searchOptions } = req.body;
      const headers = {
        Authorization: req.headers.authorization as string,
        Accept: 'application/json',
        'Content-Type': 'application/json',
        applicationKey: req.headers.applicationkey as string,
      };
      const request = new ProxyRequestHandler(
        'POST',
        `${apiVersion}/dashboards/search`,
        searchOptions
      ).proxyRequest();
      const dashboards = await post({
        url: request.requestUrl,
        data: request,
        headers,
      });
      res.json(dashboards);
    }
  );

  router.post(
    '/save',
    requireAccessToken,
    async (req: Types.Request, res: Response) => {
      const { saveDashboardDto } = req.body;
      const headers = {
        Authorization: req.headers.authorization as string,
        Accept: 'application/json',
        'Content-Type': 'application/json',
        applicationKey: req.headers.applicationkey as string,
      };
      const request = new ProxyRequestHandler(
        'POST',
        `${apiVersion}/dashboards/save`,
        {},
        saveDashboardDto
      ).proxyRequest();

      const response = await post({
        url: request.requestUrl,
        data: request.requestContent,
        headers,
      });
      res.json(response);
    }
  );

  router.get(
    '/filters/:dashboardId',
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
        `${apiVersion}/dashboards/filters/${req.params.dashboardId}`,
        {
          fields: DashboardFilter.QUERY_FIELDS,
        }
      ).proxyRequest();

      const dashboardFilters: DashboardFilter[] =
        (await get({
          url: request.requestUrl,
          data: {
            fields: DashboardFilter.QUERY_FIELDS,
          },
          headers,
        })) ?? [];
      res.json(dashboardFilters);
    }
  );

  router.get(
    '/embed/:dashboardId',
    requireAccessToken,
    async (req: Types.Request, res: Response) => {
      const { filterString } = req.query;
      const headers = {
        Authorization: req.headers.authorization as string,
        Accept: 'application/json',
        'Content-Type': 'application/json',
        applicationKey: req.headers.applicationkey as string,
      };
      const request = new ProxyRequestHandler(
        'GET',
        `${apiVersion}/dashboards/embed/${req.params.dashboardId}`,
        {
          filterString,
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
    '/move',
    requireAccessToken,
    async (req: Types.Request, res: Response) => {
      const dashboardInfo = req.body;
      const headers = {
        Authorization: req.headers.authorization as string,
        Accept: 'application/json',
        'Content-Type': 'application/json',
        applicationKey: req.headers.applicationkey as string,
      };
      const request = new ProxyRequestHandler(
        'POST',
        `${apiVersion}/dashboards/move`,
        {},
        dashboardInfo
      ).proxyRequest();

      const response = await post({
        url: request.requestUrl,
        data: request.requestContent,
        headers,
      });

      res.json(response);
    }
  );

  router.post(
    '/',
    requireAccessToken,
    async (req: Types.Request, res: Response) => {
      const dashboard = req.body;
      const headers = {
        Authorization: req.headers.authorization as string,
        Accept: 'application/json',
        'Content-Type': 'application/json',
        applicationKey: req.headers.applicationkey as string,
      };
      const request = new ProxyRequestHandler(
        'POST',
        `${apiVersion}/dashboards/`,
        {},
        dashboard
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
