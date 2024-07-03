import { Component } from 'react';
import { SearchItem } from '../../types';
import { Card } from '../card/Card';

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
    return (
      <div className="results-section">
        <h2>Results</h2>
        {this.props.results.map((data) => (
          <Card data={data} key={data.id} />
        ))}
      </div>
    );
  }
}
