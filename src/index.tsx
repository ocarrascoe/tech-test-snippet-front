import * as React from 'react';
import {createRoot} from 'react-dom/client';
import CssBaseline from '@mui/material/CssBaseline';
import {ThemeProvider} from '@mui/material/styles';
import App from './App';
import {lightTheme} from './themes';
import { UIProvider } from './contexts/ui';

const rootElement = document.getElementById('root');
const root = createRoot(rootElement!);

root.render(
  <UIProvider>
    <ThemeProvider theme={ lightTheme }>
      <CssBaseline />
      <App/>
    </ThemeProvider>
  </UIProvider>
);