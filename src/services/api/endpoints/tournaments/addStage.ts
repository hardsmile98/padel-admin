import tagTypes from 'services/api/tagTypes';

const addStage = {
  query: (data: {
    tournamentId: number;
    isFinal: boolean;
    name: string;
    order: number;
  }) => ({
    url: `api/tournaments/${data.tournamentId}/create-stage`,
    method: 'post',
    body: data,
  }),

  invalidatesTags: [tagTypes.tournament],
};

export {
  addStage,
};
