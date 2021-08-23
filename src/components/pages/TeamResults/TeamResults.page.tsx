import React, { useEffect } from 'react';

import {
  Box,
  Card,
  PromotionalCard,
  Typography,
  Image,
  Icons,
  ResultLine,
  ChartWrapper,
  TableChart,
} from '../..';
import { CardHeader, SocialAspectsCard } from '../MyResults/MyResults.styled';
import { BiFace } from 'react-icons/bi';
import { Col, Row } from 'react-flexbox-grid';
import {
  CardCharts,
  CardIcon,
  CardImage,
  CharFlexContainer,
  ChartsBarContainer,
  FlexContainer,
  LevelsContainer,
  ProgressBarContainer,
  StyledCol,
  CardBody,
} from './TeamResults.styled';
import Woman from '../../../assets/team-resume/woman.png';
import Man from '../../../assets/team-resume/man.png';
import ProgressBar from '@ramonak/react-progress-bar';

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { getResultsRequest } from '../../../store/modules/results/actions';

import { useTheme } from 'styled-components';
// import { rgba } from 'polished';
import Skeleton from 'react-loading-skeleton';
import { chartDataPopulation } from './populationChartDatas';
import EmptyResults from '../MyResults/EmptyResults';

const { Title, Text } = Typography;
const { Brain } = Icons;

