import Link from 'next/link';
import { createSearchParams } from '../../utils/createQueryParams';
import { SearchParams } from '../../types/types';

type Props = {
  searchParams: SearchParams;
};

export function Buttons({ searchParams }: Props) {
  const { page, search, theme } = searchParams;

  const createPrevPageUrl = () => {
    const newPage = (Number(page) - 1).toString();

    const query = {
      page: newPage || '1',
      search,
      theme,
    };

    return createSearchParams(query);
  };

  const createNextPageUrl = () => {
    const newPage = (Number(page) + 1).toString();

    const query = {
      page: newPage || '2',
      search,
      theme,
    };

    return createSearchParams(query);
  };

  const createButtonClass = (isDisabled: boolean) => {
    return `button ${isDisabled ? 'disabled' : ''}`;
  };

  return (
    <div className="left-buttons">
      <Link href={`/?${createPrevPageUrl()}`} className={createButtonClass(Number(page) === 1)}>
        prev
      </Link>

      <Link href={`/?${createNextPageUrl()}`} className={createButtonClass(false)}>
        next
      </Link>
    </div>
  );
}
