import { NavLink } from 'react-router-dom';
import { ResponseItem, SearchItem } from '../../types';
import { useNavigateMethods } from '../../hooks/useNavigateMethods';

export function ListItem({ data }: { data: SearchItem | ResponseItem }) {
  const { createSearchParams, getPageValue } = useNavigateMethods();
  return (
    <li className="results-item">
      <NavLink
        replace
        to={{ pathname: `/pokemon/${data.name}`, search: createSearchParams(getPageValue()) }}
        className="results-link"
        data-testid="result-item"
      >
        {data.name}
      </NavLink>
    </li>
  );
}
