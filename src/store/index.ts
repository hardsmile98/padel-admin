import {
  type TypedUseSelectorHook,
  useDispatch as useDispatchTyped,
  useSelector as useSelectorTyped,
} from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { publicApi } from 'services/api';
import auth from './slices/auth';
import { checkAuthMiddleware, errorLogger } from './middlewares';

export const store = configureStore({
  reducer: {
    [publicApi.reducerPath]: publicApi.reducer,
    auth,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware()
    .concat(
      publicApi.middleware,
      checkAuthMiddleware,
      errorLogger,
    ),
});

type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;

const useDispatch: () => AppDispatch = useDispatchTyped;
const useSelector: TypedUseSelectorHook<RootState> = useSelectorTyped;

export {
  useDispatch,
  useSelector,

  type RootState,
  type AppDispatch,
};
