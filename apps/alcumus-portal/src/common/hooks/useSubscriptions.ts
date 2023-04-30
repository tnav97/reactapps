import useSWR from 'swr';
import { Subscription } from '../types';

export function useSubscriptions(organizationId?: number, returnAll = false) {
  return useSWR<Subscription[]>(
    organizationId
      ? `/api/organizations/${organizationId}/subscriptions?returnAll=${returnAll}`
      : null
  );
}
