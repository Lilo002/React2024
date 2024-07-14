import { useCallback, useEffect, useState } from 'react';
import { SearchItem } from '../../types';

import './_style.scss';
import { URL } from '../../constant';
import { Link, useParams } from 'react-router-dom';
import { useNavigateMethods } from '../../hooks/useNavigateMethods';
import { Card } from '../card/card';
import { Loader } from '../loader/loader';

export function Details() {
  const { id } = useParams();
  const [isLoaded, setIsLoaded] = useState(false);
  const [data, setData] = useState<null | SearchItem>(null);
  const { createSearchParams, getPageValue, navigateToMainPage } = useNavigateMethods();

  const fetchSearchedData = async (value: string): Promise<SearchItem> => {
    const response = await fetch(`${URL}pokemon/${value.trim().toLowerCase()}/`);
    const data = await response.json();

    return data;
  };

  const setFetchedData = useCallback(async () => {
    try {
      if (id) {
        const data = await fetchSearchedData(id);
        setData(data);
      }
    } catch (error) {
      setData(null);
      navigateToMainPage();
    }
    setIsLoaded(true);
  }, [id]);

  useEffect(() => {
    setIsLoaded(false);
    setFetchedData();
  }, [setFetchedData]);

  return (
    <div className="right-panel" data-testid="details">
      {!isLoaded ? <Loader data-testid="detailed-loader" /> : data && <Card data={data} />}
      <Link
        to={{ pathname: '/', search: createSearchParams(getPageValue()) }}
        className="card-close"
        data-testid="card-close"
      ></Link>
    </div>
  );
}
