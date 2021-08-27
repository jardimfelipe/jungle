import React from 'react';
import { useTranslation } from 'react-i18next';

import { Image, Typography } from '../../';

import EmptyQuestionary from '../../../assets/empty-questionary.svg';
import { EmptyStateContainer } from '../../molecules/QuestionaryCard/QuestionaryCard.styled';

const { Title, Text } = Typography;

const EmptyResults: React.FC = () => {
  const { t } = useTranslation();
  return (
    <EmptyStateContainer>
      <Image src={EmptyQuestionary} />
      <Title variant="primary" level={2}>
        {t('emptyStates.myResults.title')}
      </Title>
      <Text>{t('emptyStates.myResults.description')}</Text>
    </EmptyStateContainer>
  );
};

export default EmptyResults;
