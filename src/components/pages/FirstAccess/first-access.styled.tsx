import styled from 'styled-components';

import { Row } from 'react-flexbox-grid';

import login from '../../../assets/login.png';

export const FirstAccessImage = styled.div`
  width: 100%;
  height: 100%;
  background-image: url(${login});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center center;
  @media (max-width: 768px) {
    height: 250px;
  }
`;

export const FirstAccessRow = styled(Row)`
  height: 100vh;
  margin: 0;
  background-color: #ffffff;
  .login-col {
    padding: 0;
  }
`;

export const FirstAccessContainer = styled.div`
  height: 100vh;
  padding: 0 64px;
  display: flex;
  gap: 32px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  @media (max-width: 768px) {
    padding: 0 10px 120px 0;
    height: auto;
    margin-top: 50px;
  }
`;

export const AdminAccessContainer = styled.div`
  position: absolute;
  bottom: 0;
  padding: 32px 0;
  text-align: center;
  width: 100%;
  background-color: ${(props) => props.theme.colors.gray};
  a {
    text-decoration: underline;
    color: ${(props) => props.theme.colors.black};
  }
`;

export const FirstAccessForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;
