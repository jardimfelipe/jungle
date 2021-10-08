import styled from 'styled-components';
import { StyledButton } from '../../atoms/Button/Button.styled';

export const RadioContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

export const QuestionTextArea = styled.textarea`
  width: 100%;
  height: 150px;
  background-color: #ffffff;
  border: 1px solid #aab8c6;
  padding: 15px;
  font-size: 18px;
`;

export const AnswerBox = styled.div`
  background-color: #ffffff;
  border: 1px solid #aab8c6;
  padding: 15px;
  display: flex;
  flex-direction: column;
  gap: 15px;
  overflow-y: auto;
  height: 250px;
`;

export const OptionMark = styled.div`
  border: 3px solid ${(props) => props.theme.colors.darkGray};
  height: 25px;
  width: 25px;
  border-radius: 50px;
`;

export const CancelButton = styled(StyledButton)`
  color: ${(props) => props.theme.colors.p1};
  border: 1px solid ${(props) => props.theme.colors.p1};
  flex: 0 0 250px;
`;

export const IconBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
`;
