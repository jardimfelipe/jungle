import React, { ReactNode } from 'react';
import { StyledIconButton } from './IconButton.styled';

// import { Container } from './styles';
type IconButtonProps = {
  icon: ReactNode;
  onClick?: () => void;
};

const IconButton: React.FC<IconButtonProps> = ({ icon, onClick }) => {
  return <StyledIconButton onClick={onClick}>{icon}</StyledIconButton>;
};

export default IconButton;
