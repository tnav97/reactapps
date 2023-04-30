import { Types } from '@alcumus/core';
import { NextFunction, Response } from 'express';
import { getAllRoles } from '../models/authorization';
import { getAccessToken, ROOT_TENANT_ID } from '../../lib/utils';
import { hideAlcumusRoles } from '../../common/utilities';
import { getCurrentOrganizationFromSession } from '../../lib/utils/getCurrentOrganizationFromSession';
import { getLoggedInUserRoleAndPermissions } from '../models/permissions';

export async function loadRoles(
  req: Types.Request,
  res: Response,
  next: NextFunction
) {
  if (req.session && req.session.accessToken) {
    const roles = await getAllRoles(getAccessToken(req));
    const rolesToDisplay =
      req.session.currentOrganization?.tenantIdentifier === 'alcumus'
        ? roles
        : hideAlcumusRoles(roles);

    let loggedInUserRole = {
      roleId: 0,
      roleName: 'User',
      roleLookupKey: 'Client.User',
      rolePermissions: [],
      organizationId: null,
    };

    try {
      loggedInUserRole = await getLoggedInUserRoleAndPermissions(
        getAccessToken(req),
        req.session.isRootOrganizationMember
          ? ROOT_TENANT_ID
          : getCurrentOrganizationFromSession(req).id
      );
    } catch (e) {
      console.log('loadRoles: Could not load role, defaulting to Client.User');
    }

    req.initialState = {
      ...req.initialState,
      authorization: {
        roles: rolesToDisplay,
        loggedInUserRole,
      },
    };
  }
  next();
}
