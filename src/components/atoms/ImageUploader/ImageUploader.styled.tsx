import styled from 'styled-components';
import { rgba } from 'polished';

import { StyledButton } from '../Button/Button.styled';

export const Preview = styled.div<{ image: string }>`
  width: 100%;
  height: 190px;
  background: ${(props) => `url(${props.image})`};
  background-position: center center;
  background-size: cover;
  position: relative;
`;

export const ChangeButton = styled(StyledButton)`
  background-color: ${(props) => rgba(props.theme.colors.black, 0.5)};
  position: absolute;
  bottom: 0;
  right: 0;
  padding: 4px 10px;
  border-radius: 8px 0;
  color: #ffffff;
`;
