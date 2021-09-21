import React, { useEffect } from 'react';

import {
  Box,
  NavigationButton,
  PromotionalCard,
  ResumeCard,
  Typography,
  Table,
  // Image,
} from '../../..';
import { BsArrowRight } from 'react-icons/bs';
import { ResumeBox } from '../Dashboard.styled';

import { useHistory } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../../../store';
import { getQuestionariesRequest } from '../../../../store/modules/questionaries/actions';
// import { Col, Row } from 'react-flexbox-grid';
// import { useTheme } from 'styled-components';

// import GestorResults from '../../../../assets/gestor-results.png';
// import GestorNegative from '../../../../assets/gestor-negative.png';
import { Questionary } from '../../../../store/modules/questionaries/types';
import { setSnackbarOpen } from '../../../../store/modules/base/actions';
import { BiDockLeft } from 'react-icons/bi';
import { getResultsRequest } from '../../../../store/modules/results/actions';
import { useTranslation } from 'react-i18next';

const { Title, Text } = Typography;

const Gestor: React.FC = () => {
  const history = useHistory();
  // const theme = useTheme();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const {
    questionaries,
    feedback,
    isLoading: isQuestionaryLoading,
  } = useSelector(({ questionaries }: RootState) => questionaries);
  const { currentUser } = useSelector((state: RootState) => state.login);
  // const { results } = useSelector((state: RootState) => state.results);

  const getTotalRespondents = () => {
    return questionaries.reduce((acc, curr) => {
      return acc + curr.replied;
    }, 0);
  };

  useEffect(() => {
    dispatch(
      getQuestionariesRequest({
        headers: { company: currentUser.company },
        userRole: 'gestor',
      })
    );
    dispatch(getResultsRequest('gestor'));
  }, [dispatch, currentUser]);

  useEffect(() => {
    feedback.status === 'error' && dispatch(setSnackbarOpen(feedback.message));
  }, [feedback, dispatch]);

  const tableFields = [
    {
      title: t('table.headers.title'),
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: t('table.headers.dimension'),
      dataIndex: 'dimension',
      key: 'dimension',
      render: (value: Questionary['dimension']) => <Text>{value?.name}</Text>,
    },
    {
      title: t('table.headers.questionNumber'),
      dataIndex: 'question',
      key: 'question',
      render: (value: Questionary['question']) => (
        <Text>
          {!!value ? value.length : 0} {t('questions')}
        </Text>
      ),
    },
    {
      title: t('table.headers.track'),
      dataIndex: 'tracking_start',
      key: 'tracking_start',
      render: (value: string, object: any) => (
        <Text>
          {`${new Date(value).toLocaleDateString('pt-br')} - ${new Date(
            object.tracking_end
          ).toLocaleDateString('pt-br')}`}
        </Text>
      ),
    },
  ];
  return (
    <Box params={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <PromotionalCard
        title={`${t('greetings.gestor.title')} ${currentUser.name}`}
        text={t('greetings.gestor.text')}
      />

      <Box params={{ display: 'flex', justifyContent: 'space-between' }}>
        <Title level={3}>{t('pages.title.teamResults')}</Title>
        <NavigationButton onClick={() => history.push('/team-results')}>
          <Text>{t('button.seeAll')} </Text> <BsArrowRight />
        </NavigationButton>
      </Box>

      {/* <Box
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
                  {results.analysis.adequate_protection.map(
                    (protection, index) => (
                      <li key={`adequate-protection-${index}`}>{protection}</li>
                    )
                  )}
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
                  {results.analysis.minor_protection.map(
                    (protection, index) => (
                      <li key={`minor-protection-${index}`}>{protection}</li>
                    )
                  )}
                </ul>
              </Box>
            </Col>
            <Col xs>
              <Image src={GestorNegative} />
            </Col>
          </Row>
        </GestorCard>
      </Box> */}

      <ResumeBox>
        <ResumeCard
          name={t('filledQuestionaries')}
          icon={<BiDockLeft color="#ffffff" />}
          total={getTotalRespondents()}
        />
        <ResumeCard
          name={t('availableQuestionaries')}
          icon={<BiDockLeft color="#ffffff" />}
          total={questionaries.length}
        />
      </ResumeBox>

      <Box params={{ display: 'flex', justifyContent: 'space-between' }}>
        <Title level={3}>{t('pages.title.lastQuestionaries')}</Title>
        <NavigationButton onClick={() => history.push('/questionaries')}>
          <Text>{t('button.seeAll')} </Text> <BsArrowRight />
        </NavigationButton>
      </Box>

      <Table
        isLoading={isQuestionaryLoading}
        items={questionaries.filter((q, index) => index <= 5)}
        fields={tableFields}
      />
    </Box>
  );
};

export default Gestor;
