import { isRejectedWithValue } from '@reduxjs/toolkit';
import type { MiddlewareAPI } from 'redux';
import { logout } from 'store/slices/auth';
import { publicApiUtil } from 'services';

function checkAuthMiddleware({ dispatch }: MiddlewareAPI) {
  return (next: any) => (action: any) => {
    if (isRejectedWithValue(action)) {
      if (action.payload.status === 401) {
        dispatch(logout());

        dispatch(publicApiUtil.resetApiState());
      }
    }

    return next(action);
  };
}

export { checkAuthMiddleware };
