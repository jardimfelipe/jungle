//@ts-nocheck
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

import { useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { useTheme } from 'styled-components';
import { Priorities } from '../../../store/modules/questions/types';
import Skeleton from 'react-loading-skeleton';
import { getQuestionaryRequest } from '../../../store/modules/questionaries/actions';

const { Text, Title } = Typography;

enum TagColors {
  p1 = 'error',
  p2 = 'warning',
  p3 = 'success',
}

type CheckedQuestion = {
  id: string;
  priority: Priorities;
};

const EditQuestionary: React.FC = () => {
  const theme = useTheme();
  const history = useHistory();
  const { id } = useParams<{ id: string }>();
  const { questionary, isLoading } = useSelector(
    ({ questionaries }: RootState) => questionaries
  );
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

  const [checkedQuestions, setCheckedQuestions] = useState<CheckedQuestion[]>(
    []
  );

  const [chartDatas, setChartDatas] = useState(initialChartDatas);

  const handleCheckboxClick = (question: CheckedQuestion) => {
    if (checkedQuestions.some((q) => q.id === question.id)) {
      setCheckedQuestions(checkedQuestions.filter((q) => q.id !== question.id));
    } else {
      setCheckedQuestions([...checkedQuestions, question]);
    }
  };

  const handleCancelButton = () => {
    history.push('/questionaries');
  };

  const isAllMandatoryChoosed = () => {
    const questions = checkedQuestions.filter(
      (question) => (question.priority = 'P1')
    ).length;
    const mandatories = questionary.dimension.mandatory;
    return questions >= mandatories;
  };

  const handleSubmit = () => {
    // const model = {
    //   title: questionary.title,
    //   description: questionary.title,
    //   active: true,
    //   required: true,
    //   dimension: questionary.dimension._id,
    //   question: checkedQuestions.map(({ id }) => id),
    // };
    // dispatch(createQuestionaryRequest(model));
  };
  useEffect(() => {
    dispatch(getQuestionaryRequest(id));
  }, [dispatch, id]);

  useEffect(() => {
    const checkedQuestions = questionary.question.map((question) => ({
      id: question._id,
      priority: question.priority,
    }));
    setCheckedQuestions(checkedQuestions);
  }, [questionary]);

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
          chardPriorities[data.priority as keyof typeof chardPriorities] * 10 ||
            0,
          100 -
            chardPriorities[data.priority as keyof typeof chardPriorities] *
              10 || 0,
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
          <Box params={{ marginTop: '10px' }}>
            <Card size="small" hasCloseButton background="#E5EEF7">
              <Box params={{ textAlign: 'center' }}>
                <Title textDecoration="strong" variant="primary" level={3}>
                  Você está na área de edição
                </Title>
              </Box>
            </Card>
          </Box>
          <QuestionaryHeader>
            <Box
              params={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <Box params={{ display: 'block' }}>
                <Tag color="primary" size="large">
                  {questionary.dimension.name}
                </Tag>
              </Box>
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
              {chartDatas.map((data, index) => (
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
                      {`${+data.datasets[0].data[0] / 10}/${
                        initialChartDatas[index].datasets[0].data[1]
                      }`}
                    </Text>
                  </ChartWrapper>
                  <Text>{data.text}</Text>
                </Box>
              ))}
            </Box>

            <Box
              params={{
                display: 'flex',
                flexDirection: 'column',
                gap: '5px',
                flex: '0 0 20%',
                justifyContent: 'center',
              }}
            >
              <Button
                disabled={!isAllMandatoryChoosed()}
                onClick={handleSubmit}
                size="small"
                variant="primary"
              >
                Salvar edição
              </Button>
              <Button
                onClick={handleCancelButton}
                size="small"
                variant="cancel"
              >
                Cancelar
              </Button>
            </Box>
          </QuestionaryHeader>
        </Grid>
      </Box>

      <Grid>
        <Box params={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
          {isLoading
            ? [...Array(4)].map((_, index) => (
                <Box
                  key={`skeleton-questions-${index}`}
                  params={{ display: 'block', width: '100%' }}
                >
                  <Skeleton height={250} />
                </Box>
              ))
            : questionary.question.map((question) => (
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
                          !!checkedQuestions.find(
                            ({ id }) => id === question._id
                          )
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

export default EditQuestionary;
