import { Row } from 'react-flexbox-grid';
import styled from 'styled-components';
import login from '../../../assets/login.png';

export const LoggedOutRow = styled(Row)`
  height: 100vh;
  margin: 0;
  background-color: #ffffff;
  .loggedout-col {
    padding: 0;
  }
`;

export const LoggedOutImage = styled.div`
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
