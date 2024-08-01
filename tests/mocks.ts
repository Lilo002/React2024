import { http, delay, HttpResponse } from 'msw';
import { ResponseItem } from '../src/types/types';
import { UseGetPokemonByNameQueryResult, UseGetAllPokemonQueryResult } from './types';

export const resultsMock: ResponseItem[] = [
  {
    name: 'bulbasaur',
    url: 'https://pokeapi.co/api/v2/pokemon/1/',
  },
  {
    name: 'ivysaur',
    url: 'https://pokeapi.co/api/v2/pokemon/11/',
  },
];

export const detailedDataMock = {
  id: 1,
  name: 'bulbasaur',
  sprites: {
    other: {
      ['official-artwork']: {
        front_default: 'http://example.com/pikachu.png',
      },
    },
  },
  types: [{ type: { name: 'grass' } }],
  weight: 69,
  height: 7,
};

export const mockQueryResult: Partial<UseGetPokemonByNameQueryResult> = {
  data: detailedDataMock,
  isFetching: true,
  isError: false,
};

export const mockQueryAll: Partial<UseGetAllPokemonQueryResult> = {
  data: resultsMock,
  isFetching: true,
  isError: false,
};

export const handlers = [
  http.get('https://pokeapi.co/api/v2/pokemon?limit=15&offset=0', async () => {
    await delay(400);
    return HttpResponse.json({ results: resultsMock });
  }),

  http.get('https://pokeapi.co/api/v2/pokemon/:name', async () => {
    await delay(400);
    return HttpResponse.json(detailedDataMock);
  }),
];
