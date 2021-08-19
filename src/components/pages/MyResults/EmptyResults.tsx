import React from 'react';

import { Image, Typography } from '../../';

import EmptyQuestionary from '../../../assets/empty-questionary.svg';
import { EmptyStateContainer } from '../../molecules/QuestionaryCard/QuestionaryCard.styled';

const { Title, Text } = Typography;

const EmptyResults: React.FC = () => {
  return (
    <EmptyStateContainer>
      <Image src={EmptyQuestionary} />
      <Title variant="primary" level={2}>
        Ainda não há resultados a serem exibidos
      </Title>
      <Text>
        Após o preenchimento dos questionários será exibidos os resultados nesta
        seção.
      </Text>
    </EmptyStateContainer>
  );
};

export default EmptyResults;
