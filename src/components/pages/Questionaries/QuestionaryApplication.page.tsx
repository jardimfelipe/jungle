import React, { useEffect, useState } from 'react';

import { Col, Grid, Row } from 'react-flexbox-grid';
import {
  Box,
  Button,
  Tag,
  Typography,
  QuestionarySlider,
  RadioButton,
  Modal,
  Image,
} from '../..';
import {
  Divider,
  ImageContainer,
  QuestionaryContainer,
  QuestionButton,
  QuestionText,
  OptionsContainer,
  QuestionContainer,
} from './Questionaries.styled';
import { BsArrowRight } from 'react-icons/bs';

import { useTheme } from 'styled-components';
import useMobileWidth from '../../../hooks/useMobileWidth';
import { useHistory, useLocation /*,useParams*/ } from 'react-router-dom';

import { SwitchTransition, Transition } from 'react-transition-group';
import FinishQuestionary from '../../../assets/finish-questionary.png';
import { ModalButton } from '../Dashboard/Dashboard.styled';

import { useDispatch, useSelector } from 'react-redux';
// import { getQuestionaryRequest } from '../../../store/modules/questionaries/actions';
import { RootState } from '../../../store';
import { setSnackbarOpen } from '../../../store/modules/base/actions';
import {
  UserAnswer,
  Questionary,
} from '../../../store/modules/questionaries/types';
import {
  sendQuestionaryRequest,
  resetFeeback,
} from '../../../store/modules/questionaries/actions';
import { LoaderWrapper } from '../../molecules/Table/table.styled';
import { Oval } from 'react-loading-icons';
import { getSavedState, saveState } from '../../../utils/localStorage';

const { Title, Text } = Typography;

const questionTransition = {
  entering: { transform: 'translateX(-100%)' },
  entered: { transform: 'translateX(0)' },
  exiting: { opacity: '0', transform: 'translateX(30%)' },
  exited: { opacity: '0' },
};

type RouteState = {
  questionary: Questionary;
};

type StartedQuestionary = {
  questionaryId: string;
  answers: UserAnswer[];
};

