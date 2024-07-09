import { useCallback, useEffect, useState } from 'react';
import { SearchFiled } from '../components/searchField/SearchFiled';
import { ResultField } from '../components/resultField/ResultField';
import { ResponseItem, SearchItem } from '../types';
import './_style.scss';
import { LIMIT, URL } from '../constant';

function App() {
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [results, setResults] = useState<null | SearchItem | ResponseItem[]>(null);
  const [search, setSearch] = useState(getDataFromLocalStorage());

  function getDataFromLocalStorage(): string {
    return localStorage.getItem('Lilo-value') || '';
  }

  const fetchAllData = async (): Promise<ResponseItem[]> => {
    const response = await fetch(`${URL}pokemon?limit=${LIMIT}&offset=${0}`);
    const data = await response.json();
    const results = data.results;
    return results;
  };

  const fetchSearchedData = async (value: string): Promise<SearchItem> => {
    const response = await fetch(`${URL}pokemon/${value.trim().toLowerCase()}/`);
    const data = await response.json();
    return data;
  };

  const fetchData = useCallback(async (value: string) => {
    try {
      const data = value.trim() ? await fetchSearchedData(value) : await fetchAllData();
      setResults(data);
      setIsDataLoaded(true);
    } catch (error) {
      setResults(null);
      setIsDataLoaded(true);
      console.error(error);
    }
  }, []);

  useEffect(() => {
    fetchData(search);
  }, [fetchData, search]);

  const handleSearch = (value: string) => {
    setIsDataLoaded(false);

    const trimmedValue = value.trim();
    setSearch(trimmedValue);
    localStorage.setItem('Lilo-value', trimmedValue);
  };

  return (
    <div className="app">
      <SearchFiled searchValue={search} onSearch={handleSearch} />
      <ResultField results={results} isDataLoaded={isDataLoaded} />
    </div>
  );
}

export default App;
