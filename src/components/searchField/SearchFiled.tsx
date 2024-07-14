import { useEffect, useState } from 'react';

import './_style.scss';
import { useSearchQuery } from '../../hooks/useSearchQuery';
import { useNavigate } from 'react-router-dom';
import { useNavigateMethods } from '../../hooks/useNavigateMethods';

export function SearchField() {
  const { searchQuery, setSearchQuery } = useSearchQuery();
  const [searchValue, setSearchValue] = useState(searchQuery);
  const { navigateToMainPage } = useNavigateMethods();

  const navigate = useNavigate();

  useEffect(() => {
    if (searchQuery) {
      navigate(`/?page=1${searchQuery && '&search=' + searchQuery}`);
    }
  }, []);

  useEffect(() => {
    setSearchValue(searchQuery);
  }, [searchQuery]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const input = form.elements.namedItem('search') as HTMLInputElement;
    const { value } = input;
    setSearchQuery(value);
    navigate(`/?page=1${value && '&search=' + value}`);
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
    </div>
  );
}
