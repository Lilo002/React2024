import { NavLink } from 'react-router-dom';
import { ResponseItem, SearchItem } from '../../types';
import { useNavigateMethods } from '../../hooks/useNavigateMethods';

export function ListItem({ data }: { data: SearchItem | ResponseItem }) {
  const { createSearchParams } = useNavigateMethods();
  console.log(data);
  return (
    <li className="results-item">
      <NavLink
        replace
        to={{ pathname: `/pokemon/${data.name}`, search: createSearchParams() }}
        className="results-link"
      >
        {data.name}
      </NavLink>
    </li>
  );
}
