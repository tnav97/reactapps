import { RSAA } from 'redux-api-middleware';

export const Actions = {
  Message: {
    FetchDataPending: 'FetchDataPending',
    FetchDataCompleted: 'FetchDataCompleted',
    FetchDataFailed: 'FetchDataFailed',
  },
};

export interface RsaaRequestBody {
  endpoint: string;
  body?: object;
  method?: 'GET' | 'PUT' | 'PATCH' | 'POST' | 'DELETE' | 'HEAD';
  types?: Array<string> | Array<{ type: string; meta?: object }>;
  type?: string;
}

export function generateRequest({
  body,
  endpoint,
  ...options
}: RsaaRequestBody) {
  return {
    [RSAA]: {
      endpoint,
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      body: body && JSON.stringify(body),
      ...options,
    },
  };
}

export const getMessageFromApi = () =>
  generateRequest({
    endpoint: '/api/message',
    types: [
      Actions.Message.FetchDataPending,
      Actions.Message.FetchDataCompleted,
      Actions.Message.FetchDataFailed,
    ],
  });
