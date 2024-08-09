import { SearchParams } from '../../types/types';

export function ThemeWrapper({ children, searchParams }: { children: React.ReactNode; searchParams: SearchParams }) {
  const { theme } = searchParams;

  return <div className={`app ${theme || 'light'}`}>{children}</div>;
}
