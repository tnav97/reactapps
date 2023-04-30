import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import Router from '../common/router';
import ReduxStateDecorator from './redux/StateDecorator';
import i18n from './i18n';
import Analytics from '@alcumus/analytics-package';
import environmentVariables from '../common/environmentVariables';
import {
  configureBrowserWebApp,
  BrowserWebAppConfiguration,
} from '@alcumus/browser-web-utils';

export default async function RenderApp() {
  const supportsHistory = 'pushState' in window.history;
  const RootElement = document.getElementById('root') as HTMLElement;

  let preloadedState;
  if (typeof window !== 'undefined') {
    // @ts-ignore
    preloadedState = window.__PRELOADED_STATE__ || {};
    const stateData = document.getElementById('stateData') as HTMLElement;
    if (stateData) document.head.removeChild(stateData);
    // @ts-ignore
    delete window.__PRELOADED_STATE__;
  }

  // Todo: remove this await, add an root component that waits for i18n
  await i18n;
  const conf: BrowserWebAppConfiguration = {
    sentry: {
      SENTRY_ENVIRONMENT: environmentVariables.SENTRY_ENVIRONMENT as string,
      SENTRY_DSN: environmentVariables.SENTRY_DSN as string,
      SENTRY_SAMPLE_RATE: environmentVariables.SENTRY_SAMPLE_RATE || '1.0',
      SENTRY_RELEASE: environmentVariables.SENTRY_RELEASE as string,
    },
  };
  configureBrowserWebApp(conf);

  if (environmentVariables.MIXPANEL_TOKEN) {
    Analytics.getInstance().initialize(environmentVariables.MIXPANEL_TOKEN);
  }

  ReactDOM.hydrate(
    <BrowserRouter forceRefresh={!supportsHistory}>
      <ReduxStateDecorator initialState={preloadedState}>
        <Router />
      </ReduxStateDecorator>
    </BrowserRouter>,
    RootElement
  );
}
