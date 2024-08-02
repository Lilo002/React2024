import { MouseEvent, useEffect, useMemo, useRef, useState } from 'react';
import { LIMIT } from '../../constant';
import { useNavigateMethods } from '../../hooks/useNavigateMethods';
import { Buttons } from '../buttons/buttons';
import { List } from '../list/list';
import { Loader } from '../loader/loader';
import { useGetAllPokemonQuery, useGetPokemonByNameQuery } from '../../store/api/api';
import { Flyout } from '../flyout/flyout';
import { useRouter } from 'next/router';

export default function ResultField() {
  const { navigateToMainPage, getSearchValue, getPageValue } = useNavigateMethods();
  const router = useRouter();
  const [isDataLoaded, setIsDataLoaded] = useState(true);
  const list = useRef(null);

  const pageValue = useMemo(() => getPageValue(), [getPageValue]);
  const searchValue = useMemo(() => getSearchValue().trim().toLowerCase(), [getSearchValue]);

  const { data: allPokemon } = useGetAllPokemonQuery(pageValue, { skip: !!searchValue });
  const { data: searchedPokemon, isError: isSearchError } = useGetPokemonByNameQuery(searchValue, {
    skip: !searchValue,
  });

  const results = useMemo(() => {
    if (searchValue) {
      return isSearchError ? [] : searchedPokemon ? [searchedPokemon] : null;
    }
    return allPokemon ? allPokemon : null;
  }, [searchValue, searchedPokemon, allPokemon, isSearchError]);

  const returnToMainPage = (e: MouseEvent<HTMLElement>) => {
    if (e.target instanceof Node && e.target.contains(list.current)) {
      navigateToMainPage();
    }
  };

  const isPrevBtnDisabled = () => !isDataLoaded || !results || pageValue === 1;

  const isNextBtnDisabled = () => !isDataLoaded || !results || !!(results && results.length < LIMIT);

  useEffect(() => {
    const handleStart = (url: string) => {
      const [, page] = url.split('?');
      const pageParams = new URLSearchParams(page);
      const newPage = pageParams.get('page');

      const pageChanged = pageValue !== +newPage;

      if (pageChanged) {
        setIsDataLoaded(false);
      }
    };

    router.events.on('routeChangeStart', handleStart);

    return () => {
      router.events.off('routeChangeStart', handleStart);
      setIsDataLoaded(true);
    };
  }, [router]);

  return (
    <div className="results" onClick={returnToMainPage}>
      <div className="results-container">
        {!isDataLoaded ? (
          <Loader />
        ) : (
          <div ref={list} className="results-catalog">
            <List results={results} />
          </div>
        )}
      </div>
      <Buttons isNextBtnDisabled={isNextBtnDisabled()} isPrevBtnDisabled={isPrevBtnDisabled()} />
      <Flyout />
    </div>
  );
}
