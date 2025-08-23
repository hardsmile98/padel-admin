import {
  Route,
  Routes as ReactRouter,
  Navigate,
} from 'react-router-dom';
import { Container } from '@mui/material';
import { Auth, Players, Tournaments } from 'pages';
import { Header } from 'components';
import { useSelector } from './store';

function AppRoutes() {
  return (
    <>
      <Header />

      <ReactRouter>
        <Route path="/players/*" element={<Players />} />
        <Route path="/tournaments/*" element={<Tournaments />} />
        <Route path="*" element={<Navigate to="/players" />} />
      </ReactRouter>
    </>
  );
}

function Routes() {
  const isAuth = useSelector((state) => state.auth.isAuth);

  return (
    <main>
      <Container sx={{ py: 3 }}>
        <ReactRouter>
          {isAuth
            ? <Route path="/*" element={<AppRoutes />} />
            : <Route path="/*" element={<Auth />} />}
        </ReactRouter>
      </Container>
    </main>
  );
}

export default Routes;
