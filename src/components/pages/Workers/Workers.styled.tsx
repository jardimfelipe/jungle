import styled from 'styled-components';
import { Button } from '../..';
import { CardContainer } from '../../atoms/Card/Card.styled';

export const MenuCard = styled(CardContainer)`
  position: absolute;
  right: 40px;
  padding: 10px 0;
  z-index: 100;
  transition: 200ms ease-in-out;
  overflow: hidden;
  ul {
    list-style-type: none;
    li {
      margin: 5px 0;
    }
  }
`;

export const MenuButton = styled(Button)<{ danger?: boolean }>`
  font-weight: normal;
  justify-content: flex-end;
  border-radius: 0;
  padding: 10px;
  color: ${(props) =>
    props.danger ? props.theme.colors.p1 : props.theme.colors.black};
  width: 100%;
  &:hover {
    background-color: rgba(0, 0, 0, 0.05);
  }
`;
