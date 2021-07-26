import React, { useEffect } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import {
  BiHomeAlt,
  BiBuildings,
  BiPurchaseTag,
  BiMessageSquareDetail,
  BiDockLeft,
  BiGridAlt,
  BiBookOpen,
  BiGift,
} from 'react-icons/bi';
import { MdLocalHospital } from 'react-icons/md';
import { IoFolderOutline } from 'react-icons/io5';
import {
  BasicTemplate,
  Dashboard,
  Companies,
  Company,
  Dimensions,
  WorkerTemplate,
  Questionaries,
  MyResults,
  QuestionaryApplication,
  QuestionaryApplicationTemplate,
  TeamResults,
  Workers,
} from '../components';
import Login from '../components/pages/Login/login.page';
import PrivateRoute from './PrivateRoute';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { getSavedState } from '../utils/localStorage';
import { getUserInfo } from '../store/modules/login/actions';
import { FiUsers } from 'react-icons/fi';

export const routes = {
  master: [
    {
      name: 'Dashboard',
      path: '/',
      icon: <BiHomeAlt />,
      component: <Dashboard />,
      render: () => (
        <BasicTemplate>
          <Dashboard />
        </BasicTemplate>
      ),
    },
    {
      name: 'Empresas',
      path: '/companies',
      icon: <BiBuildings />,
      component: <Companies />,
    },
    {
      path: '/companies/company/:id',
      component: <Company />,
    },
    {
      name: 'Dimensões',
      path: '/dimensions',
      icon: <BiPurchaseTag />,
      component: <Dimensions />,
    },
    {
      name: 'Perguntas',
      path: '/questions',
      icon: <BiMessageSquareDetail />,
    },
    {
      name: 'Questionários',
      path: '/questionaries',
      icon: <BiDockLeft />,
    },
    {
      name: 'Playbook',
      path: '/playbook',
      icon: <BiBuildings />,
    },
    {
      name: 'Marketplace',
      path: '/marketplace',
      isSoon: true,
      icon: <BiGridAlt />,
    },
    {
      name: 'MasterClass',
      path: '/master-class',
      isSoon: true,
      icon: <BiBookOpen />,
    },
    {
      name: 'MindGifts',
      path: '/mind-gifts',
      icon: <BiGift />,
      isSoon: true,
    },
    {
      name: 'Jungle Medical',
      path: '/jungle-medical',
      isSoon: true,
      icon: <MdLocalHospital />,
    },
  ],
  user: [
    {
      name: 'Dashboard',
      path: '/',
      icon: <BiHomeAlt />,
      component: <Dashboard />,
      render: () => (
        <WorkerTemplate>
          <Dashboard />
        </WorkerTemplate>
      ),
    },
    {
      name: 'Questionários',
      path: '/questionaries',
      icon: <BiDockLeft />,
      render: () => (
        <WorkerTemplate>
          <Questionaries />
        </WorkerTemplate>
      ),
    },
    {
      name: 'Meus resultados',
      path: '/my-results',
      icon: <IoFolderOutline />,
      render: () => (
        <WorkerTemplate>
          <MyResults />
        </WorkerTemplate>
      ),
    },
    {
      name: 'Playbook',
      path: '/playbook',
      icon: <BiBuildings />,
      isSoon: true,
    },
    {
      name: 'Marketplace',
      path: '/marketplace',
      icon: <BiGridAlt />,
      isSoon: true,
    },
    {
      name: 'MasterClass',
      path: '/master-class',
      icon: <BiBookOpen />,
      isSoon: true,
    },
  ],
  gestor: [
    {
      name: 'Dashboard',
      path: '/',
      icon: <BiHomeAlt />,
      component: <Dashboard />,
      render: () => (
        <WorkerTemplate>
          <Dashboard />
        </WorkerTemplate>
      ),
    },
    {
      name: 'Questionários',
      path: '/questionaries',
      icon: <BiDockLeft />,
      render: () => (
        <WorkerTemplate>
          <Questionaries />
        </WorkerTemplate>
      ),
    },
    {
      name: 'Resultados do time',
      path: '/team-results',
      icon: <IoFolderOutline />,
      render: () => (
        <WorkerTemplate>
          <TeamResults />
        </WorkerTemplate>
      ),
    },
    {
      name: 'Colaboradores',
      path: '/workers',
      icon: <FiUsers />,
      render: () => (
        <WorkerTemplate>
          <Workers />
        </WorkerTemplate>
      ),
    },
    {
      name: 'Playbook',
      path: '/playbook',
      icon: <BiBuildings />,
    },
    {
      name: 'Marketplace',
      path: '/marketplace',
      icon: <BiGridAlt />,
      isSoon: true,
    },
    {
      name: 'MasterClass',
      path: '/master-class',
      icon: <BiBookOpen />,
      isSoon: true,
    },
  ],
};

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
        {routes[(currentUser.role as keyof typeof routes) || 'master'].map(
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
