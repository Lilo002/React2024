import './_style.scss';
import { MouseEvent, useMemo, useRef } from 'react';
import { LIMIT } from '../../constant';
import { useNavigateMethods } from '../../hooks/useNavigateMethods';
import { Buttons } from '../buttons/buttons';
import { List } from '../list/list';
import { Loader } from '../loader/loader';
import { useGetAllPokemonQuery, useGetPokemonByNameQuery } from '../../store/api/api';
import { Flyout } from '../flyout/flyout';

export function ResultField() {
  const { navigateToMainPage, getPageValue, getSearchValue } = useNavigateMethods();

  const list = useRef(null);

  const page = useMemo(() => getPageValue(), [getPageValue]);
  const searchValue = useMemo(() => getSearchValue().trim().toLowerCase(), [getSearchValue]);
  const { data: allPokemon, isFetching: isAllLoading } = useGetAllPokemonQuery(page);
  const {
    data: searchedPokemon,
    isFetching: isSearchLoading,
    isError: isSearchError,
  } = useGetPokemonByNameQuery(searchValue, {
    skip: !searchValue,
  });

  const results = useMemo(() => {
    if (searchValue) {
      return isSearchError ? [] : searchedPokemon ? [searchedPokemon] : null;
    }
    return allPokemon ? allPokemon : null;
  }, [searchValue, searchedPokemon, allPokemon, isSearchError]);

  const isDataLoaded = !isAllLoading && !isSearchLoading;

  const returnToMainPage = (e: MouseEvent<HTMLElement>) => {
    if (e.target instanceof Node && e.target.contains(list.current)) {
      navigateToMainPage();
    }
  };

  const isPrevBtnDisabled = () => !isDataLoaded || !results || page === 1;

  const isNextBtnDisabled = () => !isDataLoaded || !results || !!(results && results.length < LIMIT);

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
