import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { ResultField } from '../../src/components/resultField/ResultField';
import { BrowserRouter } from 'react-router-dom';
import { resultsMock } from '../mocks';

describe('ResultField', () => {
  const mockFetch = vi.fn();

  beforeEach(() => {
    globalThis.fetch = mockFetch;
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('show loader if data is loading', async () => {
    vi.mocked(fetch).mockImplementation(() => new Promise(() => {}));

    render(
      <BrowserRouter>
        <ResultField />
      </BrowserRouter>,
    );

    expect(screen.getByTestId('loader')).toBeDefined();
    expect(screen.queryByTestId('results-catalog')).toBeNull();
  });

  it('show card with data and remove loader if data loaded', async () => {
    vi.mocked(fetch).mockResolvedValueOnce({
      json: async () => ({ results: resultsMock }),
    } as Response);

    render(
      <BrowserRouter>
        <ResultField />
      </BrowserRouter>,
    );

    await waitFor(() => {
      const listItems = screen.getAllByTestId('result-item');
      listItems.forEach((item, index) => {
        expect(item).toHaveTextContent(resultsMock[index].name);
      });
    });

    expect(screen.queryByTestId('loader')).toBeNull();
  });
});
