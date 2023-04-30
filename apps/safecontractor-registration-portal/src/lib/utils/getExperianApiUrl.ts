import { Utilities } from '@alcumus/core';
const baseUrl = Utilities.ProcessEnv.getValue('SCRP_EXPERIAN_API_URL');
export default function getExperianApiUrl(path: string): string {
  return `${baseUrl}${path}`;
}
