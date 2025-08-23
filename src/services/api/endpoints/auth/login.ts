const login = {
  query: (data: {
    login: string
    password: string
  }) => ({
    url: 'api/auth/login',
    method: 'post',
    body: data,
  }),
};

export {
  login,
};
