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
// import ResultsCards from './Cards/ResultsCards';
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
import { getResultsRequest } from '../../../store/modules/results/actions';
import {
  chartDataPopulation,
  protectionLevelData,
} from '../TeamResults/populationChartDatas';
import { rgba } from 'polished';
import EmptyResults from './EmptyResults';

const { Brain } = Icons;

const { Title, Text } = Typography;

const MyResults: React.FC = () => {
  const { results, isLoading } = useSelector(
    (state: RootState) => state.results
  );
  const dispatch = useDispatch();
  const theme = useTheme();

  const isEmpty = () =>
    results.statistics.every((statistic) => statistic.value === 0);

  const getProtectionLevelItems = () => {
    return results.statistics.filter((i, index) => index < 5);
  };

  useEffect(() => {
    dispatch(getResultsRequest());
  }, [dispatch]);
  return (
    <Box params={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <PromotionalCard />

      <Title level={3}>Meus Resultados</Title>
      {isEmpty() ? (
        <EmptyResults />
      ) : (
        <>
          <EmptyResults />

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
            ) : getProtectionLevelItems().every((r) => r.value === 0) ? (
              <EmptyResults />
            ) : (
              getProtectionLevelItems().map((result, index) =>
                index <= 4 && result.value > 0 ? (
                  <Card key={`${result._id}-card-${index}`}>
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
                              {result.name}
                            </Text>
                            <Text>{result.title}</Text>
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
                              <Box
                                params={{ display: 'block', width: '140px' }}
                              >
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

                        <CardCharts align="center">
                          <CharFlexContainer>
                            <ChartWrapper size={100}>
                              <TableChart
                                options={{ cutout: 35 }}
                                data={chartDataPopulation[index]}
                              />
                              <Text color="#0062FF" textDecoration="strong">
                                {chartDataPopulation[index].datasets[0].data[0]}
                                %
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
                params={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '15px',
                }}
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
                      ({
                        dimension,
                        value,
                        description,
                        name,
                        minText,
                        maxText,
                      }) =>
                        value > 0 ? (
                          <SocialAspectsCard key={`dimension-${dimension}`}>
                            <CardHeader>
                              <Text textDecoration="strong" variant="primary">
                                <Brain color={theme.colors.blue} />
                                {name}
                              </Text>
                            </CardHeader>
                            <CardBody>
                              <ResultLine
                                results={{
                                  analise: description,
                                  total: value * 100,
                                }}
                                minText={minText}
                                maxText={maxText}
                                hasAnalysis
                                type={name}
                              />
                            </CardBody>
                          </SocialAspectsCard>
                        ) : null
                    )}
              </Box>
            </Col>
          </Row>
        </>
      )}
    </Box>
  );
};

export default MyResults;
