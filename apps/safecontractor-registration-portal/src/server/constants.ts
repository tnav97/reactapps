import { Utilities } from '@alcumus/core';
export const EnvVariables = {
  SCRP_EXPERIAN_API_KEY: Utilities.ProcessEnv.getValueOrThrow(
    'SCRP_EXPERIAN_API_KEY'
  ),
  SCRP_API_KEY: Utilities.ProcessEnv.getValueOrThrow('SCRP_API_KEY'),
};
