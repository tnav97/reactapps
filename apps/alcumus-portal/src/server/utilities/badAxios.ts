import { Utilities } from '@alcumus/core';

/**
 * @deprecated don't use this because it doesn't propagate errors
 * in an easy way for the react apps to consume.
 */
export class BadAxios {
  /**
   * @deprecated
   */
  static async sendAxiosDeleteRequest(
    path: string,
    headers?: { [x: string]: string }
  ) {
    const axiosInstance = Utilities.getAxiosInstance();
    const config = {
      headers: {
        Accept: 'application/json',
        ...headers,
      },
    };
    return axiosInstance.delete(path, config);
  }

  /**
   * @deprecated
   */
  static async sendAxiosPatchRequest(
    path: string,
    data?: object,
    headers?: { [x: string]: string }
  ) {
    const axiosInstance = Utilities.getAxiosInstance();
    const config = {
      headers: {
        ...headers,
      },
    };
    return axiosInstance.patch(path, data, config);
  }
}
