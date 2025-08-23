import tagTypes from 'services/api/tagTypes';

const deleteMatch = {
  query: (data: {
    matchId: number;
  }) => ({
    url: `api/tournaments/matches/${data.matchId}/delete`,
    method: 'post',
  }),

  invalidatesTags: [tagTypes.group],
};

export {
  deleteMatch,
};
