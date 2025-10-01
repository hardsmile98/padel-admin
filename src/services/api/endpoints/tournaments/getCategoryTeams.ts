import tagTypes from 'services/api/tagTypes';

export type GetCategoryTeamsResponse = {
  teams: {
    id: number;
    player1Id: number;
    player2Id: number;
    createdAt: string;
    player1: {
      id: number;
      firstName: string;
      lastName: string;
    };
    player2: {
      id: number;
      firstName: string;
      lastName: string;
    };
  }[];
};

const transformResponse = (response: GetCategoryTeamsResponse) => (response);

const getCategoryTeams = {
  query: (categoryId: number) => ({
    url: `api/tournaments/categories/${categoryId}/teams`,
    method: 'get',
  }),

  providesTags: [tagTypes.categoryTeams],

  transformResponse,
};

type CategoryTeams = ReturnType<typeof transformResponse>;

export {
  type CategoryTeams,
  getCategoryTeams,
};
