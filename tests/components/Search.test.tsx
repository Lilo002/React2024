import { screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { SearchField } from '../../src/components/searchField/SearchFiled';
import { setupServer } from 'msw/node';
import { renderWithProviders } from '../test-utils';
import { handlers } from '../mocks';

const server = setupServer(...handlers);

describe('SearchField', () => {
  beforeAll(() => server.listen());

  afterEach(() => server.resetHandlers());

  afterAll(() => server.close());

  it('saves the entered value to local storage when Search button is clicked', () => {
    renderWithProviders(
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

    renderWithProviders(
      <BrowserRouter>
        <SearchField />
      </BrowserRouter>,
    );

    const input = screen.getByRole('textbox') as HTMLInputElement;

    expect(input.value).toBe('pikachu');
  });
});
