import axios from 'axios';
import store from 'store';
import { Constants } from '@alcumus/core';

export async function searchOrganizations(name, page = 0) {
  const {
    data: { results, total },
  } = await axios.post(
    '/api/organizations/search',
    {
      name: name || '',
      page,
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

  return {
    total,
    results: results.map(({ id, tenantName }) => ({
      id,
      name: tenantName,
    })),
  };
}
