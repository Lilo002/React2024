import { Component } from 'react';
import { SearchFiled } from './components/searchField/SearchFiled';
import { ResultField } from './components/resultField/ResultField';

interface AppState {
  inputValue: string;
  results: { name: string; description: string }[];
}

class App extends Component<unknown, AppState> {
  constructor(props: unknown) {
    super(props);
    this.state = {
      inputValue: localStorage.getItem('Lilo-value') || '',
      results: [],
    };
  }

  handleSearch = (value: string) => {
    const trimmedValue = value.trim();
    this.setState({ inputValue: trimmedValue });
    localStorage.setItem('Lilo-value', trimmedValue);
  };

  render() {
    const { inputValue, results } = this.state;
    return (
      <div className="app">
        <SearchFiled searchValue={inputValue} onSearch={this.handleSearch} />
        <ResultField results={results} />
      </div>
    );
  }
}

export default App;
