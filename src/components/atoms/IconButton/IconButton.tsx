import React, { ReactNode } from 'react';
import { StyledIconButton } from './IconButton.styled';

// import { Container } from './styles';
interface IconButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: ReactNode;
}

const IconButton: React.FC<IconButtonProps> = (props) => {
  const { icon, ...rest } = props;
  return <StyledIconButton {...rest}>{icon}</StyledIconButton>;
};

export default IconButton;
