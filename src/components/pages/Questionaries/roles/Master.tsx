import React, { useEffect, useState } from 'react';

import { Col, Row } from 'react-flexbox-grid';
import {
  Box,
  Button,
  Tag,
  Select,
  Typography,
  Resume,
  TabNavigation,
  Table,
  TableMenu,
  ColumnButton,
} from '../../../';
import { BiBuildings, BiDockLeft } from 'react-icons/bi';
import PromotionalCard from '../../../molecules/PromotionalCard/PromotionalCard';

import { useTheme } from 'styled-components';
import { getQuestionariesRequest } from '../../../../store/modules/questionaries/actions';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../store';
import { Questionary } from '../../../../store/modules/questionaries/types';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { Field } from '../../../molecules/Table/table.types';

const { Text } = Typography;

const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' },
];

type PageTabs = 'questionarios' | 'templates' | 'rascunhos';

const Master: React.FC = () => {
  const tableMenuItems = [
    {
      title: 'Visualizar',
      onClick: () => console.log('onClick'),
    },
    {
      title: 'Editar',
      onClick: () => console.log('onClick'),
    },
    {
      title: 'Editar rastreio',
      onClick: () => console.log('onClick'),
    },
    {
      title: 'Resultados',
      onClick: () => console.log('onClick'),
    },
    {
      title: 'Duplicar',
      onClick: () => console.log('onClick'),
    },
    {
      title: 'Histório',
      onClick: () => console.log('onClick'),
    },
    {
      title: 'Excluir',
      onClick: () => console.log('onClick'),
      isDanger: true,
    },
  ];
  const tableFields: Field[] = [
    {
      title: 'Título',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Dimensão',
      dataIndex: 'dimension',
      key: 'dimension',
      render: (value: Questionary['dimension']) => <Text>{value?.name}</Text>,
    },
    {
      title: 'Número de perguntas',
      dataIndex: 'question',
      key: 'question',
      render: (value: Questionary['question']) => (
        <Text>{value.length} perguntas</Text>
      ),
    },
    {
      title: 'Cliente',
      dataIndex: 'client',
      key: 'client',
      render: () => <Text>Magalu</Text>,
    },
    {
      title: 'Criado em',
      dataIndex: 'replied',
      key: 'replied',
      render: () => <Text>01/06/2021</Text>,
    },
    {
      title: 'Rastreio',
      dataIndex: '_id',
      key: '_id',
      render: () => <Text>16/06 a 20/07</Text>,
    },
    {
      title: 'Rastreio',
      dataIndex: '_id',
      key: '_id',
      render: () => <Text>16/06 a 20/07</Text>,
    },
    {
      title: 'Status',
      dataIndex: '__v',
      key: '__v',
      render: () => (
        <Tag size="large" color="success">
          ativo
        </Tag>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'respondents',
      key: 'respondents',
      render: (value, object, index) => (
        <>
          <TableMenu
            onClose={() => handleCloseButton()}
            isOpen={currentOpenMenu === index}
            menuItems={tableMenuItems}
          />
          <ColumnButton onClick={() => handleTableButtonClick(index)}>
            <BsThreeDotsVertical color={theme.colors.black} size="24" />
          </ColumnButton>
        </>
      ),
    },
  ];
  const [currentOpenMenu, setCurrentOpenMenu] = useState(-1);
  const dispatch = useDispatch();
  const theme = useTheme();
  const [currentTab, setCurrentTab] = useState<PageTabs>('questionarios');
  const { questionaries, isLoading } = useSelector(
    ({ questionaries }: RootState) => questionaries
  );

  const resumeItems = [
    {
      name: 'Empresas',
      icon: <BiBuildings size="32" color={theme.colors.blue} />,
      total: 20,
    },
    {
      name: 'Questionários',
      icon: <BiDockLeft size="32" color="#3BC8E3" />,
      total: 200,
    },
    {
      name: 'Ativos',
      icon: <BiDockLeft size="32" color={theme.colors.p3} />,
      total: 60,
    },
    {
      name: 'Inativos',
      icon: <BiDockLeft size="32" color={theme.colors.p1} />,
      total: 140,
    },
  ];

  const handleTableButtonClick = (index: number) => {
    setCurrentOpenMenu(index);
  };

  const handleCloseButton = () => {
    setCurrentOpenMenu(-1);
  };

  useEffect(() => {
    dispatch(getQuestionariesRequest());
  }, [dispatch]);
  return (
    <Box params={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <PromotionalCard />

      <Box
        params={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Box params={{ display: 'flex', gap: '15px' }}>
          <TabNavigation
            onClick={() => setCurrentTab('questionarios')}
            isActive={currentTab === 'questionarios'}
          >
            Questionários
          </TabNavigation>
          <TabNavigation
            onClick={() => setCurrentTab('templates')}
            isActive={currentTab === 'templates'}
          >
            Templates
          </TabNavigation>
          <TabNavigation
            onClick={() => setCurrentTab('rascunhos')}
            isActive={currentTab === 'rascunhos'}
          >
            Rascunhos
          </TabNavigation>
        </Box>
        <Box
          params={{
            display: 'flex',
            alignItems: 'center',
            flex: '0 0 30%',
          }}
        >
          <Button block size="small" variant="primary">
            Cadastrar questionário
          </Button>
        </Box>
      </Box>

      <Row>
        <Col xs={12} md={6} lg={4}>
          <Select placeholder="Selecione o filtro" options={options} />
        </Col>
        <Col xs={12} md={6} lg={4}>
          <Select placeholder="Selecione o filtro" options={options} />
        </Col>
        <Col xs={12} md={6} lg={4}>
          <Select placeholder="Selecione o filtro" options={options} />
        </Col>
      </Row>

      <Row>
        <Col xs>
          <Resume items={resumeItems} />
        </Col>
      </Row>

      <Table isLoading={isLoading} items={questionaries} fields={tableFields} />
    </Box>
  );
};

export default Master;
