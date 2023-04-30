import loadable from '@loadable/component';
import React from 'react';
import { match, Redirect, Switch, withRouter } from 'react-router-dom';
import PrivateRoute from '../../../components/PrivateRoute';
import { Roles } from '../../../constants';
import { NotFound } from '../../errors/NotFound';

interface AdminRouterProps {
  match: match;
}

const AdminRouter = ({ match }: AdminRouterProps) => (
  <Switch>
    <PrivateRoute exact path={match.path}>
      <Redirect to={`${match.url}/my-account`} />
    </PrivateRoute>
    <PrivateRoute
      exact
      path={`${match.url}/my-account`}
      component={loadable(() => import('./MyAccount'))}
    />
    <PrivateRoute
      exact
      path={`${match.url}/subscriptions`}
      restrictToRoles={[
        Roles.ALCUMUS_ADMIN,
        Roles.CLIENT_ADMIN,
        Roles.ALCUMUS_SUPPORT_TIER_1,
        Roles.ALCUMUS_SUPPORT_TIER_2,
        Roles.ALCUMUS_CUSTOMER_SUCCESS,
      ]}
      component={loadable(() => import('./SubscriptionsPage'))}
    />
    <PrivateRoute
      exact
      path={`${match.url}/users`}
      restrictToRoles={[
        Roles.CLIENT_ADMIN,
        Roles.ALCUMUS_ADMIN,
        Roles.ALCUMUS_SUPPORT_TIER_1,
        Roles.ALCUMUS_SUPPORT_TIER_2,
        Roles.ALCUMUS_CUSTOMER_SUCCESS,
      ]}
      component={loadable(() => import('./UsersPage'))}
    />
    <PrivateRoute
      exact
      path={`${match.url}/my-organization`}
      restrictToRoles={[
        Roles.CLIENT_ADMIN,
        Roles.ALCUMUS_ADMIN,
        Roles.ALCUMUS_SUPPORT_TIER_1,
        Roles.ALCUMUS_SUPPORT_TIER_2,
        Roles.ALCUMUS_CUSTOMER_SUCCESS,
      ]}
      component={loadable(() => import('./MyOrganizationPage'))}
    />
    <PrivateRoute
      path={`${match.url}/subscriptions/:id/`}
      restrictToRoles={[
        Roles.CLIENT_ADMIN,
        Roles.ALCUMUS_ADMIN,
        Roles.ALCUMUS_SUPPORT_TIER_1,
        Roles.ALCUMUS_SUPPORT_TIER_2,
        Roles.ALCUMUS_CUSTOMER_SUCCESS,
      ]}
      component={loadable(() => import('./SubscriptionDetailsPage'))}
    />
    <PrivateRoute>
      <NotFound />
    </PrivateRoute>
  </Switch>
);

export default withRouter(AdminRouter);
