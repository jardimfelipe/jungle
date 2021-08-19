import styled from 'styled-components';
import { Tag } from '../..';

export const QuestionaryTag = styled(Tag)`
  background-color: #ffffff;
  color: ${(props) => props.theme.colors.black};
  border-radius: 0 5px 5px 0;
  position: relative;
  left: -3px;
`;

export const EmptyStateContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  img {
    max-width: 350px;
  }
`;
