import tagTypes from 'services/api/tagTypes';

export type GetGroupResponse = {
  group: {
    id: number;
    tournamentId: number;
    stageId: number;
    categoryId: number | null;
    name: string;
    createdAt: string;
  };
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
  stage: {
    id: number;
    tournamentId: number;
    name: string;
    order: number;
    isFinal: boolean;
    createdAt: string;
  };
  matches: {
    id: number;
    groupId: number;
    team1Id: number;
    team2Id: number;
    sets: string[];
    winnerId: number | null;
    createdAt: string;
  }[];
};

const transformResponse = (response: GetGroupResponse) => (response);

const getGroup = {
  query: (groupId: number) => ({
    url: `api/tournaments/groups/${groupId}`,
    method: 'get',
  }),

  providesTags: [tagTypes.group],

  transformResponse,
};

type Group = ReturnType<typeof transformResponse>;

export {
  type Group,
  getGroup,
};
