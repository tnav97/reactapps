import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import Router from '../common/router';
import ReduxStateDecorator from './redux/StateDecorator';
import i18n from './i18n';
import { MIXPANEL_TOKEN } from '../common/environmentVariables';
import Analytics from '@alcumus/analytics-package';

export default async function RenderApp() {
  const supportsHistory = 'pushState' in window.history;
  const RootElement = document.getElementById('root') as HTMLElement;

  await i18n;

  let preloadedState;
  if (typeof window !== 'undefined') {
    // @ts-ignore
    preloadedState = window.__PRELOADED_STATE__ || {};
    const stateData = document.getElementById('stateData') as HTMLElement;
    if (stateData) document.head.removeChild(stateData);
    // @ts-ignore
    delete window.__PRELOADED_STATE__;
  }

  if (MIXPANEL_TOKEN) {
    Analytics.getInstance().initialize(MIXPANEL_TOKEN);
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
