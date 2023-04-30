import React from 'react';
import { LoadingPage } from '@alcumus/components';
import { Redirect, useLocation } from 'react-router-dom';
import { useTimeout } from '@alcumus/hooks';
import { getLoginRedirectUrl } from '../../../lib/utils/getLoginPageUrl';
import { LoginFlowHooks } from '../../hooks/LoginLogoutFlow';
import redirectIfRedirectPathSet from '../../../lib/utils/redirectIfRedirectPathSet';
import qs from 'querystring';

interface LogoutPageProps {
  isLoggedIn: boolean;
  attemptLogout: () => void;
}

export default function LogoutPage({
  isLoggedIn = true,
  attemptLogout,
}: LogoutPageProps): JSX.Element {
  LoginFlowHooks.clearTemporaryValues();
  const location = useLocation();
  const rp = qs.parse(location.search.substring(1));
  useTimeout(
    () => {
      if (isLoggedIn) {
        attemptLogout();
      }
    },
    1000,
    [isLoggedIn, attemptLogout]
  );

  if (!isLoggedIn && !rp) {
    const url = getLoginRedirectUrl();
    return <Redirect to={url} />;
  } else if (!isLoggedIn && rp) {
    redirectIfRedirectPathSet();
  }

  return (
    <LoadingPage
      message="Ending session..."
      logoImageUrl="/images/alcumus-logo-with-tagline.svg"
    />
  );
}
