import {
  Box,
  Button,
  TextField,
} from '@mui/material';
import logo from 'assets/images/logo.svg';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLoginMutation } from 'services';
import { setAuth } from 'store/slices/auth';

function Auth() {
  const dispatch = useDispatch();

  const [login, setLogin] = useState('');

  const [password, setPassword] = useState('');

  const [loginHandler, { isLoading, isSuccess, reset }] = useLoginMutation();

  useEffect(() => {
    if (isSuccess) {
      dispatch(setAuth());

      reset();
    }
  }, [dispatch, isSuccess]);

  return (
    <>
      <Box
        mb={3}
        width="auto"
        height={24}
        component="img"
        src={logo}
        alt="logo"
      />

      <Box>
        <TextField
          fullWidth
          label="Логин"
          type="text"
          variant="outlined"
          value={login}
          onChange={(e) => setLogin(e.target.value)}
          sx={{ mb: 2 }}
        />

        <TextField
          fullWidth
          label="Пароль"
          type="password"
          variant="outlined"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          sx={{ mb: 2 }}
        />

        <Button
          onClick={() => loginHandler({ login, password })}
          fullWidth
          variant="contained"
          color="primary"
          size="large"
          loading={isLoading}
        >
          Войти
        </Button>
      </Box>
    </>
  );
}

export default Auth;
