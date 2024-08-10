import { ResponseItem, Pokemon } from '../../types/types';
import { ListItem } from '../listItem/listItem';
import image from '../../../public/empty.png';
import Image from 'next/image';

type ListItemProps = {
  results: Pokemon[] | ResponseItem[] | null;
};

export function List({ results }: ListItemProps) {
  return (
    <ul className="results-list">
      {results && results.length > 0 ? (
        results.map((data) => <ListItem data={data} key={data.name} />)
      ) : (
        <>
          <h2 className="results-empty">Oops, this Pokémon doesn't exist yet. Try searching for another one.</h2>
          <Image height={300} width={300} src={image.src} alt="empty" className="results-empty-img" />
        </>
      )}
    </ul>
  );
}
