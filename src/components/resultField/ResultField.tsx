import { Component } from 'react';
import { SearchItem } from '../../types';
import { Card } from '../card/Card';

import image from '../../assets/empty.png';

import './_style.scss';

type ResultFieldProps = {
  results: SearchItem[];
  isLoaded: boolean;
};

interface ResultFieldState {
  data: SearchItem[];
}

export class ResultField extends Component<ResultFieldProps, ResultFieldState> {
  constructor(props: ResultFieldProps) {
    super(props);
    this.state = {
      data: props.results,
    };
  }

  render() {
    const { results, isLoaded } = this.props;
    return (
      <div className="results">
        {!isLoaded && (
          <div className="loader-container">
            <span className="results-loader"></span>
          </div>
        )}
        {isLoaded && results.length > 0 && (
          <div className="results-catalog">
            {results.map((data) => (
              <div className="results-item" key={data.id}>
                <Card data={data} />
              </div>
            ))}
          </div>
        )}
        {isLoaded && results.length === 0 && (
          <>
            <h2 className="results-empty">Oops, this Pokémon doesn't exist yet. Try searching for another one.</h2>
            <img src={image} alt="empty" className="results-empty-img" />
          </>
        )}
      </div>
    );
  }
}
