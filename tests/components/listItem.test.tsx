import { describe, it, expect, beforeEach, vi } from 'vitest';
import { screen } from '@testing-library/react';

import { ListItem } from '../../src/components/listItem/listItem';
import { detailedDataMock, resultsMock } from '../mocks';
import { renderWithProviders } from '../test-utils';
import { store } from '../../src/app/GlobalRedux/store';

describe('ListItem', () => {
  const mockSearchParams = { page: '1', search: '', theme: 'light' };

  const mockGetPokemonByName = vi.fn();

  beforeEach(() => {
    mockGetPokemonByName.mockReturnValue([[], detailedDataMock]);
  });

  it('renders correctly with provided data', async () => {
    const item = await ListItem({
      data: resultsMock[0],
      searchParams: mockSearchParams,
    });

    renderWithProviders(item, store);

    expect(screen.getByTestId('checkbox')).toBeDefined();
    expect(screen.getByText(detailedDataMock.name)).toBeDefined();
  });
});
