import { useState } from 'react';
import { useNavigateMethods } from '../../hooks/useNavigateMethods';
import { ThemeSwitcher } from '../themeSwitcher/themeSwitcher';
import { useRouter } from 'next/router';

export function SearchField() {
  const { getSearchValue, navigateToMainPage } = useNavigateMethods();
  const [searchValue, setSearchValue] = useState(getSearchValue());

  const router = useRouter();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const input = form.elements.namedItem('search') as HTMLInputElement;
    const { value } = input;
    const query: { page: string; search?: string } = { page: '1' };

    if (value) {
      query.search = value;
    }

    router.push({
      pathname: '/',
      query: query,
    });
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  return (
    <div className="search" onClick={navigateToMainPage}>
      <form onSubmit={handleSubmit} className="search-form">
        <input
          className="search-input"
          type="text"
          name="search"
          value={searchValue}
          onChange={handleInputChange}
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
