import React from 'react';
import styled from 'styled-components';
import { Snackbar } from '../..';

const Layout = styled.div``;

const Main = styled.main`
  width: 100%;
`;

const BasicTemplate: React.FC = ({ children }) => {
  return (
    <Layout>
      <Main>{children}</Main>
      <Snackbar />
    </Layout>
  );
};

export default BasicTemplate;
