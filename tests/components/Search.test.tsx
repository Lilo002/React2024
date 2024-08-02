import { screen, fireEvent, waitFor } from '@testing-library/react';
import { SearchField } from '../../src/components/searchField/SearchFiled';
import { setupServer } from 'msw/node';
import { renderWithProviders } from '../test-utils';
import { detailedDataMock, handlers } from '../mocks';
import { describe, beforeAll, afterEach, afterAll, it, expect, vi } from 'vitest';
import mockRouter from 'next-router-mock';

import { createDynamicRouteParser } from 'next-router-mock/dynamic-routes';
import { MemoryRouterProvider } from 'next-router-mock/dist/MemoryRouterProvider';

vi.mock('next/router', () => require('next-router-mock'));
const server = setupServer(...handlers);

mockRouter.useParser(createDynamicRouteParser(['/pokemon/[id]']));

describe('SearchField', () => {
  beforeAll(() => server.listen());

  afterEach(() => server.resetHandlers());

  afterAll(() => server.close());

  it('after submit start render new results', async () => {
    renderWithProviders(
      <MemoryRouterProvider url="/">
        <SearchField />
      </MemoryRouterProvider>,
    );

    const input = screen.getByPlaceholderText('Enter number or name');
    const button = screen.getByText('Search');

    fireEvent.change(input, { target: { value: detailedDataMock.name } });
    fireEvent.click(button);

    waitFor(() => {
      expect(screen.getByText(detailedDataMock.types[0].type.name)).toBeDefined();
    });
  });
});
