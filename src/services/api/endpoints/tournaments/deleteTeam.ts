import tagTypes from 'services/api/tagTypes';

const deleteTeam = {
  query: (data: {
    teamId: number;
  }) => ({
    url: `api/tournaments/teams/${data.teamId}/delete`,
    method: 'post',
  }),

  invalidatesTags: [tagTypes.group],
};

export {
  deleteTeam,
};
