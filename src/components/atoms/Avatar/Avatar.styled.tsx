import styled from 'styled-components';
import { AvatarProps } from './Avatar.types';

export const Avatar = styled.div<AvatarProps>`
  border-radius: 100%;
  width: 43px;
  height: 43px;
  background-image: url(${(props) => props.image});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
`;
