import React from 'react';

import { StyledButton } from './Button.styled';
import { Oval } from 'react-loading-icons';

import { ButtonProps } from './Button.type';

const Button: React.FC<ButtonProps> = (props) => {
  const { isLoading, disabled, ...rest } = props;

  return (
    <StyledButton
      isLoading={isLoading}
      disabled={isLoading || disabled}
      {...rest}
    >
      {isLoading ? <Oval height="28" /> : props.children}
    </StyledButton>
  );
};

export default Button;
