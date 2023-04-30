import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosRequestHeaders,
} from 'axios';
import { Request } from '../types';
import ProcessEnv from './processEnv';
import { uuidV4 } from './uuidV4';

export function getAxiosInstance(request?: Request): AxiosInstance {
  return createAxiosInstance({}, request);
}

export function getServicesAxiosClient(request?: Request): AxiosInstance {
  if (request) {
    const headers: AxiosRequestHeaders = {
      'x-api-key': ProcessEnv.getValueOrThrow('SERVICES_API_KEY'),
    };
    if (request.session?.accessToken) {
      headers.Authorization = `bearer ${request.session.accessToken}`;
    } else if (request.header('Authorization')) {
      headers.Authorization = request?.header('Authorization') as string;
    }

    const baseConfig: AxiosRequestConfig = {
      headers,
      baseURL: ProcessEnv.getValueOrThrow('SERVICES_HOST'),
    };
    return createAxiosInstance(baseConfig);
  }
  return createAxiosInstance({});
}

function createAxiosInstance(
  baseConfig: AxiosRequestConfig = {},
  request?: Request
): AxiosInstance {
  const requestId = request?.id || uuidV4();

  const realBaseConfig: AxiosRequestConfig = {
    ...baseConfig,
    headers: {
      ...(baseConfig.headers || {}),
      'x-correlation-id': requestId,
      Accept: 'application/json',
    },
  };

  const axiosInstance = axios.create(realBaseConfig);
  axiosInstance.interceptors.request.use((config: AxiosRequestConfig) => {
    console.log(`${requestId} Invoked ${config.url}`);
    return config;
  });
  axiosInstance.interceptors.response.use(
    (response) => {
      console.log(
        `${requestId} Received ${response.status} from ${response.config.url}`
      );
      return response;
    },
    (error: AxiosError) => {
      const errorResponse = error.response;
      console.log(
        `${requestId} Received ${errorResponse?.status} from ${errorResponse?.config?.url}.`
      );
      if (errorResponse && errorResponse?.status >= 500) {
        console.error(`${requestId} ${errorResponse.data.message}`);
      } else if (
        errorResponse &&
        errorResponse?.status >= 400 &&
        errorResponse?.data.message
      ) {
        console.log(`${requestId} ${errorResponse?.data.message}`);
      }
      return Promise.reject(error);
    }
  );
  return axiosInstance;
}
