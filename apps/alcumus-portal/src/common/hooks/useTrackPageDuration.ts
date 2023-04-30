import Analytics from '@alcumus/analytics-package';
import { useEffect } from 'react';
import useSWR from 'swr';
import { CURRENT_ORGANIZATION_PROFILE_URL } from '../components/MyOrganization';
import { MyOrganizationDetails } from '../types';

export const useTrackPageDuration = (eventName: string) => {
  const { data: myOrganizationDetails } = useSWR<MyOrganizationDetails>(
    CURRENT_ORGANIZATION_PROFILE_URL
  );

  useEffect(() => {
    if (myOrganizationDetails) {
      Analytics.getInstance().timeEvent(eventName);
      const func = function trackEvent() {
        Analytics.getInstance().track(eventName, {
          organization: myOrganizationDetails?.tenantName,
        });
      };
      window.addEventListener('beforeunload', func);
      return () => {
        window.removeEventListener('beforeunload', func);
      };
    }
  }, [myOrganizationDetails]);
  return true;
};
