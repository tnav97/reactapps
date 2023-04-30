import { Router, Response } from 'express';
import { Middlewares, Types } from '@alcumus/core';
import { updatePassword } from '../../models/password';

export default async function passwordRouter(router: Router) {
  router.post(
    '/',
    Middlewares.decodeAccessToken(false),
    Middlewares.requireUser,
    async (req: Types.Request, res: Response) => {
      const { newPassword, oldPassword } = req.body;
      const accessToken = req.headers['x-access-token'];

      await updatePassword(
        Number(req.user?.userId),
        accessToken as string,
        newPassword,
        oldPassword
      );
      res.status(204).json();
    }
  );
}
