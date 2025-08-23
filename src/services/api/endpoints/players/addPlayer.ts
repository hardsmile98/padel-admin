import tagTypes from 'services/api/tagTypes';

const addPlayer = {
  query: (data: {
    slug: string;
    firstName: string;
    lastName: string;
    raiting: number;
    photoUrl: string;
    avatarUrl: string;
    description: string[];
  }) => ({
    url: 'api/players/create',
    method: 'post',
    body: data,
  }),

  invalidatesTags: [tagTypes.players],
};

export {
  addPlayer,
};
