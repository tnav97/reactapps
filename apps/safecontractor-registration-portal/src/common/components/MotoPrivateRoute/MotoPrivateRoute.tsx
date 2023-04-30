import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Route } from 'react-router-dom';
import { IReduxRootState } from '../../../client/redux/reducers';

interface MotoPrivateRouteProbs {
  component: Function;
  path?: string | undefined;
}

function MotoPrivateRoute({
  component: Component,
  path,
  ...restOfProps
}: MotoPrivateRouteProbs) {
  const confirmationState = useSelector(
    (state: IReduxRootState) => state.motoPayment
  );

  return (
    <Route
      path={path}
      {...restOfProps}
      Component={(restOfProps) =>
        confirmationState.isRegistered ? (
          <Component {...restOfProps} />
        ) : (
          <Navigate to="/moto" />
        )
      }
    />
  );
}

export default MotoPrivateRoute;
