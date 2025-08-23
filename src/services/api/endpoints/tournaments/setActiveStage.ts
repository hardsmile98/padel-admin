import tagTypes from 'services/api/tagTypes';

const setActiveStage = {
  query: ({ tournamentId, stageId }: { tournamentId: number, stageId: number }) => ({
    url: `api/tournaments/${tournamentId}/set-active-stage`,
    method: 'post',
    body: { stageId },
  }),

  invalidatesTags: [tagTypes.tournament],
};

export {
  setActiveStage,
};
