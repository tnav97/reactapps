import { Utilities } from '@alcumus/core';

export default function getExperianApiKey(): {
  [key: string]: string;
} {
  return {
    'Auth-Token': Utilities.ProcessEnv.getValueOrThrow('SCRP_EXPERIAN_API_KEY'),
  };
}
