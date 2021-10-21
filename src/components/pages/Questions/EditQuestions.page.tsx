import React, { useEffect, useState } from 'react';

import { Grid } from 'react-flexbox-grid';
import Skeleton from 'react-loading-skeleton';
import {
  Box,
  Button,
  Card,
  ColumnButton,
  ConfirmationModal,
  RadioButton,
  TableMenu,
  Tag,
  Typography,
} from '../..';
import {
  OptionBox,
  QuestionOptions,
} from '../Questionaries/Questionaries.styled';
import { IconBox, OptionMark, RadioContainer } from './Questions.styled';

import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useParams } from 'react-router-dom';
import { RootState } from '../../../store';
import {
  deleteQuestionRequest,
  getQuestionsRequest,
} from '../../../store/modules/questions/actions';
import {
  Priorities,
  QuestionItem,
} from '../../../store/modules/questions/types';
import { BiMessageSquareDetail } from 'react-icons/bi';
import { useTheme } from 'styled-components';
import CreateQuestion from './Modals/CreateQuestion.page';
import { BsThreeDotsVertical } from 'react-icons/bs';

const { Text, Title } = Typography;
enum TagColors {
  p1 = 'error',
  p2 = 'warning',
  p3 = 'success',
}

type RouteState = {
  dimensionName: string;
};

const EditQuestion: React.FC = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const { id } = useParams<{ id: string }>();
  const {
    state: { dimensionName },
  } = useLocation<RouteState>();
  const { questions, isLoading } = useSelector(
    ({ questions }: RootState) => questions
  );
  const [filteredQuestions, setFilteredQuestions] = useState<QuestionItem[]>(
    []
  );
  const [currentPriority, setCurrentPriority] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const [currentOpenMenu, setCurrentOpenMenu] = useState(-1);
  const [editedQuestion, setEditedQuestion] = useState<
    QuestionItem | undefined
  >(undefined);

  const getAmountOfQuestions = (priority: Priorities) => {
    const currentDimensionsQuestions = questions.filter(
      ({ dimension }) => dimension && dimension._id === id
    );
    if (!currentDimensionsQuestions.length) return 0;
    return currentDimensionsQuestions.filter(
      (q) => q.priority === priority.toLocaleLowerCase()
    ).length;
  };

  const handleCreateQuestion = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditedQuestion(undefined);
  };

  const handleCloseMenuButton = () => {
    setCurrentOpenMenu(-1);
  };

  const handleTableButtonClick = (index: number) => {
    setCurrentOpenMenu(index);
  };

  const handleDeleteClick = () => {
    setIsConfirmationModalOpen(true);
  };

  const handleEditClick = () => {
    setEditedQuestion(filteredQuestions[currentOpenMenu]);
  };

  const handleFeedbackClick = (value: boolean) => {
    if (value) {
      dispatch(deleteQuestionRequest(filteredQuestions[currentOpenMenu]._id));
    }
    setIsConfirmationModalOpen(false);
    setCurrentOpenMenu(-1);
  };

  const handleConfirmationModalClose = () => {
    setIsConfirmationModalOpen(false);
  };

  useEffect(() => {
    if (!questions.length) dispatch(getQuestionsRequest());
  }, [dispatch, questions]);

  useEffect(() => {
    const currentDimensionsQuestions = questions.filter((q) => {
      if (currentPriority === '') return q.dimension && q.dimension._id === id;
      return (
        q.dimension &&
        q.dimension._id === id &&
        currentPriority.toLowerCase() === q.priority
      );
    });
    setFilteredQuestions(currentDimensionsQuestions);
    setCurrentOpenMenu(-1);
  }, [id, questions, currentPriority]);

  useEffect(() => {
    if (editedQuestion) setIsModalOpen(true);
  }, [editedQuestion]);

  const menuItems = [
    {
      title: 'Editar',
      onClick: () => handleEditClick(),
    },
    {
      title: 'Excluir',
      onClick: () => handleDeleteClick(),
      isDanger: true,
    },
  ];
  return (
    <Grid>
      <Box params={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <Card>
          <Box
            params={{
              display: 'flex',
              justifyContent: 'space-around',
              alignItems: 'center',
            }}
          >
            <Title textDecoration="strong" variant="primary" level={3}>
              {dimensionName}
            </Title>
            <IconBox>
              <BiMessageSquareDetail size="20" color={theme.colors.blue} />
              <Text>{filteredQuestions.length} perguntas</Text>
            </IconBox>
            <IconBox>
              <BiMessageSquareDetail size="20" color={theme.colors.p1} />
              <Text>{getAmountOfQuestions('P1')} obrigatórias (P1)</Text>
            </IconBox>
            <IconBox>
              <BiMessageSquareDetail size="20" color={theme.colors.p2} />
              <Text>{getAmountOfQuestions('P2')} Complementares (P2)</Text>
            </IconBox>
            <IconBox>
              <BiMessageSquareDetail size="20" color={theme.colors.p3} />
              <Text>{getAmountOfQuestions('P3')} Opcionais (P3)</Text>
            </IconBox>
          </Box>
        </Card>

        <Box
          params={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Box
            params={{ display: 'flex', gap: '10px', alignItems: 'center' }}
            onChange={(e: any) => setCurrentPriority(e.target.value)}
          >
            <RadioContainer>
              <RadioButton
                label="Todos"
                name="priority"
                value=""
                checked={currentPriority === ''}
              />
            </RadioContainer>
            <RadioContainer>
              <RadioButton
                label="P1"
                name="priority"
                value="P1"
                checked={currentPriority === 'P1'}
              />
            </RadioContainer>
            <RadioContainer>
              <RadioButton
                label="P2"
                name="priority"
                value="P2"
                checked={currentPriority === 'P2'}
              />
            </RadioContainer>
            <RadioContainer>
              <RadioButton
                label="P3"
                name="priority"
                value="P3"
                checked={currentPriority === 'P3'}
              />
            </RadioContainer>
          </Box>

          <Box
            params={{
              display: 'flex',
              alignItems: 'center',
              flex: '0 0 30%',
            }}
          >
            <Button
              onClick={handleCreateQuestion}
              block
              size="small"
              variant="primary"
            >
              Cadastrar pergunta
            </Button>
          </Box>
        </Box>

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
            : filteredQuestions.map((question, index) => (
                <Card key={question._id}>
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
                        justifyContent: 'space-between',
                      }}
                    >
                      <Box
                        params={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '25px',
                        }}
                      >
                        <Text variant="primary">#{index + 1}</Text>
                        <Tag
                          size="large"
                          color={
                            TagColors[
                              question.priority.toLowerCase() as keyof typeof TagColors
                            ]
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
                      <Box params={{ position: 'relative' }}>
                        <TableMenu
                          onClose={() => handleCloseMenuButton()}
                          isOpen={currentOpenMenu === index}
                          menuItems={menuItems}
                          itemIndex={index}
                        />
                        <ColumnButton
                          onClick={() => handleTableButtonClick(index)}
                        >
                          <BsThreeDotsVertical
                            color={theme.colors.black}
                            size="24"
                          />
                        </ColumnButton>
                      </Box>
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
      </Box>
      <CreateQuestion
        question={editedQuestion}
        isModalOpen={isModalOpen}
        onClose={handleCloseModal}
      />
      <ConfirmationModal
        onFeedbackClick={handleFeedbackClick}
        isOpen={isConfirmationModalOpen}
        onClose={handleConfirmationModalClose}
      />
    </Grid>
  );
};

export default EditQuestion;
