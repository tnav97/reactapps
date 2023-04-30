import React from 'react';
import { Route, Switch } from 'react-router-dom';
import loadable from '@loadable/component';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';

export default function Router() {
  return (
    <Switch>
      <PrivateRoute
        path={'/folders'}
        exact
        route={{
          component: loadable(
            () => import('./components/FoldersPage/FoldersHomePage')
          ),
        }}
      />
      <PrivateRoute
        path={'/reports'}
        exact
        route={{
          component: loadable(
            () => import('./components/ReportsPage/ReportsHomePage')
          ),
        }}
      />
      <PrivateRoute
        path={'/reports/:folderId'}
        exact={false}
        route={{
          component: loadable(
            () => import('./components/EmbeddedReports/EmbedReportPage')
          ),
        }}
      />
      <PrivateRoute
        path={'/folders/:folderId'}
        exact={true}
        route={{
          component: loadable(
            () => import('./components/FoldersPage/SubFolderPage')
          ),
        }}
      />
      <PrivateRoute
        path={'/recent'}
        exact={false}
        route={{
          component: loadable(
            () => import('./components/RecentPage/RecentReportsPage')
          ),
        }}
      />
      <PrivateRoute
        path={'/popular'}
        exact={false}
        route={{
          component: loadable(
            () => import('./components/PopularPage/PopularReportsPage')
          ),
        }}
      />
      <PrivateRoute
        path={'/favorite'}
        exact
        route={{
          component: loadable(
            () => import('./components/FavoritePage/FavoriteReportsPage')
          ),
        }}
      />
      <PrivateRoute
        path={'/'}
        exact
        route={{
          component: loadable(
            () => import('./components/FoldersPage/FoldersHomePage')
          ),
        }}
      />
      <Route
        path={'/error'}
        exact
        component={loadable(() => import('./components/Errors/ErrorPage'))}
      />
      <Route
        path={'/unauthorized'}
        exact
        component={loadable(
          () => import('./components/Errors/NotAuthorizedPage')
        )}
      />
      <Route
        path={'/notfound'}
        exact
        component={loadable(() => import('./components/Errors/NotFoundPage'))}
      />
    </Switch>
  );
}
