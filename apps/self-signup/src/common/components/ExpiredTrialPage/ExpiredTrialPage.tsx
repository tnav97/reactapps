import { TFunction } from 'i18next';
import React, { useEffect, useState } from 'react';
import Analytics from '@alcumus/analytics-package';
import { LoadingPage } from '@alcumus/components';
import { TrialAccountStatus } from '../../types/trialAccountStatus';
import axios from 'axios';
import SalesWillContact from './states/Prompt/SalesWillContact';
import Prompt from './states/Prompt';
import SalesAlreadyContacted from './states/SalesAlreadyContacted';
import ExtensionExpired from './states/ExtensionExpired';
import AlreadyExtended from './states/AlreadyExtended';

export interface ExpiredTrialProps {
  t: TFunction;
  tReady: boolean;
}

export default function ExpiredTrial({ t, tReady }: ExpiredTrialProps) {
  const analytics = Analytics.getInstance();
  const [accountStatus, setAccountStatus] = useState<
    TrialAccountStatus | undefined
  >();

  useEffect(() => {
    let isMounted = true;
    axios.get('/api/getTrialAccountStatus').then((response) => {
      if (isMounted) {
        const accountStatus = response.data as TrialAccountStatus;
        const { contactEmail } = accountStatus;
        analytics.identify(contactEmail);

        if (!accountStatus.isActive) {
          window.location.assign('/api/redirects/login');
          return;
        }

        setAccountStatus(accountStatus);
      }
    });
    return () => {
      isMounted = false;
    };
  }, []);

  if (!accountStatus || !tReady) {
    return <LoadingPage />;
  } else {
    if (accountStatus.hasBeenExtended) {
      if (accountStatus.expired) {
        if (accountStatus.salesContacted) {
          return <SalesWillContact trialExtended={false} t={t} />;
        } else {
          return <ExtensionExpired t={t} />;
        }
      } else {
        if (accountStatus.salesContacted) {
          return <SalesAlreadyContacted t={t} />;
        } else {
          return <AlreadyExtended t={t} />;
        }
      }
    } else {
      return <Prompt t={t} />;
    }
  }
}
