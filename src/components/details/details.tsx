import { useCallback, useEffect, useState } from 'react';
import { SearchItem } from '../../types';

import './_style.scss';
import { URL } from '../../constant';
import { useParams } from 'react-router-dom';
import { useNavigateMethods } from '../../hooks/useNavigateMethods';
import { Card } from '../card/card';

export function Details() {
  const { id } = useParams();
  const [isLoaded, setIsLoaded] = useState(false);
  const [data, setData] = useState<null | SearchItem>(null);
  const { navigateToMainPage } = useNavigateMethods();

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
      console.log(error);
      setData(null);
    }
    setIsLoaded(true);
  }, [id]);

  useEffect(() => {
    setIsLoaded(false);
    setFetchedData();
  }, [setFetchedData]);

  if (!data) return;

  return (
    <div className="right-panel">
      {!isLoaded ? (
        <div className="loader-container">
          <div className="card-loader"></div>
        </div>
      ) : (
        <Card data={data} />
      )}
      <button className="card-close" onClick={navigateToMainPage}></button>
    </div>
  );
}
