import styled from 'styled-components';
import { Tag } from '../..';

export const QuestionaryTag = styled(Tag)`
  background-color: #ffffff;
  color: ${(props) => props.theme.colors.black};
  border-radius: 0 5px 5px 0;
  position: relative;
  left: -3px;
`;
