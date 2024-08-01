import ResultField from '../components/resultField/ResultField';
import { SearchField } from '../components/searchField/SearchFiled';
import { UseTheme } from '../hooks/useThemeContext';

export function Layout({ children }) {
  const isDarkTheme = UseTheme();

  return (
    <div className={`app ${isDarkTheme ? 'dark' : ''}`}>
      <div className="left-panel">
        <SearchField />
        <ResultField />
      </div>
      {children}
    </div>
  );
}
