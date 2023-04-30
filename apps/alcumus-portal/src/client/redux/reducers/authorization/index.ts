import { Role, RoleAndPermissions } from '../../../../common/types';

export interface AuthorizationReducerState {
  roles: Array<Role>;
  loggedInUserRole?: RoleAndPermissions;
}

export const authorizationReducer = (
  state = { roles: [], loggedInUserRole: undefined }
) => state;
