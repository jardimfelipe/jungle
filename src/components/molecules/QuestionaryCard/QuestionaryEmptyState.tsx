import React from 'react';

import { Image, Typography } from '../../';

import EmptyQuestionary from '../../../assets/empty-questionary.svg';
import { EmptyStateContainer } from './QuestionaryCard.styled';

const { Title, Text } = Typography;

const QuestionaryEmptyState: React.FC = () => {
  return (
    <EmptyStateContainer>
      <Image src={EmptyQuestionary} />
      <Title variant="primary" level={2}>
        Você ainda tem questionários para preencher
      </Title>
      <Text>
        Assim que sua empresa tiver questionários, eles serão disponibilizados
        aqui nesta seção
      </Text>
    </EmptyStateContainer>
  );
};

export default QuestionaryEmptyState;
