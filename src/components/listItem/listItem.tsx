import { ResponseItem, Pokemon, SearchParams } from '../../types/types';
import { createSearchParams } from '../../utils/createQueryParams';
import { getPokemonByName } from '../../utils/utils';
import { Checkbox } from './ui/checkbox';

import Link from 'next/link';

export const ListItem = async ({
  data,
  searchParams,
}: {
  data: Pokemon | ResponseItem;
  searchParams: SearchParams;
}) => {
  const pokemon = await getPokemonByName(data.name);

  return (
    <li className="results-item">
      <Checkbox data={pokemon} key={data.name} />
      <Link
        href={`/pokemon/${pokemon.name}?${createSearchParams(searchParams)}`}
        className="results-link"
        data-testid="result-item"
      >
        {data.name}
      </Link>
    </li>
  );
};
