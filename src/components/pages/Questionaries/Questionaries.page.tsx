import React from 'react';

import { useSelector } from 'react-redux';
import { RootState } from '../../../store';

import Colaborador from './roles/Colaborador';
import Gestor from './roles/Gestor';
import Master from './roles/Master';

const Questoinaries: React.FC = () => {
  const { currentUser } = useSelector(({ login }: RootState) => login);
  const questionaries = {
    user: <Colaborador />,
    gestor: <Gestor />,
    admin_jungle: <Master />,
  };
  return questionaries[currentUser.role as keyof typeof questionaries];
};

export default Questoinaries;
