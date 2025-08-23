import { createTheme } from '@mui/material';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#afff3f',
      contrastText: '#000',
    },
    error: {
      main: '#fc4848',
    },
  },
});

export default theme;
