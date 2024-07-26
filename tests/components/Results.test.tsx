import { describe, it, expect } from 'vitest';
import { screen, waitFor } from '@testing-library/react';
import { ResultField } from '../../src/components/resultField/ResultField';
import { BrowserRouter } from 'react-router-dom';
import { handlers, resultsMock } from '../mocks';
import { setupServer } from 'msw/node';
import { renderWithProviders } from '../test-utils';

const server = setupServer(...handlers);

describe('ResultField', () => {
  beforeAll(() => server.listen());

  afterEach(() => server.resetHandlers());

  afterAll(() => server.close());

  it('show loader if data is loading', async () => {
    renderWithProviders(
      <BrowserRouter>
        <ResultField />
      </BrowserRouter>,
    );

    expect(screen.getByTestId('loader')).toBeDefined();
    expect(screen.queryByTestId('results-catalog')).toBeNull();
  });

  it('show card with data and remove loader if data loaded', async () => {
    renderWithProviders(
      <BrowserRouter>
        <ResultField />
      </BrowserRouter>,
    );

    expect(screen.getByTestId('loader')).toBeDefined();

    await waitFor(() => {
      const listItems = screen.getAllByTestId('result-item');
      listItems.forEach((item, index) => {
        expect(item).toHaveTextContent(resultsMock[index].name);
      });
    });

    expect(screen.queryByTestId('loader')).toBeNull();
  });
});
