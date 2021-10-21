import styled from 'styled-components';
import { Image } from '../..';

export const TopBarContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
  background-color: ${(props) => props.theme.colors.gray};
  ${Image} {
    max-width: 150px;
  }
`;
