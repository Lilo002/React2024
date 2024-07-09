import { useCallback, useEffect, useState } from 'react';
import { SearchItem } from '../../types';

import './_style.scss';
import { URL } from '../../constant';

export function Card({ nameValue }: { nameValue: string }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [data, setData] = useState<null | SearchItem>(null);

  const fetchSearchedData = async (value: string): Promise<SearchItem> => {
    const response = await fetch(`${URL}pokemon/${value.trim().toLowerCase()}/`);
    const data = await response.json();

    return data;
  };

  const setFetchedData = useCallback(async () => {
    try {
      const data = await fetchSearchedData(nameValue);
      setData(data);
    } catch (error) {
      console.log(error);
      setData(null);
    }
  }, [nameValue]);

  useEffect(() => {
    setFetchedData();
  }, [setFetchedData]);

  const handleImageLoad = () => {
    setIsLoaded(true);
  };

  if (!data) {
    return (
      <div className="card">
        <div className="loader-container">
          <div className="card-loader"></div>
        </div>
      </div>
    );
  }

  const {
    name,
    sprites: {
      other: {
        ['official-artwork']: { front_default },
      },
    },
    types,
    weight,
    height,
  } = data;

  return (
    <div className="card">
      <div className="card-img-container">
        {!isLoaded && (
          <div className="loader-container">
            <div className="card-loader"></div>
          </div>
        )}
        <img
          className={`card-img ${isLoaded ? 'loaded' : ''}`}
          src={front_default}
          alt={name}
          onLoad={handleImageLoad}
        />
      </div>
      <h2 className="card-name">{name}</h2>
      <div className="card-bottom">
        <div className="card-left">
          {types.map(({ type: { name } }, i) => (
            <span className={`card-description ${name}`} key={i}>
              {name}
            </span>
          ))}
        </div>
        <div className="card-right">
          <span>Weight: {weight / 10} kg</span>
          <span>Height: {height / 10} m</span>
        </div>
      </div>
    </div>
  );
}
