import React from 'react';
import ReactDOM from 'react-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import App from './App';
import { RecoilRoot } from 'recoil';
import { darkTheme } from './theme';
import { ThemeProvider } from 'styled-components';

ReactDOM.render(
  <RecoilRoot>
    <ThemeProvider theme={darkTheme}>
      <App />       
    </ThemeProvider>
  </RecoilRoot>,
  document.getElementById('root')
);
