import * as React from 'react';
import { Route } from 'react-router-dom';
import { RouteProps } from 'react-router';
import { useSelector } from 'react-redux';
import { RootState } from '../../../types/RootState';

export const PrivateRoute = (props: RouteProps): React.ReactElement | null => {
  const { user } = useSelector((state: RootState) => state.auth);
  return user !== null ? <Route {...props} /> : null;
};
