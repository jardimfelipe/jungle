import styled from 'styled-components';
import { StyledButton } from '../../atoms/Button/Button.styled';

export const QuestionButton = styled(StyledButton)`
  padding: 0 2px;
  background: ${(props) => props.theme.colors.gray};
`;

export const ParamIcon = styled.div`
  padding: 5px 13px;
  border-radius: 5px;
  background-color: ${(props) => props.theme.colors.gray};
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 0 0 10px;
`;

export const ParamInfos = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 3px 0;
  flex: 0 0 45%;
`;
