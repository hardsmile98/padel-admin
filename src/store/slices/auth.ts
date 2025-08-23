/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const IS_AUTH_KEY = 'IS_AUTH';

export const initialState = {
  isAuth: !!window.localStorage.getItem(IS_AUTH_KEY),
};

const authSlice = createSlice({
  name: 'auth',
  initialState,

  reducers: {
    setAuth: (state) => {
      window.localStorage.setItem(IS_AUTH_KEY, '1');

      state.isAuth = true;
    },

    logout: (state) => {
      window.localStorage.removeItem(IS_AUTH_KEY);

      state.isAuth = false;
    },
  },
});

export default authSlice.reducer;

export const {
  logout,
  setAuth,
} = authSlice.actions;
