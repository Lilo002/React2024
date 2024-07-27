import { ResultField } from '../components/resultField/ResultField';
import { SearchField } from '../components/searchField/SearchFiled';
import { Outlet } from 'react-router-dom';
import { UseTheme } from '../hooks/useThemeContext';

export function Layout() {
  const isDarkTheme = UseTheme();
  return (
    <div className={`app ${isDarkTheme ? 'dark' : ''}`}>
      <div className="left-panel">
        <SearchField />
        <ResultField />
      </div>
      <Outlet />
    </div>
  );
}
