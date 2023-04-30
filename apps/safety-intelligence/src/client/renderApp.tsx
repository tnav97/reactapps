import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import i18n from './i18n';
import Analytics from '@alcumus/analytics-package';
import environmentVariables from '../common/environmentVariables';
import store from 'store';

import {
  accessTokenExpiry,
  authorizationToken,
  refreshToken,
  changePassword,
} from '../common/components/PrivateRoute/PrivateRoute';
import Router from '../common/Router';

export default async function RenderApp() {
  const analytics = Analytics.getInstance();
  if (environmentVariables.MIXPANEL_TOKEN) {
    analytics.initialize(environmentVariables.MIXPANEL_TOKEN);
    const firstName = store.get('user_first_name');
    const lastName = store.get('user_last_name');
    // If user is blocking 3rd party cookies, they would be tracked as "undefined_undefined"
    // This check is implemented so that the tracking ID falls back to device ID if cookies are blocked.
    if (firstName && lastName) {
      analytics.identify(`${firstName}_${lastName}`);
    }
  }

  const supportsHistory = 'pushState' in window.history;
  const RootElement = document.getElementById('root') as HTMLElement;
  let initializeState;

  // Todo: remove this await, add an root component that waits for i18n
  await i18n;

  if (typeof window !== 'undefined') {
    // @ts-ignore
    const preloadedState = window.__PRELOADED_STATE__ || {};
    const stateData = document.getElementById('stateData') as HTMLElement;
    initializeState = ({ set }: any) => {
      set(authorizationToken, preloadedState.portalToken?.accessToken);
      set(refreshToken, preloadedState.portalToken?.refreshToken);
      set(accessTokenExpiry, preloadedState.portalToken?.expiresIn);
      set(
        changePassword,
        preloadedState.featureToggle?.showUpdatePasswordButton
      );
    };
    if (stateData) document.head.removeChild(stateData);
    // @ts-ignore
  }

  ReactDOM.hydrate(
    <BrowserRouter forceRefresh={!supportsHistory}>
      <RecoilRoot initializeState={initializeState}>
        <Router />
      </RecoilRoot>
    </BrowserRouter>,
    RootElement
  );
}
