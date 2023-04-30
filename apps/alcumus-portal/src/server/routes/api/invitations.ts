import { Response, Router } from 'express';
import { Types } from '@alcumus/core';
import { getAccessToken } from '../../../lib/utils';
import { deleteInvitation, sendInvitation } from '../../models/invitation';

export default async function invitation(router: Router) {
  router.delete('/:invitationId', async (req: Types.Request, res: Response) => {
    const accessToken = getAccessToken(req);
    await deleteInvitation(accessToken, Number(req.params.invitationId));

    res.status(204).json();
  });

  router.post('/', async (req: Types.Request, res: Response) => {
    const accessToken = getAccessToken(req);
    const { memberId } = req.body;
    await sendInvitation(accessToken, Number(memberId));

    res.status(204).json();
  });
}
