import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { SearchField } from '../../src/components/searchField/SearchFiled';

describe('SearchField', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('saves the entered value to local storage when Search button is clicked', () => {
    render(
      <BrowserRouter>
        <SearchField />
      </BrowserRouter>,
    );

    const input = screen.getByPlaceholderText('Enter number or name');
    const button = screen.getByText('Search');

    fireEvent.change(input, { target: { value: 'pikachu' } });
    fireEvent.click(button);

    expect(localStorage.getItem('lilo-value')).toBe('pikachu');
  });

  it('retrieves the value from local storage upon mounting', () => {
    localStorage.setItem('lilo-value', 'pikachu');

    render(
      <BrowserRouter>
        <SearchField />
      </BrowserRouter>,
    );

    const input = screen.getByRole('textbox') as HTMLInputElement;

    expect(input.value).toBe('pikachu');
  });
});
