import { useRouter } from 'next/router';
import { useCallback } from 'react';

export function useNavigateMethods() {
  const router = useRouter();

  const createSearchParams = (page: number = 1) => {
    const currentQuery = { ...router.query };

    delete currentQuery.id;

    if (page) currentQuery.page = page.toString();

    return new URLSearchParams(currentQuery as Record<string, string>).toString();
  };

  const navigateToMainPage = () => {
    if (location.pathname !== '/') {
      router.push({
        pathname: '/',
        query: { page: getPageValue() },
      });
    }
  };

  const getPageValue = useCallback(() => {
    const { page } = router.query;
    return Number(page) || 1;
  }, [router.query.page]);

  const getSearchValue = useCallback(() => {
    const { search } = router.query;
    return search?.toString() || '';
  }, [router.query.search]);

  return {
    navigateToMainPage,
    getPageValue,
    createSearchParams,
    getSearchValue,
  };
}
