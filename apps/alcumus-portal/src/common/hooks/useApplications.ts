import useSWR from 'swr';
import { Application, ApplicationCategory } from '../types';

export function useApplications() {
  return useSWR<{ applications: Application[] }>('/api/applications');
}

export function useApplicationCategories() {
  return useSWR<{ categories: ApplicationCategory[] }>(
    '/api/applications/categories'
  );
}
