import React from 'react';
import { Route, Switch } from 'react-router-dom';
import loadable from '@loadable/component';
import PrivateRoute from './components/PrivateRoute';
import { NotFound } from './pages/errors/NotFound';

export default function Router() {
  return (
    <Switch>
      <Route
        exact
        path="/login/discovery"
        component={loadable(() => import('./pages/LoginDiscovery'))}
      />
      <Route
        exact
        path="/login/credentials"
        component={loadable(() => import('./pages/LoginCredentials'))}
      />
      <Route
        exact
        path="/login"
        component={loadable(() => import('./pages/LoginCredentials'))}
      />
      <Route
        exact
        path="/authorize"
        component={loadable(() => import('./pages/AuthorizeSession'))}
      />
      <Route
        exact
        path="/register"
        component={loadable(() => import('./pages/Signup'))}
      />
      <Route
        exact
        path="/forgot-password"
        component={loadable(() => import('./pages/ForgotPassword'))}
      />
      <PrivateRoute
        exact
        path="/logout"
        component={loadable(() => import('./pages/Logout'))}
      />
      <PrivateRoute
        exact
        path="/"
        component={loadable(() => import('./pages/areas/user/HomePage'))}
      />
      <PrivateRoute
        exact
        path="/home"
        component={loadable(() => import('./pages/areas/user/HomePage'))}
      />
      <PrivateRoute
        exact
        path="/launch/:product"
        component={loadable(() => import('./pages/areas/user/LaunchProduct'))}
      />
      <PrivateRoute
        exact
        path="/all-applications"
        component={loadable(() => import('./pages/areas/user/AllApplications'))}
      />
      <PrivateRoute
        exact
        path="/product/people-and-safety-management"
        component={loadable(
          () => import('./pages/areas/user/AllApplications/PSM')
        )}
      />
      <PrivateRoute
        exact
        path="/product/safe-contractor"
        component={loadable(
          () => import('./pages/areas/user/AllApplications/SafeContractor')
        )}
      />
      <PrivateRoute
        exact
        path="/product/supply-chain-compliance"
        component={loadable(
          () =>
            import('./pages/areas/user/AllApplications/SupplyChainCompliance')
        )}
      />
      <PrivateRoute
        exact
        path="/product/isoqar"
        component={loadable(
          () => import('./pages/areas/user/AllApplications/ISOQAR')
        )}
      />
      <PrivateRoute
        exact
        path="/product/esg-performance-reporting"
        component={loadable(
          () => import('./pages/areas/user/AllApplications/ESG')
        )}
      />
      <PrivateRoute
        exact={false}
        path="/settings"
        component={loadable(() => import('./pages/areas/settings/router'))}
      />
      <PrivateRoute
        exact
        path="/product/fieldId"
        component={loadable(
          () => import('./pages/areas/user/AllApplications/FieldId')
        )}
      />
      <PrivateRoute
        exact
        path="/product/eCompliance"
        component={loadable(
          () => import('./pages/areas/user/AllApplications/eCompliance')
        )}
      />
      <PrivateRoute
        exact
        path="/product/safety-intelligence"
        component={loadable(
          () => import('./pages/areas/user/AllApplications/SafetyIntelligence')
        )}
      />
      <PrivateRoute
        exact
        path="/product/sypol"
        component={loadable(
          () => import('./pages/areas/user/AllApplications/Sypol')
        )}
      />
      <PrivateRoute
        exact
        path="/product/ePermits"
        component={loadable(
          () => import('./pages/areas/user/AllApplications/ePermits')
        )}
      />
      <PrivateRoute
        exact
        path="/product/contractorcheck"
        component={loadable(
          () => import('./pages/areas/user/AllApplications/ContractorCheck')
        )}
      />
      <PrivateRoute>
        <NotFound />
      </PrivateRoute>
    </Switch>
  );
}
