import React from 'react';
import { Route, Redirect } from 'react-router-dom';

interface ProtectedRouteProps {
  component: any;
  path: string;
  exact: boolean;
  isProtected: boolean;
  redirectTo?: string;
}

export default function ProtectedRoute({
  component,
  path,
  exact,
  isProtected,
  redirectTo = '/',
  ...rest
}: ProtectedRouteProps) {
  if (isProtected) {
    return <Redirect to={redirectTo} />;
  }

  return <Route exact={exact} path={path} component={component} {...rest} />;
}
