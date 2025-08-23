import tagTypes from 'services/api/tagTypes';

const addTeam = {
  query: (data: { groupId: number; player1Id: number; player2Id: number }) => ({
    url: `api/tournaments/groups/${data.groupId}/create-team`,
    method: 'post',
    body: data,
  }),

  invalidatesTags: [tagTypes.group],
};

export {
  addTeam,
};
