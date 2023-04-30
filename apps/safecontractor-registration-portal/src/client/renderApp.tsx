import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import Router from '../common/router';
import i18n from './i18n';
import ReduxStateDecorator from './redux/StateDecorator';

export default async function RenderApp() {
  const supportsHistory = 'pushState' in window.history;
  const RootElement = document.getElementById('root') as HTMLElement;

  await i18n;

  if (typeof window !== 'undefined') {
    // @ts-ignore
    const stateData = document.getElementById('stateData') as HTMLElement;
    if (stateData) document.head.removeChild(stateData);
    // @ts-ignore
    delete window.__PRELOADED_STATE__;
  }
  await i18n;

  ReactDOM.hydrate(
    <BrowserRouter forceRefresh={!supportsHistory}>
      <ReduxStateDecorator>
        <Router />
      </ReduxStateDecorator>
    </BrowserRouter>,
    RootElement
  );
}
