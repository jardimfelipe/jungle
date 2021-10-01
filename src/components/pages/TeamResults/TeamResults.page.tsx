import React, { useEffect } from 'react';

import {
  Box,
  Card,
  PromotionalCard,
  Typography,
  Icons,
  ResultLine,
  ChartWrapper,
  TableChart,
} from '../..';
import { CardHeader, SocialAspectsCard } from '../MyResults/MyResults.styled';
import { BiFace } from 'react-icons/bi';
import {
  CardCharts,
  CardIcon,
  CharFlexContainer,
  ChartsBarContainer,
  FlexContainer,
  LevelsContainer,
  ProgressBarContainer,
  CardBody,
} from './TeamResults.styled';
import ProgressBar from '@ramonak/react-progress-bar';

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { getResultsRequest } from '../../../store/modules/results/actions';

import { useTheme } from 'styled-components';
// import { rgba } from 'polished';
import Skeleton from 'react-loading-skeleton';
import { chartDataPopulation } from './populationChartDatas';
import EmptyResults from '../MyResults/EmptyResults';
import { useTranslation } from 'react-i18next';
import { rgba } from 'polished';
import { Nivel, Statistics } from '../../../store/modules/results/types';

const { Title, Text } = Typography;
const { Brain } = Icons;

const TeamResults: React.FC = () => {
  const theme = useTheme();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { results, isLoading } = useSelector(
    (state: RootState) => state.results
  );

  const protectionLevelData = [
    {
      level: t('indexes.hight'),
      color: '#F548E4',
    },
    {
      level: t('indexes.good'),
      color: '#4ED9A7',
    },
    {
      level: t('indexes.moderate'),
      color: '#0CC3E7',
    },
    {
      level: t('indexes.thin'),
      color: '#FFAE33',
    },
  ];

  const getLevelLabel = (label: string) => {
    const labelArray = label.split(' ');
    if (labelArray.length > 1) return labelArray[1];
    return labelArray[0];
  };

  const getProtectionLevelItems = () => {
    return results.statistics.filter((i, index) => index < 5);
  };

  const getBarColor = (result: Statistics, level: any) => {
    if (!result.result) return rgba('#011F3B', 0.1);
    return result.result === level.label
      ? protectionLevelData.find(
          (data) => data.level === level.label.split(' ')[1]
        )?.color || rgba('#011F3B', 0.5)
      : rgba('#011F3B', 0.5);
  };

  const getProgressBarCompleted = (nivel: Nivel, index: number) => {
    const totalUsers = results.statistics[index].niveis.reduce(
      (acc, curr) => acc + curr.qtd,
      0
    );
    const completed = (nivel.qtd * 100) / totalUsers;
    return completed;
  };

  const isEmpty = () =>
    results.statistics.every((statistic) => statistic.team_protection === null);

  useEffect(() => {
    !results.statistics.length && dispatch(getResultsRequest('gestor'));
  }, [dispatch, results]);

  return (
    <Box params={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <PromotionalCard
        title={t('greetings.teamResults.title')}
        text={t('greetings.teamResults.text')}
      />
      <Box
        params={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
        }}
      >
        {/* <Title level={3}>{t('pages.title.understandingTeam')}</Title> */}
      </Box>
      {isEmpty() && !isLoading ? (
        <EmptyResults />
      ) : (
        <>
          {/* <StyledCol xs={12} lg={7}>
              <Card>
                <Title level={4} variant="primary">
                  Análise dos especialistas
                </Title>
                <Text paragraph>{results.analysis.expert_analysis}</Text>
              </Card>
            </StyledCol> */}

          {/* <StyledCol xs={12} md={6}>
              <Card>
                <Row>
                  <Col xs={12} xl={10}>
                    <Title color={theme.colors.p3} variant="primary" level={4}>
                      {t('adequateProtection')}
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
            </StyledCol> */}
          {/* <Row>
            <StyledCol xs={12} lg={7}>
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
            </StyledCol>

            <StyledCol xs>
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
            </StyledCol>
          </Row> */}

          {/* Níveis de proteção */}
          <Title level={3}>{t('pages.title.protecionLevels')}</Title>
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
            ) : getProtectionLevelItems().every(
                (r) => r.team_protection === 0
              ) ? (
              <EmptyResults />
            ) : (
              getProtectionLevelItems().map((statistics, index) =>
                index <= 4 && !!statistics.team_protection ? (
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
                          {t('pages.title.specialistAnalysis')}
                        </Text>
                        <Text>{statistics.description}</Text>
                      </Box>

                      <ChartsBarContainer>
                        <LevelsContainer>
                          {statistics.niveis?.map((nivel) => (
                            <ProgressBarContainer
                              key={`protection-leve-${nivel}-${Math.random()}`}
                            >
                              <Text>{getLevelLabel(nivel.label)}</Text>
                              <Box
                                params={{
                                  display: 'flex',
                                  alignItems: 'center',
                                  gap: '10px',
                                }}
                              >
                                <Box
                                  params={{ display: 'block', width: '140px' }}
                                >
                                  <ProgressBar
                                    bgColor={getBarColor(statistics, nivel)}
                                    height="10px"
                                    completed={getProgressBarCompleted(
                                      nivel,
                                      index
                                    )}
                                    baseBgColor={rgba(
                                      getBarColor(statistics, nivel),
                                      0.1
                                    )}
                                    isLabelVisible={false}
                                  />
                                </Box>
                                <Text>{nivel.qtd}</Text>
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
                                        100 - statistics.team_protection * 100,
                                        100 -
                                          statistics.team_protection * 100 -
                                          100,
                                      ],
                                      backgroundColor: ['#4ED9A7', '#F1F5FA'],
                                      borderWidth: 0,
                                    },
                                  ],
                                }}
                              />
                              <Text color="#4ED9A7" textDecoration="strong">
                                {(
                                  100 -
                                  statistics.team_protection * 100
                                ).toFixed(0)}
                                %
                              </Text>
                            </ChartWrapper>
                            <Text>{t('companyProtectionLevel')}</Text>
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
                            <Text>{t('populationProtectionLevel')}</Text>
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

          <Title level={3}>{t('pages.title.biopsychosocialAspects')}</Title>
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
                !!statistic.team_protection && index >= 5 ? (
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
                        hasAnalysis
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
