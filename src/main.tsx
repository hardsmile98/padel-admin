import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { SnackbarProvider } from 'notistack';
import { BrowserRouter } from 'react-router-dom';
import { store } from 'store';
import moment from 'moment';
import theme from 'theme';
import { CssBaseline, ThemeProvider } from '@mui/material';
import Routes from './Routes';

moment.locale('ru');

createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />

        <SnackbarProvider
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          autoHideDuration={3000}
        >
          <Routes />
        </SnackbarProvider>
      </ThemeProvider>
    </BrowserRouter>
  </Provider>,
);