const TeamResults: React.FC = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { results, isLoading } = useSelector(
    (state: RootState) => state.results
  );

  const getLevelLabel = (label: string) => {
    const labelArray = label.split(' ');
    if (labelArray.length > 1) return labelArray[1];
    return labelArray[0];
  };

  const isEmpty = () =>
    results.statistics.every((statistic) => statistic.team_protection === 0);

  useEffect(() => {
    dispatch(getResultsRequest('gestor'));
  }, [dispatch]);
  return (
    <Box params={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <PromotionalCard
        title="Resultados Ourmind!"
        text="Aqui você encontra o perfil de sintomas que encontramos em sua equipe. Este é o relatório global da sua empresa é confidencial, não sendo possível identificar nenhum dos respondentes. Cada dimensão principal (sintomas de  ansiedade, sintomas depressivos, sintomas de burnout, estresse e risco de uso de substancias) está representada em um gráfico distinto. Veja a descrição dos achados nas legendas."
      />
      <Box
        params={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
        }}
      >
        <Title level={3}>Entendendo a equipe</Title>
      </Box>
      {isEmpty() ? (
        <EmptyResults />
      ) : (
        <>
          <Row>
            {/* <StyledCol xs={12} lg={7}>
          <Card>
            <Title level={4} variant="primary">
              Análise dos especialistas
            </Title>
            <Text paragraph>{results.analysis.expert_analysis}</Text>
          </Card>
        </StyledCol> */}

            <StyledCol xs={12} md={6}>
              <Card>
                <Row>
                  <Col xs={12} xl={10}>
                    <Title color={theme.colors.p3} variant="primary" level={4}>
                      Proteção adequada contra
                    </Title>
                    <ul>
                      {results.analysis.adequate_protection.map(
                        (protection, index) => (
                          <li key={`adequate-protection-${index}`}>
                            {protection}
                          </li>
                        )
                      )}
                    </ul>
                  </Col>
                  <CardImage side="right">
                    <Image src={Man} alt="Lorem Ipsum" />
                  </CardImage>
                </Row>
              </Card>
            </StyledCol>
            <StyledCol xs={12} md={6}>
              <Card>
                <Row>
                  <Col
                    xs
                    style={{
                      position: 'relative',
                      display: 'flex',
                      alignItems: 'flex-end',
                      padding: 0,
                    }}
                  >
                    <CardImage side="left">
                      <Image src={Woman} alt="Lorem Ipsum" />
                    </CardImage>
                  </Col>
                  <Col xs={12} xl={6}>
                    <Title color={theme.colors.p1} variant="primary" level={4}>
                      Proteção menor contra
                    </Title>
                    <ul>
                      {results.analysis.minor_protection.map(
                        (protection, index) => (
                          <li key={`minor-protection-${index}`}>
                            {protection}
                          </li>
                        )
                      )}
                    </ul>
                  </Col>
                </Row>
              </Card>
            </StyledCol>
          </Row>
          <Row>
            {/* <StyledCol xs={12} lg={7}>
          <Card>
            <Title level={4} color={theme.colors.p2}>
              Oportunidades de melhoria
            </Title>
            <Text>Foco em:</Text>
            <ul>
              {results.analysis.improvement_opportunity.map(
                (opportunity, index) => (
                  <li key={`improvement_opportunity-${index}`}>
                    {opportunity}
                  </li>
                )
              )}
            </ul>
          </Card>
        </StyledCol> */}

            {/* <StyledCol xs>
          <Card>
            <Title level={4} variant="primary">
              Como chegar lá?
            </Title>
            <Text>Foco em:</Text>
            <ul>
              {results.analysis.how_to.map((opportunity, index) => (
                <li key={`how-to-${index}`}>{opportunity}</li>
              ))}
            </ul>
          </Card>
        </StyledCol> */}
          </Row>

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
              results.statistics.map((statistics, index) =>
                index <= 4 ? (
                  <Card key={`${statistics}-card-${index}`}>
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
                              {statistics.name}
                            </Text>
                            <Text>{statistics.title}</Text>
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
                        <Text>{statistics.description}</Text>
                      </Box>

                      <ChartsBarContainer>
                        <LevelsContainer>
                          {statistics.niveis?.map((level) => (
                            <ProgressBarContainer
                              key={`protection-leve-${level}-${Math.random()}`}
                            >
                              <Text>{getLevelLabel(level.label)}</Text>
                              <Box
                                params={{ display: 'block', width: '140px' }}
                              >
                                <ProgressBar
                                  height="10px"
                                  completed={level.qtd}
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
                                data={{
                                  datasets: [
                                    {
                                      label: null,
                                      data: [
                                        statistics.team_protection * 100,
                                        statistics.team_protection * 100 - 100,
                                      ],
                                      backgroundColor: ['#4ED9A7', '#F1F5FA'],
                                      borderWidth: 0,
                                    },
                                  ],
                                }}
                              />
                              <Text color="#4ED9A7" textDecoration="strong">
                                {statistics.team_protection * 100}%
                              </Text>
                            </ChartWrapper>
                            <Text>
                              Nível de proteção na <strong>empresa</strong>
                            </Text>
                          </CharFlexContainer>
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

          {/* Níveis de proteção */}

          <Title level={3}>Aspectos biopsicossociais da equipe</Title>

          <FlexContainer>
            {isLoading ? (
              <>
                <Box params={{ display: 'block', flex: 'auto' }}>
                  <Skeleton height={100} />
                </Box>
                <Box params={{ display: 'block', flex: 'auto' }}>
                  <Skeleton height={100} />
                </Box>
              </>
            ) : (
              results.statistics.map((statistic, index) =>
                statistic.team_protection > 0 ? (
                  <SocialAspectsCard key={`social-${index}`}>
                    <CardHeader>
                      <Text textDecoration="strong" variant="primary">
                        <Brain color={theme.colors.blue} />
                        {statistic.name}
                      </Text>
                    </CardHeader>
                    <CardBody>
                      <ResultLine
                        results={{
                          analise: statistic.description,
                          total: +(statistic.team_protection * 100).toFixed(1),
                        }}
                        minText={statistic.minText}
                        maxText={statistic.maxText}
                        hasAnalysis={false}
                        type={statistic.name}
                      />
                    </CardBody>
                  </SocialAspectsCard>
                ) : null
              )
            )}
          </FlexContainer>
        </>
      )}
    </Box>
  );
};

export default TeamResults;
