import { afterAll, afterEach, beforeAll, describe, expect, it, vi } from 'vitest';
import mockRouter from 'next-router-mock';
import { setupServer } from 'msw/node';
import { createDynamicRouteParser } from 'next-router-mock/dist/dynamic-routes';
import { handlers } from '../mocks';
import { MemoryRouterProvider } from 'next-router-mock/dist/MemoryRouterProvider';

import { renderWithProviders } from '../test-utils';
import { screen, waitFor } from '@testing-library/react';
import ErrorPage from '../../src/pages/404';

vi.mock('next/router', () => require('next-router-mock'));
const server = setupServer(...handlers);

mockRouter.useParser(createDynamicRouteParser(['/pokemon/[id]']));

describe('404', () => {
  beforeAll(() => {
    server.listen();
  });

  afterEach(() => server.resetHandlers());

  afterAll(() => server.close());

  it('Navigate to 404', async () => {
    renderWithProviders(
      <MemoryRouterProvider url="/">
        <ErrorPage />
      </MemoryRouterProvider>,
    );

    waitFor(() => {
      expect(screen.getByText(`Oops, we've lost...`)).toBeDefined();
      expect(screen.getByTestId(`error`)).toBeDefined();
    });
  });
});
