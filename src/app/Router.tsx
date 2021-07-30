import React, { useEffect } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import {
  BasicTemplate,
  QuestionaryApplication,
  QuestionaryApplicationTemplate,
} from '../components';
import Login from '../components/pages/Login/login.page';
import PrivateRoute from './PrivateRoute';

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { getSavedState } from '../utils/localStorage';
import { getUserInfo } from '../store/modules/login/actions';
import { routes } from './Routes';

const Router: React.FC = () => {
  const { currentUser } = useSelector(({ login }: RootState) => login);
  const dispatch = useDispatch();
  useEffect(() => {
    const hasToken = getSavedState('auth.token');
    if (hasToken && !currentUser.name) {
      dispatch(getUserInfo());
    }
  }, [currentUser.name, dispatch]);
  return currentUser.role || !getSavedState('auth.token') ? (
    <BrowserRouter>
      <Switch>
        <Route exact path="/login" component={Login} />
        {routes[(currentUser.role as keyof typeof routes) || 'gestor'].map(
          (route) => (
            <PrivateRoute
              key={Math.random()}
              exact
              path={route.path}
              render={() =>
                route.render ? (
                  route.render()
                ) : (
                  <BasicTemplate>{route.component}</BasicTemplate>
                )
              }
            />
          )
        )}
        <PrivateRoute
          exact
          path="/questionaries/application/:id"
          render={() => (
            <QuestionaryApplicationTemplate>
              <QuestionaryApplication />
            </QuestionaryApplicationTemplate>
          )}
        />
      </Switch>
    </BrowserRouter>
  ) : null;
};

export default Router;
