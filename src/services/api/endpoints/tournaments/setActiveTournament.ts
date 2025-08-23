import tagTypes from 'services/api/tagTypes';

const setActiveTournament = {
  query: (id: number) => ({
    url: `api/tournaments/${id}/set-active`,
    method: 'post',
  }),

  invalidatesTags: [tagTypes.tournaments, tagTypes.tournament],
};

export {
  setActiveTournament,
};
