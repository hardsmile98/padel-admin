const errorWithMessage = (error: any): string => {
  if (!error) {
    return '';
  }

  const errorMessage = error.data?.message;

  if (errorMessage) {
    return Array.isArray(errorMessage) ? errorMessage.join('; ') : errorMessage;
  }

  return '';
};

export { errorWithMessage };
