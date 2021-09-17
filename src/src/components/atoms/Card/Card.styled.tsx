import styled from 'styled-components';
import { CardProps } from './Card.types';

export const CardContainer = styled.div<CardProps>`
  border-radius: 17px;
  padding: ${({ size = 'regular' }) =>
    size === 'regular' ? '28px 24px' : '1px 24px'};
  background-color: ${(props) => props.background || '#ffffff'};
  position: relative;
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 15px;
  right: 10px;
  background-color: #ffffff;
  border-radius: 50px;
  min-width: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5px;
  cursor: pointer;
  z-index: 100;
`;
