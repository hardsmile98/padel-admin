import tagTypes from 'services/api/tagTypes';

const deleteCategory = {
  query: (data: {
    categoryId: number;
  }) => ({
    url: `api/tournaments/categories/${data.categoryId}/delete`,
    method: 'post',
  }),

  invalidatesTags: [tagTypes.tournament],
};

export {
  deleteCategory,
};
