import { NavLink } from 'react-router-dom';
import { ResponseItem, Pokemon } from '../../types';
import { useNavigateMethods } from '../../hooks/useNavigateMethods';
import { Checkbox } from './ui/checkbox';

import './listItem.scss';

export function ListItem({ data }: { data: Pokemon | ResponseItem }) {
  const { createSearchParams, getPageValue } = useNavigateMethods();

  return (
    <li className="results-item">
      <Checkbox name={data.name} />
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
