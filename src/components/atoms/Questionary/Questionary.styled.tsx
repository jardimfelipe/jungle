import styled from 'styled-components';
import { rgba } from 'polished';

import { Tag } from '../..';
import QuestionImage from '../../../assets/question.png';
import { StyledButton } from '../Button/Button.styled';

export const Questionary = styled.div<{ image: string }>`
  width: 100%;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  gap: 25px;
  background-image: url('${QuestionImage}');
  background-size: cover;
  background-position: center;
  background-color: ${rgba('#011F3B', 0.9)};
  min-height: 70px;
  padding: 28px 32px;
  color: #ffffff;
  ${Tag} {
    background-color: ${(props) => props.theme.colors.blue};
  }
  h3 {
    line-height: 1;
  }
`;

export const QuestionaryButton = styled(StyledButton)`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  color: #ffffff;
  font-weight: normal;
  div {
    background-color: ${rgba('#ffffff', 0.2)};
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 5px 7px;
    border-radius: 6px;
  }
`;
