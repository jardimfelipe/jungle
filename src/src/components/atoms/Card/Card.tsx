import React, { useState } from 'react';

import { CardContainer, CloseButton } from './Card.styled';
import { GrClose } from 'react-icons/gr';

import { CardProps } from './Card.types';
import { useTheme } from 'styled-components';

const Card: React.FC<CardProps> = ({
  children,
  background,
  hasCloseButton,
  size,
}) => {
  const [showCard, setShowCard] = useState(true);
  const theme = useTheme();

  const handleClick = () => {
    setShowCard(false);
  };

  return showCard ? (
    <CardContainer size={size} background={background}>
      {hasCloseButton && (
        <CloseButton onClick={handleClick}>
          <GrClose size="18" color={theme.colors.darkGray} />
        </CloseButton>
      )}
      {children}
    </CardContainer>
  ) : null;
};

export default Card;
