import {
  createApi,
  fetchBaseQuery,
} from '@reduxjs/toolkit/query/react';
import { envs } from 'constants/index';
import tagTypes from './tagTypes';
import * as endpoints from './endpoints';

export const publicApi = createApi({
  reducerPath: 'publicApi',
  baseQuery: fetchBaseQuery({
    baseUrl: envs.apiUrl,
    credentials: 'include',
  }),

  endpoints: (builder) => ({
    login: builder.mutation(endpoints.login),
    logout: builder.mutation(endpoints.logout),
    getPlayers: builder.query(endpoints.getPlayers),
    deletePlayer: builder.mutation(endpoints.deletePlayer),
    addPlayer: builder.mutation(endpoints.addPlayer),
    addTournament: builder.mutation(endpoints.addTournament),
    getTournaments: builder.query(endpoints.getTournaments),
    getTournament: builder.query(endpoints.getTournament),
    setActiveTournament: builder.mutation(endpoints.setActiveTournament),
    addStage: builder.mutation(endpoints.addStage),
    setActiveStage: builder.mutation(endpoints.setActiveStage),
    addCategory: builder.mutation(endpoints.addCategory),
    addGroup: builder.mutation(endpoints.addGroup),
    getGroup: builder.query(endpoints.getGroup),
    addTeam: builder.mutation(endpoints.addTeam),
    deleteTeam: builder.mutation(endpoints.deleteTeam),
    addMatch: builder.mutation(endpoints.addMatch),
    deleteMatch: builder.mutation(endpoints.deleteMatch),
    editMatch: builder.mutation(endpoints.editMatch),
    editPlayer: builder.mutation(endpoints.editPlayer),
    deleteGroup: builder.mutation(endpoints.deleteGroup),
    deleteCategory: builder.mutation(endpoints.deleteCategory),
    deleteStage: builder.mutation(endpoints.deleteStage),
    getCategoryTeams: builder.query(endpoints.getCategoryTeams),
    addCategoryTeam: builder.mutation(endpoints.addCategoryTeam),
  }),

  tagTypes: Object.values(tagTypes),
});

export const {
  util: publicApiUtil,

  useLoginMutation,
  useLogoutMutation,
  useGetPlayersQuery,
  useDeletePlayerMutation,
  useAddPlayerMutation,
  useAddTournamentMutation,
  useGetTournamentsQuery,
  useGetTournamentQuery,
  useSetActiveTournamentMutation,
  useAddStageMutation,
  useSetActiveStageMutation,
  useAddCategoryMutation,
  useAddGroupMutation,
  useGetGroupQuery,
  useAddTeamMutation,
  useDeleteTeamMutation,
  useAddMatchMutation,
  useDeleteMatchMutation,
  useEditMatchMutation,
  useEditPlayerMutation,
  useDeleteGroupMutation,
  useDeleteCategoryMutation,
  useDeleteStageMutation,
  useGetCategoryTeamsQuery,
  useAddCategoryTeamMutation,
} = publicApi;

export * from './endpoints';
