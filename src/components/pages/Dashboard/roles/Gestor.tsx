import React, { useEffect } from 'react';

import {
  Box,
  NavigationButton,
  PromotionalCard,
  ResumeCard,
  Typography,
  Icons,
  Table,
  Image,
} from '../../..';
import { BsArrowRight } from 'react-icons/bs';
import { ResumeBox, GestorCard } from '../Dashboard.styled';
import Skeleton from 'react-loading-skeleton';

import { useHistory } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../../../store';
import { getQuestionariesRequest } from '../../../../store/modules/questionaries/actions';
import { Col, Row } from 'react-flexbox-grid';
import { useTheme } from 'styled-components';

import GestorResults from '../../../../assets/gestor-results.png';
import GestorNegative from '../../../../assets/gestor-negative.png';
import { Questionary } from '../../../../store/modules/questionaries/types';
import { setSnackbarOpen } from '../../../../store/modules/base/actions';
import { getDimensionsRequest } from '../../../../store/modules/dimensions/actions';

const { Title, Text } = Typography;
const { Brain } = Icons;

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
    render: (value: Questionary['dimension']) => <Text>{value.name}</Text>,
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
  const theme = useTheme();
  const dispatch = useDispatch();
  const {
    questionaries,
    error,
    isLoading: isQuestionaryLoading,
  } = useSelector(({ questionaries }: RootState) => questionaries);
  const { dimensions, isLoading: isResumeLoading } = useSelector(
    (state: RootState) => state.dimensions
  );
  const handleResultClick = () => {
    history.push('/my-results');
  };

  useEffect(() => {
    dispatch(getQuestionariesRequest());
    dispatch(getDimensionsRequest());
  }, [dispatch]);

  useEffect(() => {
    error.status && dispatch(setSnackbarOpen(error.message));
  }, [error, dispatch]);
  return (
    <Box params={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <PromotionalCard />

      <Box params={{ display: 'flex', justifyContent: 'space-between' }}>
        <Title level={3}>Resultados do time</Title>
        <NavigationButton onClick={() => history.push('/team-results')}>
          <Text>Ver todos </Text> <BsArrowRight />
        </NavigationButton>
      </Box>

      <Box
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
                  <li>Sintomas ansiosos</li>
                  <li>Sintomas de burnout</li>
                  <li>Estresse</li>
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
                  <li>Sintomas depressivos</li>
                  <li>Risco de uso de substâncias</li>
                </ul>
              </Box>
            </Col>
            <Col xs>
              <Image src={GestorNegative} />
            </Col>
          </Row>
        </GestorCard>
      </Box>

      <ResumeBox>
        {dimensions.map((dimension, index) =>
          isResumeLoading ? (
            <Box
              key={`skeleton-results-${index}`}
              params={{ display: 'block' }}
            >
              <Skeleton height={150} />
            </Box>
          ) : (
            <ResumeCard
              key={`results-${index}`}
              name={dimension.name}
              icon={<Brain color="#ffffff" />}
              total={80}
              onClick={handleResultClick}
            />
          )
        )}
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
