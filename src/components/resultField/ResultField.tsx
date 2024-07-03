import { Component } from 'react';

type Result = {
  name: string;
  description: string;
};

type ResultFieldProps = {
  results: Result[];
};

export class ResultField extends Component<ResultFieldProps> {
  constructor(props: ResultFieldProps) {
    super(props);
    this.state = {
      results: [],
    };
  }

  render() {
    return (
      <div className="results-section">
        <h2>Results</h2>
        {this.props.results.map((item, index) => (
          <div key={index} className="result-item">
            <h3>{item.name}</h3>
            <p>{item.description}</p>
          </div>
        ))}
      </div>
    );
  }
}
