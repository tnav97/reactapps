import { RSAA } from 'redux-api-middleware';

export const Actions = {
  RegisterSetData: 'RegisterSetData',
  QuestionnaireStart: 'QuestionnaireStart',
  QuestionnaireSetData: 'QuestionnaireSetData',
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
  method,
  ...options
}: RsaaRequestBody) {
  return {
    [RSAA]: {
      endpoint,
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: body && JSON.stringify(body),
      ...options,
    },
  };
}
