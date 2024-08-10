import { screen, waitFor } from '@testing-library/react';
import { detailedDataMock, handlers } from '../mocks';
import { setupServer } from 'msw/node';
import { renderWithProviders } from '../test-utils';
import { describe, beforeAll, afterEach, afterAll, it, expect, vi } from 'vitest';

import mockRouter from 'next-router-mock';

import { createDynamicRouteParser } from 'next-router-mock/dynamic-routes';
import { Card } from '../../src/components/card/Card';

vi.mock('next/router', () => require('next-router-mock'));
const server = setupServer(...handlers);

mockRouter.useParser(createDynamicRouteParser(['/pokemon/[id]']));

describe('Card', () => {
  beforeAll(() => {
    server.listen();
  });

  afterEach(() => server.resetHandlers());

  afterAll(() => server.close());

  it('render card with data', async () => {
    renderWithProviders(<Card data={detailedDataMock} />);

    waitFor(() => {
      expect(screen.getByTestId('details')).toBeDefined();
      expect(screen.queryByTestId('card')).toBeDefined();
      expect(screen.getByTestId(detailedDataMock.name)).toBeDefined();
      expect(screen.getByTestId('loader')).toBeDefined();
    });
  });
});
