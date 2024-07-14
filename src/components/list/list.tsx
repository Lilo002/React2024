import { ResponseItem, SearchItem } from '../../types';
import { ListItem } from '../listItem/listItem';
import image from '../../assets/empty.png';

type ListItemProps = {
  results: SearchItem[] | ResponseItem[] | null;
};

export function List({ results }: ListItemProps) {
  return (
    <ul className="results-list">
      {results && results.length > 0 ? (
        results.map((data) => <ListItem data={data} key={data.name} />)
      ) : (
        <>
          <h2 className="results-empty">Oops, this Pokémon doesn't exist yet. Try searching for another one.</h2>
          <img src={image} alt="empty" className="results-empty-img" />
        </>
      )}
    </ul>
  );
}
