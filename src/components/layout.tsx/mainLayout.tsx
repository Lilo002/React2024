import { SearchParams } from '../../types/types';
import ResultField from '../resultField/ResultField';
import SearchField from '../searchField/SearchFiled';
import { ThemeWrapper } from '../themeProvider/themeWrapper';

export default async function Layout({
  children,
  searchParams,
}: {
  children: React.ReactNode;
  searchParams: SearchParams;
}) {
  return (
    <ThemeWrapper searchParams={searchParams}>
      <div className="left-panel">
        <SearchField searchParams={searchParams} />
        <ResultField searchParams={searchParams} />
      </div>
      {children}
    </ThemeWrapper>
  );
}
