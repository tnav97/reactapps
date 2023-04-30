import axios from 'axios';
import { refresh } from './auth';

const internalAxios = axios.create({});

internalAxios.interceptors.request.use((config) => {
  config.headers = {
    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
    applicationKey: localStorage
      .getItem('application_id')
      ?.toLowerCase() as string,
  };
  return config;
});

internalAxios.interceptors.response.use(
  (res) => {
    return res;
  },
  async (err) => {
    const originalReq = err.config;
    if (err.response) {
      if (err.response.status === 401 && !originalReq._retry) {
        originalReq._retry = true;
        try {
          const accessToken = localStorage.getItem('accessToken');
          const refreshToken = localStorage.getItem('refreshToken');
          if (refreshToken && accessToken) {
            await refresh(refreshToken, accessToken);
            originalReq.headers.Authorization = `Bearer ${localStorage.getItem(
              'accessToken'
            )}`;
            return internalAxios(originalReq);
          }
          err.response.message = 'no refresh token available';
          return Promise.reject(err);
        } catch (error) {
          return Promise.reject(error);
        }
      }
    }
    return Promise.reject(err);
  }
);

export { internalAxios };
