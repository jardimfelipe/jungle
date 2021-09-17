import { rgba } from 'polished';
import styled from 'styled-components';

export const DropContainer = styled.div`
  background-color: ${(props) => rgba(props.theme.colors.black, 0.1)};
  padding: 35px 60px;
  cursor: pointer;
  border-radius: 8px;
`;

export const FileInfo = styled.div`
  background-color: #f1f5fa;
  padding: 5px 20px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  span {
    text-decoration: italic;
  }
`;
