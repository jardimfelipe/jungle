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
import { FiUsers } from 'react-icons/fi';
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
  TeamResults,
  Workers,
  Questions,
  BlankTemplate,
  CreateQuestionary,
  EditQuestionary,
} from '../components';

export const routes = {
  admin_jungle: [
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
      render: () => (
        <BasicTemplate>
          <Companies />
        </BasicTemplate>
      ),
    },
    {
      path: '/companies/company/:id',
      component: <Company />,
      render: () => (
        <BasicTemplate>
          <Company />
        </BasicTemplate>
      ),
    },
    {
      name: 'Dimensões',
      path: '/dimensions',
      icon: <BiPurchaseTag />,
      component: <Dimensions />,
      render: () => (
        <BasicTemplate>
          <Dimensions />
        </BasicTemplate>
      ),
    },
    {
      name: 'Perguntas',
      path: '/questions',
      icon: <BiMessageSquareDetail />,
      render: () => (
        <BasicTemplate>
          <Questions />
        </BasicTemplate>
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
      path: '/questionaries/create',
      render: () => (
        <BlankTemplate>
          <CreateQuestionary />
        </BlankTemplate>
      ),
    },
    {
      path: '/questionaries/edit/:id',
      render: () => (
        <BlankTemplate>
          <EditQuestionary />
        </BlankTemplate>
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
};
