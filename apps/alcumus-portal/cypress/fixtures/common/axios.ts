import axios, { AxiosInstance } from 'axios';

export const API_KEY = process.env.SERVICE_MESH_API_KEY as string;

export function getApiKeyAxios(validateStatus = false): AxiosInstance {
  return axios.create({
    baseURL: process.env.SERVICES_HOST,
    validateStatus: validateStatus ? undefined : null,
    headers: {
      'x-api-key': API_KEY,
      'Content-Type': 'application/json',
    },
  });
}

export function getAxios(validateStatus = false): AxiosInstance {
  return axios.create({
    validateStatus: validateStatus ? (status: number) => status < 300 : null,
  });
}

export function getAxiosWithAccessToken(
  { accessToken }: { accessToken: string },
  validateStatus = false
): AxiosInstance {
  return axios.create({
    validateStatus: validateStatus ? undefined : null,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
}

export interface Credentials {
  organizationIdentifier?: string;
  username?: string;
  email?: string;
  password: string;
}
