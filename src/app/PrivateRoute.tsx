import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import { RootState } from '../store';

const PrivateRoute: React.FC<{
  render: () => React.ReactNode;
  path: string;
  exact: boolean;
}> = (props) => {
  const { isLoggedIn } = useSelector(({ login }: RootState) => login);
  const { render, ...rest } = props;

  return isLoggedIn ? (
    <Route {...rest} render={() => render()} />
  ) : (
    <Redirect to={{ pathname: '/login' }} />
  );
};
export default PrivateRoute;
