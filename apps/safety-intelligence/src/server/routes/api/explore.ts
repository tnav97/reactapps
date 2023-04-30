import { Types } from '@alcumus/core';
import axios from 'axios';
import { Router, Response } from 'express';
import { apiVersion } from '../../../common/constants/apiVersion';
import { LookmlModelDto } from '../../../dtos/lookmlModelDto';
import { ProxyRequestHandler } from '../../../utilities/proxyRequestHandler';
import requireAccessToken from '../../models/middleware';

export default async function exploreRouter(router: Router) {
  router.get(
    '/all',
    requireAccessToken,
    async (req: Types.Request, res: Response) => {
      const headers = {
        Authorization: req.headers.authorization as string,
        Accept: 'application/json',
        'Content-Type': 'application/json',
        applicationKey: req.headers.applicationkey as string,
      };
      const request = new ProxyRequestHandler('GET', `${apiVersion}/explores`, {
        fields: LookmlModelDto.QUERY_FIELDS,
      }).proxyRequest();

      const { data } = await axios.get(request.requestUrl, { headers });

      res.json(data);
    }
  );
}
