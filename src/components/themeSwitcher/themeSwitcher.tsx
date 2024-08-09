'use client';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { createSearchParams } from '../../utils/createQueryParams';

export function ThemeSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const page = searchParams.get('page') || '1';
  const search = searchParams.get('search') || '';

  const currentTheme = searchParams.get('theme') || 'light';
  const [isChecked, setIsChecked] = useState(currentTheme === 'dark');

  useEffect(() => {
    const theme = isChecked ? 'dark' : 'light';
    router.push(`${pathname}?${createSearchParams({ page, search, theme })}`);
  }, [isChecked]);

  return (
    <label className="switcher">
      <input
        className="switcher-input"
        onChange={() => setIsChecked((prev) => !prev)}
        checked={isChecked}
        type="checkbox"
      />
      <span className="switcher-round" />
    </label>
  );
}
