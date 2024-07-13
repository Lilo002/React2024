import { NavLink } from 'react-router-dom';
import { ResponseItem, SearchItem } from '../../types';
import { useNavigateMethods } from '../../hooks/useNavigateMethods';

type ListItemProps = {
  results: SearchItem[] | ResponseItem[];
};

export function ListItem({ results }: ListItemProps) {
  const { createSearchParams } = useNavigateMethods();
  return (
    <ul className="results-list">
      {results.map((data) => (
        <li className="results-item" key={data.name}>
          <NavLink
            replace
            to={{ pathname: `/pokemon/${data.name}`, search: createSearchParams() }}
            className="results-link"
          >
            {data.name}
          </NavLink>
        </li>
      ))}
    </ul>
  );
}
