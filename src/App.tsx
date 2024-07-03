import { Component } from 'react';
import { SearchFiled } from './components/searchField/SearchFiled';
import { ResultField } from './components/resultField/ResultField';
import { ResponseItem, SearchItem } from './types';

const URL = 'https://pokeapi.co/api/v2/';
const LIMIT = 20;

interface AppState {
  inputValue: string;
  results: SearchItem[];
}

class App extends Component<unknown, AppState> {
  constructor(props: unknown) {
    super(props);
    this.state = {
      inputValue: localStorage.getItem('Lilo-value') || '',
      results: [],
    };
  }

  componentDidMount() {
    this.fetchData(this.state.inputValue);
  }

  handleSearch = (value: string) => {
    const trimmedValue = value.trim();
    this.setState({ inputValue: trimmedValue });
    localStorage.setItem('Lilo-value', trimmedValue);
    this.fetchData(value);
  };

  fetchData = (value: string) => {
    value.trim() ? this.fetchSearchedData(value) : this.fetchAllItemsData();
  };

  fetchAllItemsData = async () => {
    try {
      const data = await this.fetchAllData();
      const fetchedData: SearchItem[] = await Promise.all(data.map((item) => this.fetchSearchedData(item.name)));
      this.setState({ results: fetchedData });
    } catch (error) {
      console.error(error);
    }
  };

  fetchAllData = (): Promise<ResponseItem[]> =>
    fetch(`${URL}pokemon?limit=${LIMIT}`)
      .then((response) => response.json())
      .then((data) => data.results)
      .catch((error) => console.log(error));

  searchItem = (value: string) => {
    this.fetchSearchedData(value).then((data) => this.setState({ results: [data] }));
  };

  fetchSearchedData = (value: string): Promise<SearchItem> =>
    fetch(`${URL}pokemon/${value.trim()}/`)
      .then((response) => response.json())
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
