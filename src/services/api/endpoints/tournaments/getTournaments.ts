import tagTypes from 'services/api/tagTypes';

export type GetTournamentsResponse = {
  id: number;
  name: string;
  isActive: boolean;
  createdAt: string;
}[];

const transformResponse = (response: GetTournamentsResponse) => (response);

const getTournaments = {
  query: () => ({
    url: 'api/tournaments',
    method: 'get',
  }),

  providesTags: [tagTypes.tournaments],

  transformResponse,
};

type Tournaments = ReturnType<typeof transformResponse>;

export {
  type Tournaments,
  getTournaments,
};
