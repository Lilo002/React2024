import { screen, fireEvent, waitFor } from '@testing-library/react';
import { renderWithProviders } from '../test-utils';
import { detailedDataMock } from '../mocks';
import { describe, it, expect, vi } from 'vitest';

import { store } from '../../src/app/GlobalRedux/store';
import SearchField from '../../src/components/searchField/SearchFiled';

vi.mock('next/navigation', async () => {
  const actual = await vi.importActual('next/navigation');
  return {
    ...actual,
    useRouter: vi.fn(() => ({
      push: vi.fn(),
      replace: vi.fn(),
    })),
    useSearchParams: vi.fn(() => ({
      get: vi.fn(),
    })),
    usePathname: vi.fn(),
  };
});

const props = { searchParams: { page: '1', search: '', theme: 'light' } };

describe('SearchField', () => {
  it('after submit start render new results', async () => {
    renderWithProviders(<SearchField {...props} />, store);

    const input = screen.getByPlaceholderText('Enter number or name');
    const button = screen.getByText('Search');

    fireEvent.change(input, { target: { value: detailedDataMock.name } });
    fireEvent.click(button);

    waitFor(() => {
      expect(screen.getByText(detailedDataMock.types[0].type.name)).toBeDefined();
    });
  });
});
