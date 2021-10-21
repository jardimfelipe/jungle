import React from 'react';
import { useTranslation } from 'react-i18next';

import { Image, Typography } from '../../';

import EmptyQuestionary from '../../../assets/empty-questionary.svg';
import { EmptyStateContainer } from './QuestionaryCard.styled';

const { Title, Text } = Typography;

const QuestionaryEmptyState: React.FC = () => {
  const { t } = useTranslation();
  return (
    <EmptyStateContainer>
      <Image src={EmptyQuestionary} />
      <Title variant="primary" level={2}>
        {t('emptyStates.questionaries.title')}
      </Title>
      <Text>{t('emptyStates.questionaries.description')}</Text>
    </EmptyStateContainer>
  );
};

export default QuestionaryEmptyState;
