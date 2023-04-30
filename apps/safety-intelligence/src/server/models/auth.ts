import axios from 'axios';
import { removeLocalStorageItems } from './utils';

export const refresh = async (refreshToken: string, accessToken: string) => {
  try {
    const { data } = await axios.post('/api/auth/refresh', {
      refreshToken,
      accessToken,
    });
    if (data?.redirectUrl) {
      removeLocalStorageItems();
      // @ts-ignore
      window.location = data.redirectUrl;
    }
    if (data.accessToken) {
      localStorage.setItem('expiresIn', data.expiresIn);
      localStorage.setItem('accessToken', data.accessToken);
      localStorage.setItem('refreshToken', data.refreshToken);
    }
  } catch (err: any) {
    if (err.status === 500) {
      throw new Error("Couldn't fetch refresh token");
    } else {
      throw err;
    }
  }
};