const QuestionaryApplication: React.FC = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const history = useHistory();
  const {
    state: { questionary },
  } = useLocation<RouteState>();
  // const { id } = useParams<{ id: string }>();
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<UserAnswer[]>([]);
  const isMobile = useMobileWidth();
  const { /*questionary,*/ feedback, isLoading } = useSelector(
    ({ questionaries }: RootState) => questionaries
  );

  const { currentUser } = useSelector(({ login }: RootState) => login);

  const handleRadioChange = (e: any) => {
    setSelectedAnswer(e.target.value);
  };

  const handleExitClick = () => {
    if (!answers.length) return history.goBack();
    saveState('worker.startedQuestionaries', [
      { questionaryId: questionary._id, answers: answers },
    ]);
    history.goBack();
  };

  const isLastQuestion = () => {
    return currentQuestion + 1 === questionary.question.length;
  };
  const handleNexQuestionClick = () => {
    const question = questionary.question[currentQuestion];
    const option = question.options.find(
      ({ value }) => value === selectedAnswer
    );
    const newAnswer = {
      question_id: question._id,
      answer: option?.value || 0,
    };
    if (answers.some((answer) => answer.question_id === question._id)) {
      const recentAnswers = answers.map((answer) => ({
        ...answer,
        ...(answer.question_id === question._id
          ? {
              ...newAnswer,
            }
          : null),
      }));
      setAnswers(recentAnswers);
    } else {
      setAnswers([...answers, newAnswer]);
    }
    if (isLastQuestion()) {
      const model = {
        questionnaire: questionary._id,
        dimension: questionary.dimension?._id || '',
        user: currentUser._id,
        answers: answers,
      };

      dispatch(sendQuestionaryRequest(model));
    } else {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrevQuestionClick = () => {
    if (currentQuestion === 0) return;
    setCurrentQuestion(currentQuestion - 1);
  };

  console.log(answers);

  const handleCloseModal = () => {
    dispatch(resetFeeback());
    history.push('/');
  };
  useEffect(() => {
    const savedAnswers = getSavedState('worker.startedQuestionaries');
    if (!savedAnswers) return setSelectedAnswer('');

    const questionaryAnswers = savedAnswers.find(
      ({ questionaryId }: StartedQuestionary) =>
        questionaryId === questionary._id
    );
    if (!questionaryAnswers) return setSelectedAnswer('');

    const questionIndex = questionaryAnswers.answers.findIndex(
      ({ question_id }: UserAnswer) =>
        question_id === questionary.question[currentQuestion]._id
    );
    if (questionIndex === -1) return setSelectedAnswer('');
    setAnswers(
      (answers) => (answers = [...answers, ...questionaryAnswers.answers])
    );
    return setSelectedAnswer(
      questionaryAnswers.answers[currentQuestion].answer
    );
  }, [currentQuestion, questionary]);

  useEffect(() => {
    if (feedback.status === 'success') setIsModalOpen(true);
  }, [feedback]);

  useEffect(() => {
    const savedAnswers = getSavedState('worker.startedQuestionaries');
    if (!savedAnswers) return;
    const questionaryAnswers = savedAnswers.find(
      ({ questionaryId }: StartedQuestionary) =>
        questionaryId === questionary._id
    );
    if (!questionaryAnswers) return;
    setCurrentQuestion(questionaryAnswers.answers.length);
  }, [questionary]);

  // useEffect(() => {
  //   dispatch(getQuestionaryRequest(id));
  // }, [dispatch, id]);

  useEffect(() => {
    feedback.status === 'error' && dispatch(setSnackbarOpen(feedback.message));
  }, [feedback, dispatch]);

  useEffect(() => {
    return () => {
      dispatch(resetFeeback());
    };
  }, [dispatch]);
  return (
    <Box params={{ display: 'flex', position: 'relative' }}>
      <LoaderWrapper isLoading={isLoading}>
        <Oval stroke={theme.colors.blue} height={50} />
      </LoaderWrapper>
      <Box params={{ flex: '1 0 70%' }}>
        <QuestionaryContainer>
          <Grid>
            <Box
              params={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <Tag size="large" color="primary">
                {questionary?.dimension?.name}
              </Tag>
              <Button onClick={handleExitClick}>
                Salvar e sair <BsArrowRight />
              </Button>
            </Box>

            <Box
              params={{ display: 'flex', gap: '20px', alignItems: 'center' }}
            >
              <Title variant="primary" level={2}>
                {questionary?.title}
              </Title>
              <Text>{questionary.question.length} perguntas</Text>
            </Box>

            <QuestionarySlider
              totalQuestions={questionary.question?.length || 0}
              currentQuestion={currentQuestion}
              onClickNext={handleNexQuestionClick}
              onClickPrev={handlePrevQuestionClick}
            />
            <Divider />

            <SwitchTransition mode="out-in">
              <Transition key={currentQuestion} timeout={200} unmountOnExit>
                {(state) => (
                  <QuestionContainer
                    style={{
                      ...questionTransition[
                        state as keyof typeof questionTransition
                      ],
                    }}
                  >
                    <Text color={theme.colors.p1}>Perguntar obrigatória</Text>
                    <Box
                      params={{
                        display: 'flex',
                        gap: '5px',
                        justifyContent: 'flex-start',
                      }}
                    >
                      <QuestionText textDecoration="strong">
                        {currentQuestion + 1}.
                      </QuestionText>
                      <QuestionText>
                        {questionary.question.length &&
                          questionary.question[currentQuestion].title}
                      </QuestionText>
                    </Box>
                    <OptionsContainer onChange={handleRadioChange}>
                      {questionary.question.length &&
                        questionary.question[currentQuestion].options?.map(
                          (option, index) => (
                            <RadioButton
                              label={option.label}
                              name={`radio`}
                              id={`opção-${index}`}
                              key={`opção-${index}`}
                              value={option.value}
                              checked={selectedAnswer === option.value}
                            />
                          )
                        )}
                    </OptionsContainer>
                  </QuestionContainer>
                )}
              </Transition>
            </SwitchTransition>
          </Grid>
          {!isMobile && (
            <QuestionButton
              onClick={handleNexQuestionClick}
              variant="primary"
              block
              disabled={selectedAnswer === ''}
            >
              {isLastQuestion() ? 'Finalizar questionário' : 'Próxima pergunta'}
            </QuestionButton>
          )}
        </QuestionaryContainer>
      </Box>
      {!isMobile && (
        <Box params={{ flex: '0 0 30%' }}>
          <ImageContainer />
        </Box>
      )}
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <Row>
          <Col xs={12} lg={8}>
            <Box
              params={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'flex-start',
                padding: '25px 32px',
                gap: '15px',
                width: '100%',
                textAlign: 'center',
              }}
            >
              <Box params={{ display: 'block', width: '100%' }}>
                <Title textAlign="center" variant="primary" level={2}>
                  Parabéns {currentUser.name}!
                </Title>
              </Box>
              <Text textDecoration="strong">
                Ficamos felizes que você concluíu com êxito o questionário
                Autocobrança.
              </Text>
              <Text>
                Sed in libero commodo enim laoreet auctor. Donec ac ultricies
                nibh, non gravida nibh.
              </Text>
            </Box>
          </Col>
          {!isMobile && (
            <Col xs>
              <Box
                params={{
                  padding: '25px 32px',
                }}
              >
                <Image src={FinishQuestionary} />
              </Box>
            </Col>
          )}
          <ModalButton onClick={handleCloseModal} variant="primary" block>
            Fechar
          </ModalButton>
        </Row>
      </Modal>
    </Box>
  );
};

export default QuestionaryApplication;
