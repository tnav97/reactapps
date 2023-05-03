import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';
import { IReduxRootState } from '../../../client/redux/reducers';

interface PrivateRoute {
  component: Function;
  path?: string | undefined;
}

function PrivateRoute({
  component: Component,
  path,
  ...restOfProps
}: PrivateRoute) {
  const confirmationState = useSelector(
    (state: IReduxRootState) => state.payment
  );

  return (
    <Route
      path={path}
      {...restOfProps}
      render={(restOfProps) =>
        confirmationState.isRegistered ? (
          <Component {...restOfProps} />
        ) : (
          <Redirect to="/" />
        )
      }
    />
  );
}

export default PrivateRoute;
