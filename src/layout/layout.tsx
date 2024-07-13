import { ResultField } from '../components/resultField/ResultField';
import { SearchField } from '../components/searchField/SearchFiled';
import { Outlet } from 'react-router-dom';

export function Layout() {
  return (
    <div className="app">
      <div className="left-panel">
        <SearchField />
        <ResultField />
      </div>
      <Outlet />
    </div>
  );
}
