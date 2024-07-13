import { useEffect, useRef, useState } from 'react';
import { useNavigateMethods } from './useNavigateMethods';

export function useSearchQuery() {
  const [searchQuery, setSearchQuery] = useState('');
  const { getSearchValue } = useNavigateMethods();

  function getDataFromLocalStorage() {
    return localStorage.getItem('lilo-value') || '';
  }

  const ref = useRef(searchQuery);

  useEffect(() => {
    ref.current = getSearchValue();
  }, [getSearchValue, searchQuery]);

  useEffect(() => {
    setSearchQuery(getDataFromLocalStorage());
    return () => {
      localStorage.setItem('lilo-value', ref.current);
    };
  }, []);

  return { searchQuery, setSearchQuery };
}
