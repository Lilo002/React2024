import { ResponseItem, SearchItem } from '../../types';
import { Card } from '../card/Card';

import image from '../../assets/empty.png';

import './_style.scss';

type ResultFieldProps = {
  results: SearchItem | null | ResponseItem[];
  isDataLoaded: boolean;
};

export function ResultField({ results, isDataLoaded }: ResultFieldProps) {
  if (!isDataLoaded) {
    return (
      <div className="results">
        {!isDataLoaded && (
          <div className="loader-container">
            <span className="results-loader"></span>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="results">
      {Array.isArray(results) ? (
        <div className="results-catalog">
          {results.map((data) => (
            <div className="results-item" key={data.name}>
              <Card nameValue={data.name} />
            </div>
          ))}
        </div>
      ) : results ? (
        <div className="results-item" key={results.id}>
          <Card nameValue={results.name} />
        </div>
      ) : (
        <>
          <h2 className="results-empty">Oops, this Pokémon doesn't exist yet. Try searching for another one.</h2>
          <img src={image} alt="empty" className="results-empty-img" />
        </>
      )}
    </div>
  );
}
