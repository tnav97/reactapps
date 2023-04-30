import axios from 'axios';
import { refresh } from './auth';
import { internalAxios } from './internalAxios';
import { setLocalStorageItems } from './utils';
export enum PortalAuthenticationTypes {
  Unauthenticated = 0,
  IsAuthenticating = 1,
  Authenticated = 2,
}

const initializeLookerCredentials = async () => {
  try {
    const { data: embedUserDto } = await internalAxios.get(
      '/api/looker-account/initialization'
    );

    setLocalStorageItems(embedUserDto);
    return true;
  } catch (err: any) {
    console.error('Looker Account Initialization was not successful');
    return false;
  }
};

export async function initialiazeTokenForUser(): Promise<void> {
  try {
    const { data } = await axios.get('/redirect');
    window.location = data.redirectUrl;
  } catch (err: any) {
    if (err.status === 500) {
      throw new Error('Token could not be granted');
    } else {
      throw err;
    }
  }
}
export const initializePortalToken =
  async (): Promise<PortalAuthenticationTypes> => {
    try {
      const accessToken = localStorage.getItem('accessToken');
      if (!accessToken || accessToken === undefined) {
        await initialiazeTokenForUser();
        return PortalAuthenticationTypes.IsAuthenticating;
      }
      const refreshToken = localStorage.getItem('refreshToken');
      if (accessToken && refreshToken) {
        await refresh(refreshToken, accessToken);
        return PortalAuthenticationTypes.Authenticated;
      }
      return PortalAuthenticationTypes.Unauthenticated;
    } catch {
      return PortalAuthenticationTypes.Unauthenticated;
    }
  };

export const hasLookerAccess = async () => {
  if (localStorage.getItem('user_external_id')) return true;

  return await initializeLookerCredentials();
};

export const getApplicationAccessDetails = async () => {
  try {
    const config = {
      headers: {
        Authorization: localStorage.getItem('accessToken') as string,
      },
    };
    const { data } = await internalAxios.get(
      '/api/looker-account/apps',
      config
    );
    return data;
  } catch (err) {
    throw new Error('could not get application access details');
  }
};
