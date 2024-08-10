import { describe, it, expect, beforeAll, afterAll, afterEach, vi } from 'vitest';
import { screen, waitFor } from '@testing-library/react';
import { handlers, resultsMock } from '../mocks';
import { setupServer } from 'msw/node';
import { renderWithProviders } from '../test-utils';
import mockRouter from 'next-router-mock';
import { createDynamicRouteParser } from 'next-router-mock/dist/dynamic-routes';
import { MemoryRouterProvider } from 'next-router-mock/dist/MemoryRouterProvider';
import ResultField from '../../src/components/resultField/ResultField';

vi.mock('next/router', () => require('next-router-mock'));
const server = setupServer(...handlers);

mockRouter.useParser(createDynamicRouteParser(['/pokemon/[id]']));

describe('ResultField', () => {
  beforeAll(() => server.listen());

  afterEach(() => server.resetHandlers());

  afterAll(() => server.close());

  it('show card with data and remove loader if data loaded', async () => {
    renderWithProviders(
      <MemoryRouterProvider url="/?page=2">
        <ResultField />
      </MemoryRouterProvider>,
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
