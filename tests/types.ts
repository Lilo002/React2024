import { pokemonApi } from '../src/store/api/api';

export type UseGetPokemonByNameQueryResult = ReturnType<typeof pokemonApi.useGetPokemonByNameQuery>;
export type UseGetAllPokemonQueryResult = ReturnType<typeof pokemonApi.useGetAllPokemonQuery>;
