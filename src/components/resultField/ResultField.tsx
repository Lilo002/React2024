import { ResponseItem, SearchItem } from '../../types';

import image from '../../assets/empty.png';

import './_style.scss';
import { MouseEvent, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { LIMIT, OFFSET, URL } from '../../constant';
import { useNavigateMethods } from '../../hooks/useNavigateMethods';
import { Buttons } from '../buttons/buttons';
import { ListItem } from '../listItem/listItem';

export function ResultField() {
  const { navigateToMainPage, getPageValue, getSearchValue } = useNavigateMethods();

  const [results, setResults] = useState<null | SearchItem[] | ResponseItem[]>(null);
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  const list = useRef(null);

  const page = useMemo(() => getPageValue(), [getPageValue]);

  const fetchAllData = useCallback(async (): Promise<ResponseItem[]> => {
    const response = await fetch(`${URL}pokemon?limit=${LIMIT}&offset=${(page - 1) * OFFSET}`);
    const data = await response.json();
    const results = data.results;
    return results;
  }, [page]);

  const fetchSearchedData = async (value: string): Promise<SearchItem[]> => {
    const response = await fetch(`${URL}pokemon/${value.trim().toLowerCase()}/`);
    const data = await response.json();
    return [data];
  };

  const fetchData = useCallback(
    async (value: string) => {
      try {
        const data = value.trim() ? await fetchSearchedData(value) : await fetchAllData();
        if (data) setResults(data);
        setIsDataLoaded(true);
      } catch (error) {
        setResults(null);
        setIsDataLoaded(true);
        console.error(error);
      }
    },
    [fetchAllData],
  );

  const returnToMainPage = (e: MouseEvent<HTMLElement>) => {
    if (e.target instanceof Node && e.target.contains(list.current)) {
      navigateToMainPage();
    }
  };

  const isPrevBtnDisabled = () => !isDataLoaded || !results || page === 1;

  const isNextBtnDisabled = () => !isDataLoaded || !results || !!(results && results.length < LIMIT);

  useEffect(() => {
    setIsDataLoaded(false);
    fetchData(getSearchValue());
  }, [fetchData, getSearchValue]);

  return (
    <div className="results" onClick={returnToMainPage}>
      <div className="results-container">
        {!isDataLoaded ? (
          <div className="loader-container">
            <span className="results-loader"></span>
          </div>
        ) : results ? (
          <div ref={list} className="results-catalog">
            <ListItem results={results} />
          </div>
        ) : (
          <>
            <h2 className="results-empty">Oops, this Pokémon doesn't exist yet. Try searching for another one.</h2>
            <img src={image} alt="empty" className="results-empty-img" />
          </>
        )}
      </div>
      <Buttons isNextBtnDisabled={isNextBtnDisabled()} isPrevBtnDisabled={isPrevBtnDisabled()} />
    </div>
  );
}
