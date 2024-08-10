'use client';
import { useState } from 'react';
import { ThemeSwitcher } from '../themeSwitcher/themeSwitcher';
import { useRouter } from 'next/navigation';
import { SearchParams } from '../../types/types';

type Props = {
  searchParams: SearchParams;
};

export default function SearchField({ searchParams }: Props) {
  const { search } = searchParams;
  const [searchValue, setSearchValue] = useState(search || '');

  const router = useRouter();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const query: { page: string; search?: string } = { page: '1' };

    if (searchValue) {
      query.search = searchValue;
    }

    const searchParams = new URLSearchParams(query).toString();
    router.push(`/?${searchParams}`);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  return (
    <div className="search">
      <form onSubmit={handleSubmit} className="search-form">
        <input
          className="search-input"
          onChange={handleInputChange}
          type="text"
          name="search"
          value={searchValue}
          placeholder="Enter number or name"
        />
        <button className="search-btn" type="submit">
          Search
        </button>
      </form>
      <ThemeSwitcher />
    </div>
  );
}
