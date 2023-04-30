import { generateRequest } from '../generateRequest';
import store from 'store';
import { Constants } from '@alcumus/core';

export const AuthorizationActions = {
  FetchRolesPending: 'FetchRolesPending',
  FetchRolesCompleted: 'FetchRolesCompleted',
  FetchRolesFailed: 'FetchRolesFailed',
};

export const fetchAllRoles = () =>
  generateRequest({
    endpoint: `/api/authorization/roles`,
    method: 'GET',
    headers: {
      [Constants.RequestHeaders.AccessToken]: store.get(
        Constants.LocalStorageKeys.AccessToken
      ),
    },
    types: [
      AuthorizationActions.FetchRolesPending,
      AuthorizationActions.FetchRolesCompleted,
      AuthorizationActions.FetchRolesFailed,
    ],
  });
