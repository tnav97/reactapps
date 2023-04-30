import useSWR from 'swr';
import { MyOrganizationDetails } from '../types';

export function useOrganizationProfile(organizationId?: number) {
  return useSWR<MyOrganizationDetails>(
    organizationId ? `/api/organizations/${organizationId}/profile` : null
  );
}
