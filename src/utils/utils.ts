import { LIMIT, OFFSET, URL } from '../constant';
import { Pokemon, ResponseItem } from '../types/types';

export const getAllPokemon = async (page: number): Promise<ResponseItem[]> => {
  const response = await fetch(`${URL}pokemon?limit=${LIMIT}&offset=${(page - 1) * OFFSET}`);
  const data = await response.json();

  return data.results;
};

export const getPokemonByName = async (name: string | undefined): Promise<Pokemon> => {
  const response = await fetch(`${URL}pokemon/${name?.toLocaleLowerCase()}`);
  return await response.json();
};
