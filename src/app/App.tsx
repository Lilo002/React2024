import { Component } from 'react';
import { SearchFiled } from '../components/searchField/SearchFiled';
import { ResultField } from '../components/resultField/ResultField';
import { ResponseItem, SearchItem } from '../types';
import './_style.scss';
import { LIMIT, URL } from '../constant';

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
    value.trim() ? this.searchItem(value) : this.fetchAllItemsData();
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
    this.fetchSearchedData(value)
      .then((data) => this.setState({ results: [data] }))
      .catch(() => this.setState({ results: [] }));
  };

  fetchSearchedData = (value: string): Promise<SearchItem> =>
    fetch(`${URL}pokemon/${value.trim().toLowerCase()}/`).then((response) => response.json());

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
