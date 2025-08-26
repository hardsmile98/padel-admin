import tagTypes from 'services/api/tagTypes';

const deleteGroup = {
  query: (data: {
    groupId: number;
  }) => ({
    url: `api/tournaments/groups/${data.groupId}/delete`,
    method: 'post',
  }),

  invalidatesTags: [tagTypes.tournament],
};

export {
  deleteGroup,
};
