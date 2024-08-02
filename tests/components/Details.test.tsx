import { screen, waitFor, fireEvent } from '@testing-library/react';
import { detailedDataMock, handlers } from '../mocks';
import { setupServer } from 'msw/node';
import { renderWithProviders } from '../test-utils';
import { describe, beforeAll, afterEach, afterAll, it, expect, vi } from 'vitest';
import { MemoryRouterProvider } from 'next-router-mock/MemoryRouterProvider';

import Details from '../../src/pages/pokemon/[id]';
import mockRouter from 'next-router-mock';

import { createDynamicRouteParser } from 'next-router-mock/dynamic-routes';

vi.mock('next/router', () => require('next-router-mock'));
const server = setupServer(...handlers);

mockRouter.useParser(createDynamicRouteParser(['/pokemon/[id]']));

describe('Flyout', () => {
  beforeAll(() => {
    server.listen();
  });

  afterEach(() => server.resetHandlers());

  afterAll(() => server.close());

  it('show loader when data is loading', async () => {
    renderWithProviders(<Details />);
    mockRouter.push('/pokemon/bulbasaur');

    expect(screen.getAllByTestId('loader')).toBeDefined();
    expect(screen.queryByTestId('card')).toBeNull();
  });

  it('close details when clicked on close button', async () => {
    renderWithProviders(
      <MemoryRouterProvider url="/pokemon/bulbasaur">
        <Details />
      </MemoryRouterProvider>,
    );

    expect(screen.getAllByTestId('loader')).toBeDefined();

    waitFor(() => {
      expect(screen.getByTestId('details')).toBeDefined();
    });

    const closeButton = screen.getByTestId('card-close');
    fireEvent.click(closeButton);

    waitFor(() => {
      expect(screen.queryByText(detailedDataMock.types[0].type.name)).toBeNull();
    });
  });

  it('render empty block if  there is an Error in fetch', async () => {
    renderWithProviders(
      <MemoryRouterProvider url="/">
        <Details />
      </MemoryRouterProvider>,
    );

    waitFor(() => {
      expect(screen.queryByTestId('card')).toBeNull();
      expect(screen.queryByTestId('detailed-loader')).toBeNull();
    });
  });
});
