import { Constants } from '@alcumus/core';
import loadable from '@loadable/component';
import React, { useCallback, useEffect, useState } from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';
import getLoginPageUrl, {
  getLoginRedirectUrl,
} from '../../../lib/utils/getLoginPageUrl';
import { Forbidden } from '../../pages/errors/Forbidden';
import { RoleAndPermissions } from '../../types';
import { validateToken } from './validateToken';
import store from 'store';
import { removeTokensFromLocalStorage } from '../../../lib/utils';
import redirectIfRedirectPathSet from '../../../lib/utils/redirectIfRedirectPathSet';

interface PrivateRouteProps extends RouteProps {
  loggedOut: boolean;
  useAzureAd?: boolean;
  restrictToRoles?: string[];
  loggedInUserRole?: RoleAndPermissions;
}

export default function PrivateRoute({
  component,
  path,
  exact,
  loggedOut,
  restrictToRoles,
  useAzureAd = false,
  loggedInUserRole,
  ...rest
}: PrivateRouteProps) {
  // Hard redirect to login page if logged out and using azure ad
  const [isLoading, setIsLoading] = useState(true);
  const fetchValidity = useCallback(async () => {
    let status: number | undefined;
    try {
      status = await validateToken();
    } catch (e) {
      console.error(e);
    }
    return status;
  }, []);
  useEffect(() => {
    if (useAzureAd && loggedOut) {
      removeTokensFromLocalStorage();
      window.location.href = getLoginRedirectUrl();
    }
  }, [useAzureAd, loggedOut]);

  useEffect(() => {
    const accessToken = store.get(Constants.LocalStorageKeys.AccessToken);
    if (accessToken) {
      fetchValidity()
        .then(function (result) {
          if (result === 200) {
            setIsLoading(false);
          } else {
            removeTokensFromLocalStorage();
            redirectIfRedirectPathSet();
          }
        })
        .catch((e) => {
          console.error(e);
        });
    } else {
      removeTokensFromLocalStorage();
      redirectIfRedirectPathSet();
    }
  }, [isLoading, fetchValidity]);

  if (loggedOut && !useAzureAd) {
    return <Redirect to={getLoginPageUrl()} />;
  }

  if (Array.isArray(restrictToRoles)) {
    const role = loggedInUserRole;

    if (
      !role ||
      !role.roleLookupKey ||
      !restrictToRoles.includes(role.roleLookupKey)
    ) {
      return <Forbidden />;
    }
  }

  return (
    <React.Fragment>
      {isLoading ? (
        <Route
          exact={exact}
          path={path}
          component={loadable(() => import('./../../pages/LoadingPage'))}
        />
      ) : (
        <Route exact={exact} path={path} component={component} {...rest} />
      )}
    </React.Fragment>
  );
}
