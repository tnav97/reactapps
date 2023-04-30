import { Utilities } from '@alcumus/core';
const baseUrl = Utilities.ProcessEnv.getValue('SCRP_API_URL');
export default function getApiUrl(path: string): string {
  return `${baseUrl}${path}`;
}
