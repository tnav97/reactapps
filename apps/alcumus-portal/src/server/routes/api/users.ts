import { Response, Router } from 'express';
import { Middlewares, Types } from '@alcumus/core';
import { getAccessToken, ROOT_TENANT_ID } from '../../../lib/utils';
import {
  getLoggedInUserProfile,
  getUserLogin,
  updatePassword,
  updateProfile,
  updateUserEmail,
} from '../../models/account';
import { EnvVariables } from '../../constants';
import { getLoggedInUserRoleAndPermissions } from '../../models/permissions';
import {
  createUser,
  CreateUserDto,
  getUsernames,
  inviteUser,
  updateUser,
} from '../../models/users';
import { getApplicationSubscriptionsForMember } from '../../models/applications';
import { InviteUserRequest, UpdateUserRequest } from '../../../common/types';
import { getCurrentOrganizationFromSession } from '../../../lib/utils/getCurrentOrganizationFromSession';

export default async function user(router: Router) {
  router.get(
    '/me',
    Middlewares.decodeAccessToken(EnvVariables.FeatureToggles.UseAzureAd),
    async (req: Types.Request, res: Response) => {
      const accessToken = getAccessToken(req);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { id, ...userProfile } = await getLoggedInUserProfile(
        req,
        accessToken
      );
      res.json(userProfile);
    }
  );

  router.get(
    '/usernames',
    Middlewares.decodeAccessToken(EnvVariables.FeatureToggles.UseAzureAd),
    async (req: Types.Request, res: Response) => {
      const accessToken = getAccessToken(req);
      const { currentOrganization } = req.session;
      if (!currentOrganization) {
        throw new Error('Undefined current organization');
      }

      const result = await getUsernames(
        accessToken,
        req.query.usernames as string,
        currentOrganization.id
      );

      res.json(result);
    }
  );

  router.get(
    '/role/me',
    Middlewares.decodeAccessToken(EnvVariables.FeatureToggles.UseAzureAd),
    async (req: Types.Request, res: Response) => {
      const accessToken = getAccessToken(req);

      const organizationId = req.session?.currentOrganization?.id;

      if (organizationId) {
        const roleAndPermissions = await getLoggedInUserRoleAndPermissions(
          accessToken,
          req.session.isRootOrganizationMember ? ROOT_TENANT_ID : organizationId
        );

        res.json({
          ...roleAndPermissions,
          organizationId,
        });
      } else {
        res.status(500).json({ message: 'Current organization not set' });
      }
    }
  );

  router.get(
    '/me/user-login',
    Middlewares.decodeAccessToken(EnvVariables.FeatureToggles.UseAzureAd),
    async (req: Types.Request, res: Response) => {
      const accessToken = getAccessToken(req);
      const account = await getUserLogin(accessToken);

      res.json(account);
    }
  );

  router.put(
    '/password',
    Middlewares.decodeAccessToken(EnvVariables.FeatureToggles.UseAzureAd),
    Middlewares.requireUser,
    async (req: Types.Request, res: Response) => {
      const { newPassword, oldPassword } = req.body;
      const updatedProfile = await updatePassword(
        req,
        Number(req.user?.userId),
        getAccessToken(req),
        newPassword,
        oldPassword
      );
      res.json(updatedProfile);
    }
  );

  router.patch(
    '/profile',
    Middlewares.decodeAccessToken(EnvVariables.FeatureToggles.UseAzureAd),
    Middlewares.requireUser,
    async (req: Types.Request, res: Response) => {
      const updatedProfile = await updateProfile(
        req,
        getAccessToken(req),
        req.body
      );
      res.json(updatedProfile);
    }
  );

  router.patch(
    '/identifiers',
    Middlewares.decodeAccessToken(EnvVariables.FeatureToggles.UseAzureAd),
    Middlewares.requireUser,
    async (req: Types.Request, res: Response) => {
      const { email } = req.body;
      if (!email?.length) {
        res
          .status(400)
          .json('Unable to update user identity with missing information');
      } else {
        const response = await updateUserEmail(
          req,
          getAccessToken(req),
          Number(req.user?.userId),
          email
        );

        if (response.status >= 300 && response.status < 500) {
          console.log(
            'Azure AD Email changed failed - ',
            response.status,
            response.data
          );
          res.status(response.status).json(response.data);
        } else if (response.status >= 500) {
          res.status(500).json(response.data);
        } else {
          const {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            data: { id, ...updatedProfile },
          } = response;
          res.json(updatedProfile);
        }
      }
    }
  );

  router.post('/', async (req: Types.Request, res: Response) => {
    const accessToken = getAccessToken(req);

    const { user, invitationLink } = await createUser(
      accessToken,
      getCurrentOrganizationFromSession(req).id,
      req.body as CreateUserDto
    );
    if (invitationLink) res.setHeader('Location', invitationLink);
    res.json({ user });
  });

  router.post('/invite', async (req: Types.Request, res: Response) => {
    const accessToken = getAccessToken(req);
    const members = await inviteUser(
      accessToken,
      getCurrentOrganizationFromSession(req).id,
      req.body.invitationRequest as Array<InviteUserRequest>
    );

    res.json(members);
  });

  router.patch('/', async (req: Types.Request, res: Response) => {
    const accessToken = getAccessToken(req);

    const user = await updateUser(
      accessToken,
      getCurrentOrganizationFromSession(req).id,
      req.body as UpdateUserRequest
    );
    res.json({ user });
  });

  router.get(
    '/:userId/applications',
    async (req: Types.Request, res: Response) => {
      const accessToken = getAccessToken(req);
      res.json(
        await getApplicationSubscriptionsForMember(
          accessToken,
          Number(req.params.userId),
          getCurrentOrganizationFromSession(req).id
        )
      );
    }
  );
}
