import { darken } from 'polished';
import styled from 'styled-components';
import { Button, Tag } from '../..';
import { UserRoles } from '../../../store';

export const UserBarContainer = styled.aside<{ isUserbarOpen: boolean }>`
  position: fixed;
  top: 0;
  right: 0;
  z-index: 1000;
  height: 100%;
  background-color: #ffffff;
  width: ${(props) => props.theme.sizes.userbar};
  padding: 25px;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  transition: 0.3s;
  ${(props) => !props.isUserbarOpen && `right: -${props.theme.sizes.userbar}`};
`;

export const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .userInfo {
    &__userName {
      font-size: 18px;
    }
    &__points {
      position: relative;
      margin-bottom: 10px;
      img {
        border: 4.84615px solid #f5f5fb;
        height: 130px;
        width: 135px;
        border-radius: 100%;
      }
    }
  }
`;

export const UserTag = styled(Tag)<{ role: UserRoles }>`
  border: 1px solid
    ${(props) =>
      props.role === 'gestor' ? props.theme.colors.blue : '#ffd28e'};
  font-size: 16px;
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  background-color: ${(props) =>
    props.role === 'gestor' ? props.theme.colors.blue : '#ffd28e'};
`;

export const UserBarButton = styled(Button)`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  background-color: ${(props) => props.theme.colors.gray};
  padding: 20px 24px;
  color: ${(props) => props.theme.colors.black};
  font-weight: normal;
  &:hover {
    background-color: ${(props) => darken(0.05, props.theme.colors.gray)};
  }
  &:active {
    background-color: ${(props) => darken(0.1, props.theme.colors.gray)};
  }
`;

export const ChangePasswordForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
`;
