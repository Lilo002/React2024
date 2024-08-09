import { ResponseItem, Pokemon, SearchParams } from '../../types/types';
import { ListItem } from '../listItem/listItem';
import image from '../../../public/empty.png';
import Image from 'next/image';
import { getAllPokemon, getPokemonByName } from '../../utils/utils';
import { Suspense } from 'react';
import Loader from '../../app/loading';

type Props = {
  searchParams: SearchParams;
};
export default async function List({ searchParams }: Props) {
  const { page, search } = searchParams;
  let results: (Pokemon | ResponseItem)[] = [];

  try {
    if (search) {
      const pokemon = await getPokemonByName(search);
      results = pokemon ? [pokemon] : [];
    } else {
      results = await getAllPokemon(Number(page) || 1);
    }
  } catch (error) {
    console.error('Error fetching Pokemon:', error);
  }

  return (
    <ul className="results-list">
      <Suspense fallback={<Loader />}>
        {results && results.length > 0 ? (
          results.map((data: Pokemon | ResponseItem) => (
            <ListItem data={data} key={data.name} searchParams={searchParams} />
          ))
        ) : (
          <>
            <h2 className="results-empty">Oops, this Pokémon doesn't exist yet. Try searching for another one.</h2>
            <Image height={300} width={300} src={image.src} alt="empty" className="results-empty-img" />
          </>
        )}
      </Suspense>
    </ul>
  );
}
