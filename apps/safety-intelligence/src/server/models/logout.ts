import axios from 'axios';
import { removeLocalStorageItems } from './utils';

export const logout = async () => {
  try {
    const config = {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    };
    const refreshToken = localStorage.getItem('refreshToken');
    const accessToken = localStorage.getItem('accessToken');
    removeLocalStorageItems();
    const { data } = await axios.post(
      '/api/auth/logout',
      { refreshToken, accessToken },
      config
    );
    window.location = data.redirectUrl;
  } catch (err: any) {
    if (err.status === 500) {
      throw new Error('Logout was not successful');
    } else {
      throw err;
    }
  }
};
