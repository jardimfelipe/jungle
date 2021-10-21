import React, { useEffect } from 'react';
import { Grid } from 'react-flexbox-grid';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import { MobileTopBar, Sidebar, Snackbar, UserBar } from '../..';
import useMobileWidth from '../../../hooks/useMobileWidth';
import { RootState } from '../../../store';
import {
  setSidebarState,
  setUserbarState,
} from '../../../store/modules/base/actions';

type LayoutProps = {
  isSidebarOpen: boolean;
  isUserbarOpen: boolean;
};

const Layout = styled.div<LayoutProps>`
  padding: 32px
    ${(props) => (props.isUserbarOpen ? props.theme.sizes.userbar : '0')} 32px
    ${(props) => props.theme.sizes.sidebar};
  transition: padding 0.3s;
  @media (max-width: 768px) {
    padding: 80px 0 0 0;
  }
`;

const Main = styled.main`
  width: 100%;
  padding-bottom: 50px;
  transition: padding 0.3s;
`;

const WorkerTemplate: React.FC = ({ children }) => {
  const dispatch = useDispatch();
  const { isSidebarOpen, isUserbarOpen } = useSelector(
    ({ base }: RootState) => base
  );
  const isMobile = useMobileWidth();

  useEffect(() => {
    if (!isMobile) {
      dispatch(setSidebarState(true));
    } else {
      dispatch(setSidebarState(false));
      dispatch(setUserbarState(false));
    }
  }, [isMobile, dispatch]);
  return (
    <Layout isSidebarOpen={isSidebarOpen} isUserbarOpen={isUserbarOpen}>
      {isMobile && <MobileTopBar />}
      <Sidebar />
      <Main>
        <Grid>{children}</Grid>
      </Main>
      <UserBar />
      <Snackbar />
    </Layout>
  );
};

export default WorkerTemplate;
