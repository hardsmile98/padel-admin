import tagTypes from 'services/api/tagTypes';

export type GetTournamentResponse = {
  tournament: {
    id: number;
    name: string;
    isActive: boolean;
    createdAt: string;
    currentStageId: number | null;
  };
  stages: {
    id: number;
    tournamentId: number;
    name: string;
    order: number;
    isFinal: boolean;
    createdAt: string;
  }[];
  categories: {
    id: number;
    tournamentId: number;
    stageId: number;
    parentCategoryId: number | null;
    name: string;
    order: number;
    createdAt: string;
  }[];
  groups: {
    id: number;
    tournamentId: number;
    stageId: number;
    categoryId: number | null;
    name: string;
    createdAt: string;
  }[];
};

const transformResponse = (response: GetTournamentResponse) => (response);

const getTournament = {
  query: (id: number) => ({
    url: `api/tournaments/${id}`,
    method: 'get',
  }),

  providesTags: [tagTypes.tournament],

  transformResponse,
};

type Tournament = ReturnType<typeof transformResponse>;

export {
  type Tournament,
  getTournament,
};
