import React from 'react';
import { Switch, Route } from 'react-router-dom';
import loadable from '@loadable/component';
import { useSelector } from 'react-redux';
import {
  RegisterReducerStateType,
  Steps,
} from '../client/redux/reducers/register-reducer';
import { useIdleTimer } from 'react-idle-timer';
import { ProtectedRoute } from '@alcumus/components';
import environmentVariables from './environmentVariables';

export default function Router() {
  const register = useSelector(
    (state: { register: RegisterReducerStateType }) => state.register
  );

  useIdleTimer({
    timeout:
      1000 * 60 * Number(environmentVariables.SESSION_TIMEOUT_MINUTES || 15),
    events: ['keydown', 'mousedown'],
    onIdle: () => {
      console.log('Session timeout');
      window.location.assign('/');
    },
  });

  return (
    <Switch>
      <Route
        exact
        path="/"
        component={loadable(() => import('./components/RegisterPage'))}
      />
      <Route
        exact
        path="/error"
        component={loadable(() => import('./components/GenericError'))}
      />
      <Route
        exact
        path="/activate-account"
        component={loadable(() => import('./components/ActivationPage'))}
      />
      <Route
        exact
        path="/expired-trial"
        component={loadable(() => import('./components/ExpiredTrialPage'))}
      />
      <Route
        exact
        path="/freeTrialExpired"
        component={loadable(() => import('./components/FreeTrialExpiredPage'))}
      />
      <ProtectedRoute
        exact
        path="/welcome"
        isProtected={register.step !== Steps.QUESTIONNAIRE}
        component={loadable(() => import('./components/Welcome'))}
      />
      <ProtectedRoute
        exact
        path="/questionnaire"
        isProtected={register.step !== Steps.QUESTIONNAIRE}
        component={loadable(() => import('./components/QuestionnairePage'))}
      />
      <ProtectedRoute
        exact
        path="/questionnaire-test"
        isProtected={false}
        component={loadable(() => import('./components/QuestionnairePage'))}
      />
      <ProtectedRoute
        exact
        path="/verify-account"
        isProtected={register.step !== Steps.SUCCESS}
        component={loadable(() => import('./components/VerifyAccountPage'))}
      />
    </Switch>
  );
}
