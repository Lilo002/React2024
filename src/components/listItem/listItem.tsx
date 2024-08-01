import { ResponseItem, Pokemon } from '../../types/types';
import { useNavigateMethods } from '../../hooks/useNavigateMethods';
import { Checkbox } from './ui/checkbox';

import Link from 'next/link';

export function ListItem({ data }: { data: Pokemon | ResponseItem }) {
  const { createSearchParams, getPageValue } = useNavigateMethods();

  return (
    <li className="results-item">
      <Checkbox name={data.name} />
      <Link
        replace
        href={{ pathname: `/pokemon/${data.name}`, search: createSearchParams(getPageValue()) }}
        className="results-link"
        data-testid="result-item"
      >
        {data.name}
      </Link>
    </li>
  );
}
