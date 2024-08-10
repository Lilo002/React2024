import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Pokemon, ResponseItem } from '../../types/types';
import { LIMIT, OFFSET, URL } from '../../constant';
import { HYDRATE } from 'next-redux-wrapper';
import { Action, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

function isHydrateAction(action: Action): action is PayloadAction<RootState> {
  return action.type === HYDRATE;
}

export const pokemonApi = createApi({
  reducerPath: 'pokemonApi',
  baseQuery: fetchBaseQuery({ baseUrl: URL }),
  extractRehydrationInfo(action, { reducerPath }) {
    if (isHydrateAction(action)) {
      return action.payload[reducerPath];
    }
  },
  endpoints: (builder) => ({
    getAllPokemon: builder.query<ResponseItem[], number>({
      query: (page) => `pokemon?limit=${LIMIT}&offset=${(page - 1) * OFFSET}`,
      transformResponse: (response: { results: ResponseItem[] }) => response.results,
    }),
    getPokemonByName: builder.query<Pokemon, string>({
      query: (name) => `pokemon/${name}`,
    }),
  }),
});

export const {
  useGetPokemonByNameQuery,
  useGetAllPokemonQuery,
  util: { getRunningQueriesThunk },
} = pokemonApi;
export const { getPokemonByName, getAllPokemon } = pokemonApi.endpoints;
