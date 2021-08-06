import React, { useEffect, useMemo, useState } from 'react';

import { Grid } from 'react-flexbox-grid';
import {
  OptionBox,
  QuestionaryHeader,
  QuestionOptions,
} from './Questionaries.styled';
import {
  Box,
  Button,
  Card,
  ChartWrapper,
  Checkbox,
  TableChart,
  Tag,
  Typography,
} from '../..';
import { OptionMark } from '../Questions/Questions.styled';

import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { DimensionItem, RootState } from '../../../store';
import { useTheme } from 'styled-components';
import { getQuestionsRequest } from '../../../store/modules/questions/actions';
import {
  Priorities,
  QuestionItem,
} from '../../../store/modules/questions/types';

type RouteState = {
  questionary: {
    title: string;
    dimension: DimensionItem;
  };
};

const { Text, Title } = Typography;

enum TagColors {
  P1 = 'error',
  P2 = 'warning',
  P3 = 'success',
}

type CheckedQuestion = {
  id: string;
  priority: Priorities;
};

const CreateQuestionary: React.FC = () => {
  const theme = useTheme();
  const {
    state: { questionary },
  } = useLocation<RouteState>();
  const initialChartDatas = useMemo(
    () => [
      {
        text: 'Obrigatórias (P1)',
        priority: 'P1',
        datasets: [
          {
            label: null,
            data: [0, questionary.dimension.mandatory],
            backgroundColor: [theme.colors.p1, '#F1F5FA'],
            borderWidth: 0,
          },
        ],
      },
      {
        text: 'Complementares (P2)',
        priority: 'P2',
        datasets: [
          {
            label: null,
            data: [0, questionary.dimension.complementary],
            backgroundColor: [theme.colors.p2, '#F1F5FA'],
            borderWidth: 0,
          },
        ],
      },
      {
        text: 'Opcionais (P3)',
        priority: 'P3',
        datasets: [
          {
            label: null,
            data: [0, questionary.dimension.optional],
            backgroundColor: [theme.colors.p3, '#F1F5FA'],
            borderWidth: 0,
          },
        ],
      },
      {
        text: 'Livre',
        priority: 'livre',
        datasets: [
          {
            label: null,
            data: [0, questionary.dimension.qt_maximum],
            backgroundColor: [theme.colors.blue, '#F1F5FA'],
            borderWidth: 0,
          },
        ],
      },
    ],
    [questionary, theme]
  );
  const dispatch = useDispatch();
  const { questions } = useSelector(({ questions }: RootState) => questions);
  const [checkedQuestions, setCheckedQuestions] = useState<CheckedQuestion[]>(
    []
  );
  const [questionaryQuestions, setQuestionaryQuestions] = useState<
    QuestionItem[]
  >([]);
  const [chartDatas, setChartDatas] = useState(initialChartDatas);

  const handleCheckboxClick = (question: CheckedQuestion) => {
    if (checkedQuestions.some((q) => q.id === question.id)) {
      setCheckedQuestions(checkedQuestions.filter((q) => q.id !== question.id));
    } else {
      setCheckedQuestions([...checkedQuestions, question]);
    }
  };

  const questionsSelectedsText = () => {
    const questions = checkedQuestions.filter(
      (question) => (question.priority = 'P1')
    ).length;
    const mandatories = questionary.dimension.mandatory;
    if (questions === 0) {
      return 'Você ainda não selecionou nenhuma pergunta';
    } else if (questions < mandatories) {
      return `Você já selecionou ${questions} perguntas. Ainda faltam ${
        mandatories - questions
      } perguntas obrigatórias (P1)`;
    } else {
      return 'Você já selecionou todas as perguntas obrigatórias';
    }
  };

  useEffect(() => {
    dispatch(getQuestionsRequest());
  }, [dispatch]);

  useEffect(() => {
    const filteredQuestions = questions.filter(
      (question) => question.dimension._id === questionary.dimension._id
    );
    setQuestionaryQuestions(filteredQuestions);
  }, [questions, questionary]);

  useEffect(() => {
    const chardPriorities = {
      P1: checkedQuestions.filter(({ priority }) => priority === 'P1').length,
      P2: checkedQuestions.filter(({ priority }) => priority === 'P2').length,
      P3: checkedQuestions.filter(({ priority }) => priority === 'P3').length,
    };
    const newChartDatas = initialChartDatas.map((data) => ({
      ...data,
      datasets: data.datasets.map((dataset) => ({
        ...dataset,
        data: [
          chardPriorities[data.priority as keyof typeof chardPriorities] || 0,
          dataset.data[1],
        ],
      })),
    }));
    setChartDatas(newChartDatas);
  }, [checkedQuestions, initialChartDatas]);

  return (
    <Box
      params={{
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        paddingBottom: '45px',
      }}
    >
      <Box params={{ backgroundColor: '#ffffff' }}>
        <Grid>
          <QuestionaryHeader>
            <Box
              params={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <Tag color="primary" size="large">
                {questionary.dimension.name}
              </Tag>
              <Text textDecoration="strong" variant="primary">
                {questionary.title}
              </Text>
              <Text>
                {questionary.dimension.qt_minimum} a{' '}
                {questionary.dimension.qt_maximum} perguntas
              </Text>
            </Box>

            <Box
              params={{
                display: 'flex',
                justifyContent: 'space-between',
                flex: '0 0 50%',
              }}
            >
              {chartDatas.map((data) => (
                <Box
                  params={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                  }}
                >
                  <ChartWrapper size={100}>
                    <TableChart options={{ cutout: 35 }} data={data} />
                    <Text
                      color={data.datasets[0].backgroundColor[0]}
                      textDecoration="strong"
                    >
                      {data.datasets[0].data.join('/')}
                    </Text>
                  </ChartWrapper>
                  <Text>{data.text}</Text>
                </Box>
              ))}
            </Box>

            <Box
              params={{ display: 'flex', flexDirection: 'column', gap: '5px' }}
            >
              <Button disabled size="small" variant="primary">
                Próximo
              </Button>
              <Button size="small" variant="secondary">
                Salvar rascunho e sair
              </Button>
            </Box>
          </QuestionaryHeader>
        </Grid>
      </Box>

      <Grid>
        <Box params={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
          <Card size="small" hasCloseButton={false} background="#E5EEF7">
            <Box params={{ textAlign: 'center' }}>
              <Title variant="primary" level={3}>
                {questionsSelectedsText()}
              </Title>
            </Box>
          </Card>

          <Title level={3}>
            1- Selecione {questionary.dimension.mandatory} perguntas
            obrigatórias
          </Title>

          {questionaryQuestions.map((question) => (
            <Card>
              <Box
                params={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '25px',
                }}
              >
                <Box
                  params={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '25px',
                  }}
                >
                  <Checkbox
                    value={question._id}
                    onChange={() =>
                      handleCheckboxClick({
                        id: question._id,
                        priority: question.priority,
                      })
                    }
                    checked={
                      !!checkedQuestions.find(({ id }) => id === question._id)
                    }
                  />
                  <Tag
                    size="large"
                    color={
                      TagColors[question.priority as keyof typeof TagColors]
                    }
                  >
                    {question.priority}
                  </Tag>
                  <Text>
                    Tipo:{' '}
                    <Tag size="large" color="default">
                      {question.type}
                    </Tag>
                  </Text>
                  <Text>Peso: {question.weight}</Text>
                </Box>

                <Text textDecoration="strong">{question.title}</Text>
                <QuestionOptions>
                  {question.options.map((option) => (
                    <OptionBox>
                      <OptionMark />
                      <Text>{option.label}</Text>
                    </OptionBox>
                  ))}
                </QuestionOptions>
              </Box>
            </Card>
          ))}
        </Box>
      </Grid>
    </Box>
  );
};

export default CreateQuestionary;
