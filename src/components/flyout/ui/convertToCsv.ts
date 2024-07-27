import { Pokemon } from '../../../types';

export const convertToCSV = (data: Pokemon[]): string => {
  const headers = ['Name', 'Image URL', 'Types', 'Weight', 'Height'];
  const rows = data.map((pokemon) => [
    pokemon.name,
    pokemon.sprites.other['official-artwork'].front_default,
    pokemon.types.map((t) => t.type.name).join(' '),
    pokemon.weight.toString(),
    pokemon.height.toString(),
  ]);

  const сontent = [headers.join(','), ...rows.map((row) => row.join(','))].join('\n');

  return 'data:text/csv;charset=utf-8,' + encodeURIComponent(сontent);
};
