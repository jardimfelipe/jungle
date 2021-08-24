import React, { useEffect } from 'react';

import {
  Box,
  NavigationButton,
  PromotionalCard,
  ResumeCard,
  Typography,
  Table,
  // Image,
} from '../../..';
import { BsArrowRight } from 'react-icons/bs';
import { ResumeBox } from '../Dashboard.styled';

import { useHistory } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../../../store';
import { getQuestionariesRequest } from '../../../../store/modules/questionaries/actions';
// import { Col, Row } from 'react-flexbox-grid';
// import { useTheme } from 'styled-components';

// import GestorResults from '../../../../assets/gestor-results.png';
// import GestorNegative from '../../../../assets/gestor-negative.png';
import { Questionary } from '../../../../store/modules/questionaries/types';
import { setSnackbarOpen } from '../../../../store/modules/base/actions';
import { BiDockLeft } from 'react-icons/bi';
import { getResultsRequest } from '../../../../store/modules/results/actions';

const { Title, Text } = Typography;

const tableFields = [
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
    title: 'Rastreio',
    dataIndex: '_id',
    key: '_id',
    render: () => <Text>16/06 a 20/07</Text>,
  },
];

const Gestor: React.FC = () => {
  const history = useHistory();
  // const theme = useTheme();
  const dispatch = useDispatch();
  const {
    questionaries,
    feedback,
    isLoading: isQuestionaryLoading,
  } = useSelector(({ questionaries }: RootState) => questionaries);
  const { currentUser } = useSelector((state: RootState) => state.login);
  // const { results } = useSelector((state: RootState) => state.results);

  useEffect(() => {
    dispatch(
      getQuestionariesRequest({ headers: { company: currentUser.company } })
    );
    dispatch(getResultsRequest('gestor'));
  }, [dispatch, currentUser]);

  useEffect(() => {
    feedback.status === 'error' && dispatch(setSnackbarOpen(feedback.message));
  }, [feedback, dispatch]);
  return (
    <Box params={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <PromotionalCard
        title={`Seja bem-vindo ${currentUser.name}`}
        text="Todos nossos questionários foram criados com base científica.
        Veja os resultados que obtivemos da sua equipe."
      />

      <Box params={{ display: 'flex', justifyContent: 'space-between' }}>
        <Title level={3}>Resultados do time</Title>
        <NavigationButton onClick={() => history.push('/team-results')}>
          <Text>Ver todos </Text> <BsArrowRight />
        </NavigationButton>
      </Box>

      {/* <Box
        params={{
          display: 'flex',
          justifyContent: 'space-between',
          width: '100%',
          gap: '15px',
          flexWrap: 'wrap',
        }}
      >
        <GestorCard>
          <Row>
            <Col xs={12} md={8}>
              <Box
                params={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '20px',
                  padding: '0 20px',
                }}
              >
                <Text textDecoration="strong" color={theme.colors.p3}>
                  Proteção adequada contra
                </Text>
                <ul>
                  {results.analysis.adequate_protection.map(
                    (protection, index) => (
                      <li key={`adequate-protection-${index}`}>{protection}</li>
                    )
                  )}
                </ul>
              </Box>
            </Col>
            <Col xs>
              <Image src={GestorResults} />
            </Col>
          </Row>
        </GestorCard>
        <GestorCard>
          <Row>
            <Col xs={12} md={8}>
              <Box
                params={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '20px',
                  padding: '0 20px',
                }}
              >
                <Text textDecoration="strong" color={theme.colors.p1}>
                  Proteção menor contra
                </Text>
                <ul>
                  {results.analysis.minor_protection.map(
                    (protection, index) => (
                      <li key={`minor-protection-${index}`}>{protection}</li>
                    )
                  )}
                </ul>
              </Box>
            </Col>
            <Col xs>
              <Image src={GestorNegative} />
            </Col>
          </Row>
        </GestorCard>
      </Box> */}

      <ResumeBox>
        <ResumeCard
          name="Questionários preenchidos"
          icon={<BiDockLeft color="#ffffff" />}
          total="0"
        />
        <ResumeCard
          name="Questionários disponíveis"
          icon={<BiDockLeft color="#ffffff" />}
          total={questionaries.length}
        />
      </ResumeBox>

      <Box params={{ display: 'flex', justifyContent: 'space-between' }}>
        <Title level={3}>Últimos questionários</Title>
        <NavigationButton onClick={() => history.push('/questionaries')}>
          <Text>Ver todos </Text> <BsArrowRight />
        </NavigationButton>
      </Box>

      <Table
        isLoading={isQuestionaryLoading}
        items={questionaries}
        fields={tableFields}
      />
    </Box>
  );
};

export default Gestor;
