export const resultsMock = [
  {
    name: 'metapod',
    url: 'https://pokeapi.co/api/v2/pokemon/11/',
  },
  {
    name: 'pikachu',
    url: 'https://pokeapi.co/api/v2/pokemon/11/',
  },
];

export const detailedDataMock = {
  id: 1,
  name: 'pikachu',
  sprites: {
    other: {
      'official-artwork': {
        front_default: 'http://example.com/pikachu.png',
      },
    },
  },
  types: [{ type: { name: 'electric' } }],
  weight: 60,
  height: 4,
};
