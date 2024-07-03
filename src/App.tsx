import { Component } from 'react';
import { SearchFiled } from './components/searchField/SearchFiled';
import { ResultField } from './components/resultField/ResultField';
import { ResponseItem } from './types';

const URL = 'https://pokeapi.co/api/v2/';
const LIMIT = 20;

interface AppState {
  inputValue: string;
  results: ResponseItem[];
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
    this.fetchData(value);
  };

  fetchData = (value: string) => {
    value.trim() ? this.fetchSearchedData(value) : this.fetchAllData();
  };

  fetchAllData = () =>
    fetch(`${URL}pokemon?limit=${LIMIT}`)
      .then((response) => response.json())
      .then((data) => {
        this.setState({ results: data.results });
        console.log(data.results);
      })
      .catch((error) => console.log(error));

  fetchSearchedData = (value: string) =>
    fetch(`${URL}pokemon/${value.trim()}/`)
      .then((response) => response.json())
      .then((data) => {
        this.setState({ results: [data] });
        console.log(data);
      })
      .catch((error) => console.log(error));

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
