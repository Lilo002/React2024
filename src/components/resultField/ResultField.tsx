import { Component } from 'react';
import { SearchItem } from '../../types';
import { Card } from '../card/Card';

import './_style.scss';

type ResultFieldProps = {
  results: SearchItem[];
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
    const { results } = this.props;
    return (
      <div className="results">
        {results.length > 0 ? (
          <div className="results-catalog">
            {results.map((data) => (
              <Card data={data} key={data.id} />
            ))}
          </div>
        ) : (
          <h2 className="result-empty">There is no data</h2>
        )}
      </div>
    );
  }
}
