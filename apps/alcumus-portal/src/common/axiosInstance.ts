import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { Constants } from '@alcumus/core';
import store from 'store';

export function createAxiosInstanceWithAccessToken(
  configuration: AxiosRequestConfig = {}
): AxiosInstance {
  const axiosConfiguration: AxiosRequestConfig = {
    ...configuration,
    headers: {
      ...configuration.headers,
      [Constants.RequestHeaders.AccessToken]: store.get(
        Constants.LocalStorageKeys.AccessToken
      ),
    },
  };

  return axios.create(axiosConfiguration);
}
