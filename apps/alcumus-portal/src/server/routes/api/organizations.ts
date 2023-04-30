import { Types } from '@alcumus/core';
import { Response, Router } from 'express';
import { OrganizationMemberRole } from '../../../common/types';
import { getAccessToken } from '../../../lib/utils/getAccessToken';
import {
  getOrganizationDetails,
  patchOrganizationAddress,
  patchOrganizationContact,
  patchOrganizationDetails,
  postOrganizationAddress,
  postOrganizationContact,
} from '../../models/myOrganization';
import {
  createSubscription,
  getAvailableApplications,
  getOrganizationById,
  getOrganizationMembersRoles,
  getOrganizations,
  getOrganizationsByIds,
  getSubscriptions,
  getAllUsersByOrganizationId,
  searchOrganizations,
} from '../../models/organizations';
import { getRoleForOrganization } from '../../models/authorization';
import { ALCUMUS_ROLES_PREFIX } from '../../../common/constants';
import { getCurrentOrganizationFromSession } from '../../../lib/utils/getCurrentOrganizationFromSession';

export default async function organizations(router: Router) {
  router.get('/subscriptions', async (req: Types.Request, res: Response) => {
    const accessToken = getAccessToken(req);
    res.json(
      await getSubscriptions(
        accessToken,
        getCurrentOrganizationFromSession(req).id
      )
    );
  });

  router.get(
    '/:organizationId/subscriptions',
    async (req: Types.Request, res: Response) => {
      const organizationId = parseInt(req.params.organizationId);
      const accessToken = getAccessToken(req);
      res.json(await getSubscriptions(accessToken, organizationId));
    }
  );

  router.post('/subscriptions', async (req: Types.Request, res: Response) => {
    const accessToken = getAccessToken(req);
    const { applicationId, seats, endDate, startDate } = req.body;

    if (!req.session?.currentOrganization?.id) {
      res.status(400).json({ error: 'Current organization not set' });
      return;
    }

    res.json(
      await createSubscription(accessToken, {
        organizationId: req.session.currentOrganization.id,
        applicationId,
        seats,
        endDate,
        startDate,
      })
    );
  });

  router.get(
    '/:organizationId/users',
    async (req: Types.Request, res: Response) => {
      const getMemberRole = (
        organizationMembersRoles: OrganizationMemberRole[],
        userId: number
      ): OrganizationMemberRole => {
        const filteredOrganizationMembersRoles =
          organizationMembersRoles.filter((role) => role.userId === userId);
        if (filteredOrganizationMembersRoles.length !== 1) {
          throw new Error('Role can not be determined for employee');
        }
        return filteredOrganizationMembersRoles[0];
      };

      const accessToken = getAccessToken(req);
      const organizationId = parseInt(req.params.organizationId);
      const organizationMembers = await getAllUsersByOrganizationId(
        organizationId,
        accessToken
      );
      const organizationMemberIds: number[] = organizationMembers.map(
        (member) => member.userId
      );

      const organizationMembersRoles =
        organizationMemberIds.length > 0
          ? await getOrganizationMembersRoles(
              accessToken,
              Number(req.params.organizationId),
              organizationMemberIds
            )
          : [];

      const employeesWithRoles = organizationMembers.map((member) => {
        try {
          const role = getMemberRole(organizationMembersRoles, member.userId);
          return { ...member, ...role };
        } catch (e: any) {
          console.log(e.message);
          return {
            ...member,
            roleId: 0,
            roleName: 'Not Available',
            roleLookupKey: 'Not Available',
          };
        }
      });
      res.json(employeesWithRoles);
    }
  );

  router.get(
    '/:organizationId/applications/available',
    async (req: Types.Request, res: Response) => {
      const organizationId = parseInt(req.params.organizationId);
      const accessToken = getAccessToken(req);
      res.json(await getAvailableApplications(accessToken, organizationId));
    }
  );

  router.post('/search', async (req: Types.Request, res: Response) => {
    const accessToken = getAccessToken(req);
    const rootOrganizationRole = await getRoleForOrganization(accessToken, 1);

    if (rootOrganizationRole.roleLookupKey.startsWith(ALCUMUS_ROLES_PREFIX)) {
      res.json(
        await searchOrganizations(
          getAccessToken(req),
          req.body.name,
          req.body.page
        )
      );
    } else {
      const organizations = await getOrganizations(accessToken);
      const organizationIds = organizations.map(
        (organization) => organization.organizationId
      );

      const organizationIdsWithName = await getOrganizationsByIds(
        organizationIds
      );

      const filtered = organizationIdsWithName.filter((organization) =>
        organization.tenantName
          .toLowerCase()
          .startsWith(req.body.name.toLowerCase())
      );

      res.json({
        results: filtered,
        total: filtered.length,
      });
    }
  });

  router.post(
    '/currentOrganization',
    async (req: Types.Request, res: Response) => {
      req.session.currentOrganization = await getOrganizationById(
        req.body.organizationId
      );
      res.json({});
    }
  );

  router.get('/current/profile', async (req: Types.Request, res: Response) => {
    const myOrganizationDetails = await getOrganizationDetails(
      getCurrentOrganizationFromSession(req).id
    );
    res.json(myOrganizationDetails);
  });

  router.get(
    '/:organizationId/profile',
    async (req: Types.Request, res: Response) => {
      const myOrganizationDetails = await getOrganizationDetails(
        Number(req.params.organizationId)
      );
      res.json(myOrganizationDetails);
    }
  );

  router.patch(
    '/:organizationId/profile',
    async (req: Types.Request, res: Response) => {
      const { newOrganizationDetails } = req.body;
      const updatedOrganizationDetails = await patchOrganizationDetails(
        req,
        Number(req.params.organizationId),
        newOrganizationDetails
      );
      res.json(updatedOrganizationDetails);
    }
  );

  router.patch(
    '/:organizationId/contact/:contactId',
    async (req: Types.Request, res: Response) => {
      const { newOrganizationContact } = req.body;
      const updatedOrganizationDetails = await patchOrganizationContact(
        req,
        Number(req.params.organizationId),
        Number(req.params.contactId),
        newOrganizationContact
      );
      res.json(updatedOrganizationDetails);
    }
  );

  router.patch(
    '/:organizationId/address/:addressId',
    async (req: Types.Request, res: Response) => {
      const { newOrganizationAddress } = req.body;
      const updatedOrganizationAddress = await patchOrganizationAddress(
        req,
        Number(req.params.organizationId),
        Number(req.params.addressId),
        newOrganizationAddress
      );
      res.json(updatedOrganizationAddress);
    }
  );

  router.post(
    '/:organizationId/contact',
    async (req: Types.Request, res: Response) => {
      const { newOrganizationContact } = req.body;
      const newOrganizationDetails = await postOrganizationContact(
        req,
        Number(req.params.organizationId),
        newOrganizationContact
      );
      const updatedOrganizationDetails = await patchOrganizationContact(
        req,
        Number(req.params.organizationId),
        newOrganizationDetails.organizationContactId,
        newOrganizationContact
      );
      res.json(updatedOrganizationDetails);
    }
  );

  router.post(
    '/:organizationId/address',
    async (req: Types.Request, res: Response) => {
      const { newOrganizationAddress } = req.body;
      const newOrganizationDetails = await postOrganizationAddress(
        req,
        Number(req.params.organizationId),
        newOrganizationAddress
      );
      const updatedOrganizationDetails = await patchOrganizationAddress(
        req,
        Number(req.params.organizationId),
        newOrganizationDetails.mailingAddressId,
        newOrganizationAddress
      );
      res.json(updatedOrganizationDetails);
    }
  );
}
