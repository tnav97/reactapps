import { RSAA } from 'redux-api-middleware';

export interface RsaaRequestBody {
  endpoint: string;
  body?: object;
  method?: 'GET' | 'PUT' | 'PATCH' | 'POST' | 'DELETE' | 'HEAD';
  types?: Array<string> | Array<{ type: string; meta?: object }>;
  type?: string;
  headers?: Object;
}

export function generateRequest({
  body,
  headers,
  endpoint,
  ...options
}: RsaaRequestBody) {
  return {
    [RSAA]: {
      endpoint,
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
      body: body && JSON.stringify(body),
      ...options,
    },
  };
}
