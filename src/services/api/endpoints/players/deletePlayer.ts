import tagTypes from 'services/api/tagTypes';

const deletePlayer = {
  query: (data: {
    id: number
  }) => ({
    url: `api/players/${data.id}/delete`,
    method: 'post',
  }),

  invalidatesTags: [tagTypes.players],
};

export {
  deletePlayer,
};
