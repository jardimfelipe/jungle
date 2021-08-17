import styled from 'styled-components';
import { CardContainer } from '../../atoms/Card/Card.styled';
import { MenuItemProps, SidebarProps } from './Sidebar.types';

export const SidebarContainer = styled.aside<SidebarProps>`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  height: 100%;
  background-color: #ffffff;
  width: ${(props) => props.theme.sizes.sidebar};
  padding-bottom: 25px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  overflow-y: auto;
  ${(props) => !props.isSidebarOpen && `left: -${props.theme.sizes.sidebar}`};
  transition: 0.3s;
  @media (max-width: 768px) {
    ${(props) =>
      props.isSidebarOpen
        ? `
      left: 0;
    `
        : null};
  }
`;

export const MenuList = styled.ul`
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;
  list-style-type: none;
`;

export const MenuItem = styled.li<MenuItemProps>`
  a,
  .menu-item {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding: 10px 0 10px 32px;
    gap: 15px;
    font-size: 16px;
    color: ${(props) => props.theme.colors.darkGray};
    user-select: none;
    svg {
      width: 25px;
      height: 25px;
    }
    ${(props) =>
      !props.isSoon &&
      `
    &:hover {
      color: ${props.theme.colors.black};
      cursor: pointer;
      border-right: 3px solid ${props.theme.colors.blue};
    }
    *:active, :focus {
      outline: none;
      color: ${props.theme.colors.black};
    }
  ${
    props.isActive &&
    `
      color: ${props.theme.colors.black};
    cursor: pointer;
    border-right: 3px solid ${props.theme.colors.blue};
  `
  }
  `};
  }
`;

export const UserSectionContainer = styled.div`
  margin-top: 24px;
  display: flex;
  flex-direction: column;
  width: 100%;
  .user-name {
    font-size: 18px;
  }
  .user-role {
    color: ${(props) => props.theme.colors.blue};
  }
`;

export const SpecialistCard = styled(CardContainer)`
  padding-top: 90px;
  position: static;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  img {
    position: absolute;
    height: 180px;
    top: -5px;
    left: 50%;
    transform: translateX(-50%);
  }
  button {
    box-shadow: none;
    font-weight: normal;
  }
`;

export const SpeclialistLink = styled.a`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 15px;
  transition: 0.3s;
  background-color: #0062ff;
  border: 1px solid #0062ff;
  color: #ffffff;
  box-shadow: 0px 5px 35px rgb(0 98 255 / 25%);
  padding: 10px;
  text-align: center;
  border-radius: 10px;
`;
