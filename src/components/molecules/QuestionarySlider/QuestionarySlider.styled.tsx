import styled from 'styled-components';
import { rgba } from 'polished';
import { Button } from '../..';

export const QuestionItem = styled.div<{ isCurrentQuestion: boolean }>`
  background-color: ${(props) =>
    props.isCurrentQuestion ? '#3BC8E3' : '#c4c4c4'};
  flex: auto;
  height: 8px;
`;

export const MobileSliderContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  position: fixed;
  bottom: 0;
  left: 0;
  background: ${(props) => `linear-gradient(${rgba(
    props.theme.colors.blue,
    0.1
  )}, ${rgba(props.theme.colors.blue, 0.1)}),
    linear-gradient(white, white)`};
  padding: 15px 10px;
  width: 100%;
  z-index: 100;
`;

export const SliderButton = styled(Button)`
  padding: 3px;
  border-radius: 3px;
  svg {
    width: 25px;
    height: 25px;
  }
`;
