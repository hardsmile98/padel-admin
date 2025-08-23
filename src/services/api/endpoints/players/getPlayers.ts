import tagTypes from 'services/api/tagTypes';

export type GetPlayersResponse = {
  id: number;
  slug: string;
  firstName: string;
  lastName: string;
  raiting: number;
  avatarUrl: string;
  photoUrl: string;
  description: string[];
}[];

const transformResponse = (response: GetPlayersResponse) => (response);

const getPlayers = {
  query: () => ({
    url: 'api/players',
    method: 'get',
  }),

  providesTags: [tagTypes.players],

  transformResponse,
};

type Players = ReturnType<typeof transformResponse>;

export {
  type Players,
  getPlayers,
};
