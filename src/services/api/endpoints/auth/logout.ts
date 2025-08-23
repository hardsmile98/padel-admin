const logout = {
  query: () => ({
    url: 'api/auth/logout',
    method: 'post',
  }),
};

export {
  logout,
};
