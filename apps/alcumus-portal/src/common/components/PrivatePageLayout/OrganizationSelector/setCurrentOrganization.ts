import axios from 'axios';
import store from 'store';
import { Constants } from '@alcumus/core';

export async function setCurrentOrganization(organizationId: number) {
  return axios.post(
    '/api/organizations/currentOrganization',
    {
      organizationId,
    },
    {
      headers: {
        [Constants.RequestHeaders.AccessToken]: store.get(
          Constants.LocalStorageKeys.AccessToken
        ),
        Accept: 'application/json',
      },
    }
  );
}
