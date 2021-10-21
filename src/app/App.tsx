import React, { useEffect } from 'react';

import { Provider } from 'react-redux';
import store from '../store';

import Router from './Router';

import { ThemeProvider } from 'styled-components';
import GlobalStyles from '../theme/global-styles';
import theme from '../theme/theme';

import './styles.css';
import { SkeletonTheme } from 'react-loading-skeleton';
import { setConfig } from '../utils/translateApiConfig';

const App: React.FC = () => {
  useEffect(() => {
    setConfig();
  }, []);
  return (
    <SkeletonTheme
      color={theme.colors.darkGray}
      highlightColor={theme.colors.gray}
    >
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <GlobalStyles />
          <Router />
        </ThemeProvider>
      </Provider>
    </SkeletonTheme>
  );
};

export default App;
