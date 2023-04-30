import { Constants } from '@alcumus/core';
import axios from 'axios';
import store from 'store';

export interface Timezone {
  name: string;
  alternativeName: string;
  group: string[];
  abbreviation: string;
  rawFormat: string;
  currentTimeFormat: string;
  currentTimeOffsetInMinutes: number;
}

export async function loadTimezones(): Promise<Timezone[]> {
  const { data } = await axios.get('/api/timezones', {
    headers: {
      [Constants.RequestHeaders.AccessToken]: store.get(
        Constants.LocalStorageKeys.AccessToken
      ),
      Accept: 'application/json',
    },
  });

  return data;
}
