import { useLayoutEffect, useState } from 'react';
import { useNavigateMethods } from './useNavigateMethods';

export function useSearchQuery() {
  const { getSearchValue } = useNavigateMethods();
  const [searchQuery, setSearchQuery] = useState(getDataFromLocalStorage());

  function getDataFromLocalStorage() {
    const search = getSearchValue();
    if (search) return search;
    return localStorage.getItem('lilo-value') || '';
  }

  useLayoutEffect(() => {
    localStorage.setItem('lilo-value', searchQuery);
  }, [searchQuery]);

  return { searchQuery, setSearchQuery };
}
