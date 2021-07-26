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
import {
  CardBody,
  CardHeader,
  ResultCard,
} from '../MyResults/MyResults.styled';
import { BiHeart, BiFace } from 'react-icons/bi';
import { FiBox } from 'react-icons/fi';
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
} from './TeamResults.styled';
import Woman from '../../../assets/team-resume/woman.png';
import Man from '../../../assets/team-resume/man.png';
import ProgressBar from '@ramonak/react-progress-bar';

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { getDimensionsRequest } from '../../../store/modules/dimensions/actions';

import { useTheme } from 'styled-components';
import { rgba } from 'polished';
import protectionLevelData from './protectionLevelData';
import Skeleton from 'react-loading-skeleton';

const { Title, Text } = Typography;
const { Brain, Communication } = Icons;

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

const TeamResults: React.FC = () => {
  const theme = useTheme();
  const { dimensions, isLoading } = useSelector(
    (state: RootState) => state.dimensions
  );

  const dispatch = useDispatch();
  const resultsIcons = {
    neuroticidade: <Brain color={theme.colors.blue} />,
    Ansiedade: <Brain color={theme.colors.blue} />,
    Amabilidade: <BiHeart color={theme.colors.blue} />,
    abertura: <FiBox color={theme.colors.blue} />,
    contato: <Communication color={theme.colors.blue} />,
  };
  useEffect(() => {
    dispatch(getDimensionsRequest());
  }, [dispatch]);
  return (
    <Box params={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <PromotionalCard />
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
      <Row>
        <StyledCol xs={12} lg={7}>
          <Card>
            <Title level={4} variant="primary">
              Análise dos especialistas
            </Title>
            <Text paragraph>
              Observamos níveis de proteção contra sintomas depressivos e de uso
              de substâncias que podem ser melhorados. A equipe de maneira
              global se destaca pela presença de pessoas mais meticulosas, que
              se expressam de maneira mais objetiva. Devemos, no entanto focar
              em estratégias para otimizar o trabalho em equipe, mobilizando
              características como a tolerância a ideias diferentes e
              fortalecimento de caracteristicas e talentos individuais para
              compor o todo.
            </Text>
            <Text paragraph>
              Perfil global de pessoas mais extrovertidas, eficientes e
              organizadas, que tendem a enfrentar a rotina de modo prático,
              podendo haver tendência a um maior foco a si mesmas do que aos
              outros. Também há uma discreta tendência a uma maior reatividade
              ao estresse.
            </Text>
          </Card>
        </StyledCol>
        <StyledCol xs>
          <Box
            params={{ display: 'flex', flexDirection: 'column', gap: '15px' }}
          >
            <Card>
              <Row>
                <Col xs={12} xl={10}>
                  <Title color={theme.colors.p3} variant="primary" level={4}>
                    Proteção adequada contra
                  </Title>
                  <ul>
                    <li>Sintomas ansiosos</li>
                    <li>Sintomas de Burnout</li>
                    <li>Estresse</li>
                  </ul>
                </Col>
                <CardImage side="right">
                  <Image src={Man} alt="Lorem Ipsum" />
                </CardImage>
              </Row>
            </Card>

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
                    <li>Sintomas ansiosos</li>
                    <li>Sintomas de Burnout</li>
                  </ul>
                </Col>
              </Row>
            </Card>
          </Box>
        </StyledCol>
      </Row>
      <Row>
        <StyledCol xs={12} lg={7}>
          <Card>
            <Title level={4} color={theme.colors.p2}>
              Oportunidades de melhoria
            </Title>
            <Text>Foco em:</Text>
            <ul>
              <li>
                Foco em: Aumento da proteção contra sintomas depressivos e de
                uso de substâncias;
              </li>
              <li>
                Desenvolvimento de ferramentas para lidar com estresse e
                trabalho em equipe.
              </li>
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
              <li>
                Foco em: Aumento da proteção contra sintomas depressivos e de
                uso de substâncias;
              </li>
              <li>
                Desenvolvimento de ferramentas para lidar com estresse e
                trabalho em equipe.
              </li>
            </ul>
          </Card>
        </StyledCol>
      </Row>

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
          dimensions.map(({ name }) => (
            <ResultCard>
              <CardHeader>
                <Text textDecoration="strong" variant="primary">
                  {resultsIcons[name as keyof typeof resultsIcons]}
                  {name}
                </Text>
                <Text textDecoration="strong" variant="primary">
                  65%
                </Text>
              </CardHeader>
              <CardBody>
                <ResultLine
                  results={{
                    analise:
                      'Observamos níveis de proteção contra ocorrências de sintomas ansiosos, maiores do que a população geral. Os sintomas podem ser reativos a problemas diversos, e não necessariamente se traduzem em transtornos.',
                    total: 65,
                  }}
                  hasAnalysis={false}
                  type={name}
                />
              </CardBody>
            </ResultCard>
          ))
        )}
      </FlexContainer>
      <Box
        params={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
        }}
      >
        <Title level={3}>Niveis de proteção</Title>
      </Box>
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
          dimensions.map((dimension, index) => (
            <Card>
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
                      <Text>Proteção contra sistomas de ansiosos</Text>
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
                  <Text textDecoration="strong">Análise dos especialistas</Text>
                  <Text>
                    Sed in libero commodo enim laoreet auctor. Donec ac
                    ultricies nibh, non gravida nibh. Orci varius natoque
                    penatibus et magnis dis parturient montes, nascetur
                    ridiculus mus. Proin aliquet dolor nec velit egestas
                    pellentesque.
                  </Text>
                </Box>

                <ChartsBarContainer>
                  <LevelsContainer>
                    {protectionLevelData.map((level) => (
                      <ProgressBarContainer>
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
                        <TableChart options={{ cutout: 35 }} data={chartData} />
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
          ))
        )}
      </FlexContainer>
    </Box>
  );
};

export default TeamResults;
