import { TFunction } from 'i18next';

export type SimplifiedRequestHeaders = Record<string, any>;
export type SimplifiedRequest = { headers?: SimplifiedRequestHeaders };

export type GetTFunction = (
  req: SimplifiedRequest,
  namespace: string
) => TFunction;
