import { lighten } from 'polished';
import styled from 'styled-components';
import { ProgressBarProps } from './ProgressBar.types';

export const ProgressBar = styled.div<ProgressBarProps>`
  height: 8px;
  width: 65px;
  border-radius: 21px;
  background-color: ${({ color }) => lighten(0.35, color)};
  position: relative;
  align-self: flex-end;
  margin-bottom: 7px;
  &:after {
    content: '';
    height: 8px;
    width: ${({ currentValue }) => `${currentValue}%`};
    position: absolute;
    background-color: ${({ color }) => color};
    border-radius: 21px;
  }
`;
