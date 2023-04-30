import useSWR from 'swr';
import { Application } from '../types';

export function useActiveApplications(memberId: number | undefined) {
  return useSWR<Application[]>(
    memberId ? `/api/applications/${memberId}/activeApplications` : null
  );
}
