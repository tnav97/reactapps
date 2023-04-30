import { Response, Router } from 'express';
import { Types } from '@alcumus/core';
import { getAccessToken } from '../../../lib/utils';
import {
  patchOrganizationMember,
  deleteOrganizationMember,
} from '../../models/members';
import { OrganizationMemberStatusRequest } from '../../../common/types';

export default async function member(router: Router) {
  router.patch(
    '/:memberId/disable',
    async (req: Types.Request, res: Response) => {
      const accessToken = getAccessToken(req);
      const member = await patchOrganizationMember(
        accessToken,
        Number(req.params.memberId),
        req.body as OrganizationMemberStatusRequest
      );

      res.json({ member });
    }
  );

  router.patch(
    '/:memberId/enable',
    async (req: Types.Request, res: Response) => {
      const accessToken = getAccessToken(req);
      const member = await patchOrganizationMember(
        accessToken,
        Number(req.params.memberId),
        req.body as OrganizationMemberStatusRequest
      );

      res.json({ member });
    }
  );

  router.delete(
    '/:memberId/delete',
    async (req: Types.Request, res: Response) => {
      const accessToken = getAccessToken(req);
      await deleteOrganizationMember(accessToken, Number(req.params.memberId));

      res.sendStatus(204);
    }
  );
}
