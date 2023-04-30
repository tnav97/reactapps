import { useMemo } from 'react';
import { Role } from './types';
import { Roles } from './constants';

export function getRoleItems(roles: Role[], userRoleLookupKey?: string) {
  return useMemo(
    () =>
      roles
        // Hide custom roles
        .filter((role) => !!role.roleLookupKey)
        // If user is NOT alcumus admin, hide all alcumus.* roles
        .filter(
          (role) =>
            !(
              userRoleLookupKey !== Roles.ALCUMUS_ADMIN &&
              role.roleLookupKey?.startsWith('Alcumus.')
            )
        )
        .map((role) => ({
          id: role.roleId,
          name: role.roleName,
          role,
        })),
    [roles]
  );
}

export function hideAlcumusRoles(roles: Role[]): Role[] {
  return roles.filter(
    (role) =>
      !role.roleLookupKey ||
      !role.roleLookupKey.toLowerCase().startsWith('alcumus')
  );
}
