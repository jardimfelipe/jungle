import React from 'react';

import { useSelector } from 'react-redux';
import { RootState } from '../../../store';

import Colaborador from './roles/Colaborador';
import Master from './roles/Master';
import Gestor from './roles/Gestor';

const Dashboard: React.FC = () => {
  const { currentUser } = useSelector(({ login }: RootState) => login);
  const dashboards = {
    master: <Master />,
    user: <Colaborador />,
    gestor: <Gestor />,
  };
  return dashboards[currentUser.role as keyof typeof dashboards];
};

export default Dashboard;
