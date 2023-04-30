import { Constants, Utilities } from '@alcumus/core';

export default function getApiKeyHeader(): {
  [key: string]: string;
} {
  return {
    [Constants.RequestHeaders.ApiKey]:
      Utilities.ProcessEnv.getValueOrThrow('SCRP_API_KEY'),
  };
}
