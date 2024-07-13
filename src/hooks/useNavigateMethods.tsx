import { useCallback } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';

export function useNavigateMethods() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();

  const createSearchParams = () => {
    const newSearchParams = new URLSearchParams(searchParams);
    return newSearchParams.toString();
  };

  const updateSearchParams = (page: number) => {
    setSearchParams((prev) => {
      prev.set('page', page.toString());
      return prev;
    });
  };

  const navigateToMainPage = () => {
    if (location.pathname !== '/') navigate({ pathname: '/', search: createSearchParams() });
  };

  const getPageValue = useCallback(() => Number(searchParams.get('page') || 1), [searchParams]);

  const getSearchValue = useCallback(() => searchParams.get('search') || '', [searchParams]);

  const increaseOffset = () => {
    const newOffset = getPageValue() + 1;
    updateSearchParams(newOffset);
    navigateToMainPage();
  };

  const decreaseOffset = () => {
    const newOffset = getPageValue() - 1;
    updateSearchParams(newOffset);
    navigateToMainPage();
  };

  return {
    increaseOffset,
    decreaseOffset,
    navigateToMainPage,
    getPageValue,
    createSearchParams,
    getSearchValue,
  };
}
