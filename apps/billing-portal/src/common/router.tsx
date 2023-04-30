import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import loadable from '@loadable/component';
import { ProtectedRoute } from '@alcumus/components';
import { useSelector } from 'react-redux';
import { IReduxRootState } from '../client/redux/reducers';

export default function Router() {
  const reviewState = useSelector((state: IReduxRootState) => state.review);
  const confirmationState = useSelector(
    (state: IReduxRootState) => state.confirmation
  );

  return (
    <Switch>
      <Redirect exact path="/" to="/plans" />
      <Route
        exact
        path="/iframe/banners/upgrade"
        component={loadable(() => import('./components/shared/UpgradeBanner'))}
      />
      <Route
        exact
        path="/iframe/banners/failedPayment"
        component={loadable(
          () => import('./components/shared/FailedPaymentBanner')
        )}
      />
      <Route
        exact
        path="/iframe/banners/welcomeToPaidPlans"
        component={loadable(
          () => import('./components/shared/PaidPlanWelcomePage')
        )}
      />
      <Route
        exact
        path="/plans"
        component={loadable(() => import('./components/PlansPage'))}
      />
      <ProtectedRoute
        exact
        path="/confirmation"
        isProtected={!confirmationState.checkoutSessionId}
        component={loadable(() => import('./components/OrderConfirmationPage'))}
      />
      <Route
        exact
        path="/unauthorized"
        component={loadable(
          () => import('./components/UnauthorizedUpgradePage')
        )}
      />
      <ProtectedRoute
        exact
        path="/review"
        isProtected={
          !reviewState.plan ||
          !reviewState.seats ||
          !reviewState.billingFrequency
        }
        component={loadable(() => import('./components/ReviewPage'))}
      />
    </Switch>
  );
}
