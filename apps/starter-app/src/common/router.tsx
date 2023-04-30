import React from 'react';
import { Switch, Route } from 'react-router-dom';
import loadable from '@loadable/component';

export default function Router() {
  return (
    <Switch>
      <Route
        exact
        path="/"
        component={loadable(() => import('./pages/HomePage'))}
      />
    </Switch>
  );
}
