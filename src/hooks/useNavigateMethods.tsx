import { useCallback } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';

export function useNavigateMethods() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const location = useLocation();

  const createSearchParams = (page: number = 1) => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set('page', page.toString());
    return newSearchParams.toString();
  };

  const navigateToMainPage = () => {
    if (location.pathname !== '/') navigate({ pathname: '/', search: createSearchParams() });
  };

  const getPageValue = useCallback(() => Number(searchParams.get('page') || 1), [searchParams]);

  const getSearchValue = useCallback(() => searchParams.get('search') || '', [searchParams]);

  return {
    navigateToMainPage,
    getPageValue,
    createSearchParams,
    getSearchValue,
  };
}
