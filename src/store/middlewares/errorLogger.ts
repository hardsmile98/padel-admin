import { isRejectedWithValue } from '@reduxjs/toolkit';
import { enqueueSnackbar } from 'notistack';
import { errorWithMessage } from 'utils';

function errorLogger() {
  return (next: any) => (action: any) => {
    if (isRejectedWithValue(action)) {
      if (action.payload.status !== 401) {
        const error = action.payload;

        const errorMessage = errorWithMessage(error) || 'Unknown error';

        enqueueSnackbar(errorMessage, { variant: 'error' });
      }
    }

    return next(action);
  };
}

export { errorLogger };
