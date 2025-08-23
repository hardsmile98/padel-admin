import tagTypes from 'services/api/tagTypes';

const addMatch = {
  query: (data: {
    groupId: number;
    team1Id: number;
    team2Id: number;
    sets: string[];
    winnerId: number;
  }) => ({
    url: `api/tournaments/groups/${data.groupId}/create-match`,
    method: 'post',
    body: data,
  }),

  invalidatesTags: [tagTypes.group],
};

export {
  addMatch,
};
