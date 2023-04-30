import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import i18n from './i18n';
import Router from '../common/router';
import ReduxStateDecorator from './redux/StateDecorator';
import Analytics from '@alcumus/analytics-package';
import { Utilities } from '@alcumus/core';
import { SWRConfig } from 'swr';
import { swrFetcher } from './swrFetcher';

export default async function RenderApp() {
  const supportsHistory = 'pushState' in window.history;
  const RootElement = document.getElementById('root') as HTMLElement;

  let preloadedState;

  // Todo: remove this await, add an root component that waits for i18n
  await i18n;

  if (typeof window !== 'undefined') {
    // @ts-ignore
    preloadedState = window.__PRELOADED_STATE__ || {};
    const stateData = document.getElementById('stateData') as HTMLElement;
    if (stateData) document.head.removeChild(stateData);
    // @ts-ignore
    delete window.__PRELOADED_STATE__;
  }

  const analyticsToken = Utilities.ProcessEnv.getValueOrNull(
    'ALCUMUS_PORTAL_MIXPANEL_TOKEN'
  );

  if (analyticsToken) {
    Analytics.getInstance().initialize(analyticsToken);
  }

  ReactDOM.hydrate(
    <BrowserRouter forceRefresh={!supportsHistory}>
      <ReduxStateDecorator initialState={preloadedState}>
        <SWRConfig value={{ fetcher: swrFetcher }}>
          <Router />
        </SWRConfig>
      </ReduxStateDecorator>
    </BrowserRouter>,
    RootElement
  );
}
