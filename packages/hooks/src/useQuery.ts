import { useLocation } from 'react-router-dom';

/**
 * A custom hook to query the current url
 */
export const useQuery = (): URLSearchParams => {
  return new URLSearchParams(useLocation().search);
};
