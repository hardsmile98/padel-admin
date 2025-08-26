import tagTypes from 'services/api/tagTypes';

const deleteStage = {
  query: (data: {
    stageId: number;
  }) => ({
    url: `api/tournaments/stages/${data.stageId}/delete`,
    method: 'post',
  }),

  invalidatesTags: [tagTypes.tournament],
};

export {
  deleteStage,
};
