import { Response, Router } from 'express';
import { Types } from '@alcumus/core';
import { getAccessToken } from '../../../lib/utils';
import {
  getSubscription,
  getSubscriptionSeats,
  getUserApplicationAccess,
  patchSubscriptionSeats,
  patchSubscriptionStatus,
} from '../../models/subscription';
import {
  searchMembers,
  getOrganizationMembersRoles,
} from '../../models/organizations';

export default async function subscriptions(router: Router) {
  router.get('/:id', async (req: Types.Request, res: Response) => {
    if (req.session.currentOrganization && req.session.currentOrganization.id) {
      const subscriptionId = Number(req.params.id);
      const accessToken = getAccessToken(req);
      const organizationId = req.session.currentOrganization.id;
      const [seats, subscription] = await Promise.all([
        getSubscriptionSeats(accessToken, subscriptionId, organizationId),
        getSubscription(accessToken, subscriptionId),
      ]);

      const usersApplicationAccess = await getUserApplicationAccess(
        accessToken,
        subscriptionId,
        organizationId
      );
      const userIds = usersApplicationAccess.map(
        (userApplicationAccess) => userApplicationAccess.userId
      );

      if (userIds.length) {
        const [members, roles] = await Promise.all([
          searchMembers(accessToken, organizationId, userIds),
          getOrganizationMembersRoles(accessToken, organizationId, userIds),
        ]);

        const subscriptionUsers = members.map((member) => {
          const role = roles.find((role) => role.userId === member.userId);
          const userStatus = usersApplicationAccess.find(
            (userApplicationAccess) =>
              userApplicationAccess.userId === member.userId
          )?.isEnabled;
          const displayName =
            member.userProfile?.firstName || member.userProfile?.lastName
              ? `${member.userProfile?.firstName} ${member.userProfile?.lastName}`
              : 'Not available';
          return {
            userId: member.userId,
            name: displayName,
            contact: member.userAccount.email,
            role: role?.roleName || 'Unknown',
            userStatus,
          };
        });

        res.json({
          seats,
          subscription: {
            applicationName: subscription.application.applicationName,
            users: subscriptionUsers,
            startDate: subscription.subscriptionStartDate,
            endDate: subscription.subscriptionEndDate,
          },
        });
      } else {
        res.json({
          seats,
          subscription: {
            applicationName: subscription.application.applicationName,
            users: [],
            startDate: subscription.subscriptionStartDate,
            endDate: subscription.subscriptionEndDate,
          },
        });
      }
    }
  });

  router.patch(
    '/:subscriptionId',
    async (req: Types.Request, res: Response) => {
      const accessToken = getAccessToken(req);
      const { licenses } = req.body;
      const updatedOrganizationDetails = await patchSubscriptionSeats(
        accessToken,
        Number(req.params.subscriptionId),
        licenses
      );
      res.json(updatedOrganizationDetails);
    }
  );

  router.patch(
    '/:subscriptionId/status',
    async (req: Types.Request, res: Response) => {
      const accessToken = getAccessToken(req);
      const cancelRequestBody = req.body;
      const updatedOrganizationStatus = await patchSubscriptionStatus(
        accessToken,
        Number(req.params.subscriptionId),
        cancelRequestBody
      );
      res.json(updatedOrganizationStatus);
    }
  );
}
