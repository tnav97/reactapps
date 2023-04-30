import useSWR from 'swr';
import { UserLogin } from '../types';

export function useUserLogin() {
  return useSWR<UserLogin>('/api/users/me/user-login');
}
