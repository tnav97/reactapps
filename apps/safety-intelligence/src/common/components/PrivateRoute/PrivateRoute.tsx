import { useInterval } from '@alcumus/hooks';
import React, { useCallback, useEffect, useState } from 'react';
import { Route, Redirect, RouteComponentProps } from 'react-router-dom';
import { atom, useRecoilState } from 'recoil';
import { UserApplicationAccessDto } from '../../../dtos/userApplicationAccessDto';
import { refresh } from '../../../server/models/auth';
import {
  getApplicationAccessDetails,
  hasLookerAccess,
  initializePortalToken,
  PortalAuthenticationTypes,
} from '../../../server/models/looker-account';
import LoadingPage from '../LoadingPage/LoadingPage';

interface PrivateRouteProps {
  path: string;
  exact: boolean;
  route: {
    component:
      | React.FunctionComponent<RouteComponentProps<any>>
      | React.ComponentType<any>;
  };
}

export const changePassword = atom<string>({
  key: 'showUpdatePasswordButton',
  default: 'false',
});

export const authorizationToken = atom<string>({
  key: 'authorizationToken',
  default: '',
});

export const refreshToken = atom<string>({
  key: 'refreshToken',
  default: '',
});

export const refreshTokenExpiry = atom<string>({
  key: 'refreshTokenExpiry',
  default: '',
});

export const accessTokenExpiry = atom<string>({
  key: 'accessTokenExpiry',
  default: '',
});

export const currentApp = atom<string>({
  key: 'currentApp',
  default: '',
});

export const portalAuthenticatedState = atom<boolean>({
  key: 'portalAuthenticatedState',
  default: false,
});

export const lookerAuthenticatedState = atom<boolean>({
  key: 'lookerAuthenticatedState',
  default: false,
});

export const userAppsState = atom<UserApplicationAccessDto[]>({
  key: 'userAppsState',
  default: [],
});

export default function PrivateRoute({
  path,
  exact,
  route,
}: PrivateRouteProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [isLookerAuthenticated, setIsLookerAuthenticated] = useRecoilState(
    lookerAuthenticatedState
  );

  const tokenRefreshInterval = 1 * 60 * 1000;
  const [app, setApp] = useRecoilState(currentApp);
  const [isPortalAuthenticating, setIsPortalAuthenticating] = useState(false);

  const [portalToken, setPortalToken] = useRecoilState(authorizationToken);
  const [canChangePassword, setCanChangePassword] =
    useRecoilState(changePassword);
  const [refToken, setRefreshToken] = useRecoilState(refreshToken);
  const [refTokenExpiry, setRefTokenExpiry] =
    useRecoilState(refreshTokenExpiry);
  const [accTokExpiry, setAccTokenExpiry] = useRecoilState(accessTokenExpiry);
  const [, setApps] = useRecoilState(userAppsState);

  const handleErrors = () => {
    setIsLookerAuthenticated(false);
    setIsLoading(false);
  };

  const getPortalAccess = useCallback(async () => {
    const result: PortalAuthenticationTypes = await initializePortalToken();
    if (result === PortalAuthenticationTypes.Authenticated) {
      getUserApps();
    } else if (result === PortalAuthenticationTypes.IsAuthenticating) {
      setIsPortalAuthenticating(true);
    } else {
      handleErrors();
    }
  }, []);

  const getLookerAccess = useCallback(async () => {
    const result = await hasLookerAccess();
    setIsLookerAuthenticated(result);
    setIsLoading(false);
  }, []);

  useInterval(() => {
    const refreshToken = localStorage.getItem('refreshToken');
    const accessToken = localStorage.getItem('accessToken');
    if (refreshToken && accessToken) {
      refresh(refreshToken, accessToken);
    }
  }, tokenRefreshInterval);

  useEffect(() => {
    if (portalToken === '' || portalToken === undefined) {
      getPortalAccess();
    } else {
      localStorage.setItem('accessToken', portalToken);
      localStorage.setItem('refreshToken', refToken);
      localStorage.setItem('expiresIn', accTokExpiry);
      localStorage.setItem('showUpdatePasswordButton', canChangePassword);
      setCanChangePassword('false');
      setPortalToken('');
      setAccTokenExpiry('');
      setRefTokenExpiry('');
      setRefreshToken('');
    }
  }, [portalToken]);

  const getUserApps = useCallback(async () => {
    getApplicationAccessDetails()
      .then((response: UserApplicationAccessDto[]) => {
        const localStorageApp = localStorage.getItem('application_id');
        if (
          localStorageApp &&
          response.findIndex((x) => x.appId === localStorageApp) > -1
        ) {
          setApp(localStorageApp);
        } else {
          const [defaultApp] = response;
          localStorage.setItem('application_id', defaultApp.appId);
          setApp(defaultApp.appId);
        }
        setApps(response);
      })
      .catch(() => {
        setIsLookerAuthenticated(false);
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    if (app !== '') {
      setIsLoading(true);
      setIsLookerAuthenticated(false);
      getLookerAccess();
    }
  }, [app]);

  return (
    <Route
      path={path}
      exact={exact}
      render={(props) => {
        return isLoading || isPortalAuthenticating ? (
          <LoadingPage />
        ) : isLookerAuthenticated ? (
          <>{route.component && <route.component {...props} />}</>
        ) : (
          <Redirect to="/unauthorized" />
        );
      }}
    />
  );
}
