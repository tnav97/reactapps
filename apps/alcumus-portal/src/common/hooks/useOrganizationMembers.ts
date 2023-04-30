import useSWR from 'swr';
import { MemberDetails } from '../types';

const fetcher = async (url) => {
  const res = await fetch(url);

  if (!res.ok) {
    const error = new Error(
      'An error occurred while fetching organization members.'
    );
    throw error;
  }

  return res.json();
};

export function useOrganizationMembers(organizationId?: number) {
  return useSWR<MemberDetails[]>(
    organizationId ? `/api/organizations/${organizationId}/users` : null,
    fetcher
  );
}
