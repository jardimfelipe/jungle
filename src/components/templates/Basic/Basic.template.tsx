import React from 'react';
import { Grid } from 'react-flexbox-grid';
import styled from 'styled-components';

import { Sidebar, Snackbar } from '../..';

const Layout = styled.div`
  padding: 32px 0 32px ${(props) => props.theme.sizes.sidebar};
`;

const Main = styled.main`
  width: 100%;
  padding-bottom: 50px;
`;

const BasicTemplate: React.FC = ({ children }) => {
  console.log('template');
  return (
    <Layout>
      <Sidebar />
      <Main>
        <Grid>{children}</Grid>
      </Main>
      <Snackbar />
    </Layout>
  );
};

export default BasicTemplate;
