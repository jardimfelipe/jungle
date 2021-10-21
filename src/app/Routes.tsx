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
  EditQuestions,
} from '../components';

export const routes = {
  admin_jungle: [
    {
      name: 'Dashboard',
      translationName: 'dashboard',
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
      translationName: 'companies',
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
      translationName: 'dimensions',
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
      translationName: 'questions',
      path: '/questions',
      icon: <BiMessageSquareDetail />,
      render: () => (
        <BasicTemplate>
          <Questions />
        </BasicTemplate>
      ),
    },
    {
      path: '/questions/edit/:id',
      render: () => (
        <BasicTemplate>
          <EditQuestions />
        </BasicTemplate>
      ),
    },
    {
      name: 'Questionários',
      translationName: 'questionnaires',
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
      translationName: 'playbook',
      path: '/playbook',
      icon: <BiBuildings />,
      isSoon: true,
    },
    {
      name: 'Marketplace',
      translationName: 'marketplace',
      path: '/marketplace',
      isSoon: true,
      icon: <BiGridAlt />,
    },
    {
      name: 'MasterClass',
      translationName: 'MasterClass',
      path: '/master-class',
      isSoon: true,
      icon: <BiBookOpen />,
    },
    {
      name: 'MindGifts',
      translationName: 'mindgifts',
      path: '/mind-gifts',
      icon: <BiGift />,
      isSoon: true,
    },
    {
      name: 'Jungle Medical',
      translationName: 'junglemedical',
      path: '/jungle-medical',
      isSoon: true,
      icon: <MdLocalHospital />,
    },
  ],
  user: [
    {
      name: 'Dashboard',
      translationName: 'dashboard',
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
      translationName: 'questionnaires',
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
      translationName: 'myResults',
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
      translationName: 'playbook',
      path: '/playbook',
      icon: <BiBuildings />,
      isSoon: true,
    },
    {
      name: 'Marketplace',
      translationName: 'marketplace',
      path: '/marketplace',
      icon: <BiGridAlt />,
      isSoon: true,
    },
    {
      name: 'MasterClass',
      translationName: 'masterclass',
      path: '/master-class',
      icon: <BiBookOpen />,
      isSoon: true,
    },
  ],
  gestor: [
    {
      name: 'Dashboard',
      translationName: 'dashboard',
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
      translationName: 'questionnaires',
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
      translationName: 'teamResults',
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
      translationName: 'workers',
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
      translationName: 'playbook',
      path: '/playbook',
      icon: <BiBuildings />,
      isSoon: true,
    },
    {
      name: 'Marketplace',
      translationName: 'marketplace',
      path: '/marketplace',
      icon: <BiGridAlt />,
      isSoon: true,
    },
    {
      name: 'MasterClass',
      translationName: 'masterclass',
      path: '/master-class',
      icon: <BiBookOpen />,
      isSoon: true,
    },
  ],
};
