import tagTypes from 'services/api/tagTypes';

const editMatch = {
  query: (data: {
    team1Id: number;
    team2Id: number;
    sets: string[];
    winnerId: number;
    matchId: number;
  }) => ({
    url: 'api/tournaments/matches/update',
    method: 'post',
    body: data,
  }),

  invalidatesTags: [tagTypes.group],
};

export {
  editMatch,
};
