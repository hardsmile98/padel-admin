import tagTypes from 'services/api/tagTypes';

const addTournament = {
  query: (data: {
    name: string;
  }) => ({
    url: 'api/tournaments/create',
    method: 'post',
    body: data,
  }),

  invalidatesTags: [tagTypes.tournaments],
};

export {
  addTournament,
};
