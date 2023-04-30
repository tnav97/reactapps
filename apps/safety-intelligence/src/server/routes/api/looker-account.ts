import { Types } from '@alcumus/core';
import axios from 'axios';
import { Router, Response } from 'express';
import { apiVersion } from '../../../common/constants/apiVersion';
import { EmbedUserDto } from '../../../dtos/embedUserDto';
import { UserApplicationAccessDto } from '../../../dtos/userApplicationAccessDto';
import { ProxyRequestHandler } from '../../../utilities/proxyRequestHandler';
import requireAccessToken from '../../models/middleware';

export default async function lookerInitializationRouter(router: Router) {
  router.get(
    '/initialization',
    requireAccessToken,
    async (req: Types.Request, res: Response) => {
      try {
        const request = new ProxyRequestHandler(
          'GET',
          `${apiVersion}/me`,
          {}
        ).proxyRequest();
        const config = {
          headers: {
            Authorization: req.headers.authorization as string,
            Accept: 'application/json',
            'Content-Type': 'application/json',
            applicationKey: req.headers.applicationkey as string,
          },
        };

        const response = await axios.get(request.requestUrl, config);
        res.json(response.data as EmbedUserDto);
      } catch (err: any) {
        console.error(
          `ERROR: Initialization failed: ${err.response.data}`,
          err.stack
        );
        res
          .status(err.response.status || 500)
          .json({ message: err.response.data });
      }
    }
  );

  router.get(
    '/apps',
    requireAccessToken,
    async (req: Types.Request, res: Response) => {
      try {
        const request = new ProxyRequestHandler(
          'GET',
          `${apiVersion}/me/apps`,
          {}
        ).proxyRequest();
        const config = {
          headers: {
            Authorization: req.headers.authorization as string,
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        };
        const response = await axios.get(request.requestUrl, config);

        res.json(response.data as UserApplicationAccessDto[]);
      } catch (err: any) {
        console.error(
          `ERROR: get application access details failed: ${err.response.data}`,
          err.stack
        );
        res
          .status(err.response.status || 500)
          .json({ message: err.response.data });
      }
    }
  );
}
