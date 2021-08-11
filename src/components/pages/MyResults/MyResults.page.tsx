import React, { useEffect } from 'react';

import {
  Box,
  PromotionalCard,
  Typography,
  ResultLine,
  Card,
  ChartWrapper,
  TableChart,
} from '../..';
import { SocialAspectsCard, CardHeader, CardBody } from './MyResults.styled';
import { Col, Row } from 'react-flexbox-grid';
import { Icons } from '../../';
import Skeleton from 'react-loading-skeleton';
import ResultsCards from './Cards/ResultsCards';
import {
  CardCharts,
  CardIcon,
  CharFlexContainer,
  ChartsBarContainer,
  FlexContainer,
  LevelsContainer,
  ProgressBarContainer,
} from '../TeamResults/TeamResults.styled';
import { BiFace } from 'react-icons/bi';
import ProgressBar from '@ramonak/react-progress-bar';

import { useTheme } from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { getDimensionsRequest } from '../../../store/modules/dimensions/actions';
import { getResultsRequest } from '../../../store/modules/results/actions';
import protectionLevelData from '../TeamResults/protectionLevelData';
import { rgba } from 'polished';

const { Brain } = Icons;

const { Title, Text } = Typography;

const chartData = {
  datasets: [
    {
      label: null,
      data: [70, 30],
      backgroundColor: ['#4ED9A7', '#F1F5FA'],
      borderWidth: 0,
    },
  ],
};

const chartData2 = {
  datasets: [
    {
      label: null,
      data: [80, 20],
      backgroundColor: ['#0062FF', '#F1F5FA'],
      borderWidth: 0,
    },
  ],
};

const MyResults: React.FC = () => {
  const { dimensions } = useSelector((state: RootState) => state.dimensions);
  const { results, isLoading } = useSelector(
    (state: RootState) => state.results
  );
  const dispatch = useDispatch();
  const theme = useTheme();

  const getDimensionById = (dimensionId: string) => {
    return dimensions.find(({ _id }) => _id === dimensionId);
  };

  useEffect(() => {
    dispatch(getDimensionsRequest());
    dispatch(getResultsRequest());
  }, [dispatch]);
  return (
    <Box params={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <PromotionalCard />

      <Title level={3}>Meus Resultados</Title>
      <ResultsCards analysis={results.analysis} />

      {/* Níveis de proteção */}
      <Title level={3}>Niveis de proteção</Title>
      <FlexContainer>
        {isLoading ? (
          <>
            <Box params={{ display: 'block', flex: 'auto' }}>
              <Skeleton height={250} />
            </Box>
            <Box params={{ display: 'block', flex: 'auto' }}>
              <Skeleton height={250} />
            </Box>
          </>
        ) : (
          dimensions.map((dimension, index) =>
            index <= 4 ? (
              <Card key={`${dimension}-card-${index}`}>
                <Box
                  params={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '20px',
                  }}
                >
                  <Box
                    params={{
                      display: 'flex',
                      flexDirection: 'column',
                    }}
                  >
                    <Box
                      params={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '15px',
                      }}
                    >
                      <CardIcon>
                        <BiFace color={theme.colors.darkGray} size="28" />
                      </CardIcon>
                      <Box
                        params={{
                          display: 'flex',
                          flexDirection: 'column',
                        }}
                      >
                        <Text textDecoration="strong" variant="primary">
                          {dimension.name}
                        </Text>
                        <Text>{results.statistics[index].title}</Text>
                      </Box>
                    </Box>
                  </Box>

                  <Box
                    params={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '5px',
                    }}
                  >
                    <Text textDecoration="strong">
                      Análise dos especialistas
                    </Text>
                    <Text>{results.statistics[index].description}</Text>
                  </Box>

                  <ChartsBarContainer>
                    <LevelsContainer>
                      {protectionLevelData.map((level) => (
                        <ProgressBarContainer
                          key={`protection-leve-${level}-${Math.random()}`}
                        >
                          <Text color={level.color}>{level.level}</Text>
                          <Box params={{ display: 'block', width: '140px' }}>
                            <ProgressBar
                              bgColor={level.color}
                              height="10px"
                              completed={level.amount}
                              baseBgColor={rgba(level.color, 0.1)}
                              isLabelVisible={false}
                            />
                          </Box>
                        </ProgressBarContainer>
                      ))}
                    </LevelsContainer>

                    <CardCharts>
                      <CharFlexContainer>
                        <ChartWrapper size={100}>
                          <TableChart
                            options={{ cutout: 35 }}
                            data={chartData}
                          />
                          <Text color="#4ED9A7" textDecoration="strong">
                            65%
                          </Text>
                        </ChartWrapper>
                        <Text>
                          Nível de proteção na <strong>equipe</strong>
                        </Text>
                      </CharFlexContainer>
                      <CharFlexContainer>
                        <ChartWrapper size={100}>
                          <TableChart
                            options={{ cutout: 35 }}
                            data={chartData2}
                          />
                          <Text color="#0062FF" textDecoration="strong">
                            80%
                          </Text>
                        </ChartWrapper>
                        <Text>
                          Nível de proteção na <strong>população</strong>
                        </Text>
                      </CharFlexContainer>
                    </CardCharts>
                  </ChartsBarContainer>
                </Box>
              </Card>
            ) : null
          )
        )}
      </FlexContainer>

      <Title level={3}>Aspectos biopsicossociais</Title>
      <Row>
        <Col xs>
          <Box
            params={{ display: 'flex', flexDirection: 'column', gap: '15px' }}
          >
            {isLoading
              ? [...Array(5)].map((_, index) => (
                  <Box
                    key={`results-grid-skeleton${index}`}
                    params={{ display: 'block' }}
                  >
                    <Skeleton height={200} />
                  </Box>
                ))
              : results.statistics.map(
                  ({ dimension, result, value, description }) => (
                    <SocialAspectsCard key={`dimension-${dimension}`}>
                      <CardHeader>
                        <Text textDecoration="strong" variant="primary">
                          <Brain color={theme.colors.blue} />
                          {getDimensionById(dimension)?.name}
                        </Text>
                        <Text textDecoration="strong" variant="primary">
                          {value}%
                        </Text>
                      </CardHeader>
                      <CardBody>
                        <ResultLine
                          results={{
                            analise: description,
                            total: value,
                          }}
                          hasAnalysis
                          type={getDimensionById(dimension)?.name || ''}
                        />
                      </CardBody>
                    </SocialAspectsCard>
                  )
                )}
          </Box>
        </Col>
      </Row>
    </Box>
  );
};

export default MyResults;
