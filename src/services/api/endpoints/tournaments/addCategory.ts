import tagTypes from 'services/api/tagTypes';

const addCategory = {
  query: (data: {
    tournamentId: number;
    stageId: number;
    parentCategoryId: number | null;
    name: string;
    order: number;
  }) => ({
    url: `api/tournaments/${data.tournamentId}/${data.stageId}/create-category`,
    method: 'post',
    body: data,
  }),

  invalidatesTags: [tagTypes.tournament],
};

export {
  addCategory,
};
