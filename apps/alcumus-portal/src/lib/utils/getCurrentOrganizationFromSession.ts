import { Types } from '@alcumus/core';

export function getCurrentOrganizationFromSession(
  req: Types.Request
): Types.Organization {
  if (!req.session?.currentOrganization) {
    throw new Error('Current organization is not set');
  }

  return req.session.currentOrganization;
}
