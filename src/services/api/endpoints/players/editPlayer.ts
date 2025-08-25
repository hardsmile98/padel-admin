import tagTypes from 'services/api/tagTypes';

const editPlayer = {
  query: (data: {
    id: number;
    slug: string;
    firstName: string;
    lastName: string;
    raiting: number;
    photoUrl: string;
    avatarUrl: string;
    description: string[];
  }) => ({
    url: `api/players/${data.id}/update`,
    method: 'post',
    body: data,
  }),

  invalidatesTags: [tagTypes.players],
};

export {
  editPlayer,
};
