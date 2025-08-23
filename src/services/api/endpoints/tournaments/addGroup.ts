import tagTypes from 'services/api/tagTypes';

const addGroup = {
  query: (data: {
    tournamentId: number;
    stageId: number;
    categoryId: number | null;
    name: string;
  }) => ({
    url: `api/tournaments/${data.tournamentId}/${data.stageId}/${data.categoryId}/create-group`,
    method: 'post',
    body: data,
  }),

  invalidatesTags: [tagTypes.tournament],
};

export {
  addGroup,
};
