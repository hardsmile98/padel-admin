import tagTypes from 'services/api/tagTypes';

const addCategoryTeam = {
  query: (data: { categoryId: number; player1Id: number; player2Id: number }) => ({
    url: `api/tournaments/categories/${data.categoryId}/create-team`,
    method: 'post',
    body: data,
  }),

  invalidatesTags: [tagTypes.categoryTeams, tagTypes.group],
};

export {
  addCategoryTeam,
};
