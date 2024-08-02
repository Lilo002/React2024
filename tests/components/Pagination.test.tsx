import { fireEvent, screen, waitFor } from '@testing-library/react';
import { Buttons } from '../../src/components/buttons/buttons';
import { setupServer } from 'msw/node';
import { handlers } from '../mocks';
import { renderWithProviders } from '../test-utils';
import { describe, beforeAll, afterEach, afterAll, it, expect, vi } from 'vitest';
import { createDynamicRouteParser } from 'next-router-mock/dist/dynamic-routes';
import mockRouter from 'next-router-mock';
import { MemoryRouterProvider } from 'next-router-mock/dist/MemoryRouterProvider';

vi.mock('next/router', () => require('next-router-mock'));
const server = setupServer(...handlers);

mockRouter.useParser(createDynamicRouteParser(['/pokemon/[id]']));

describe('Buttons', () => {
  beforeAll(() => server.listen());

  afterEach(() => server.resetHandlers());

  afterAll(() => server.close());
  it('buttons should change page value', async () => {
    renderWithProviders(
      <MemoryRouterProvider url="/">
        <Buttons isPrevBtnDisabled={false} isNextBtnDisabled={false} />
      </MemoryRouterProvider>,
    );

    const nextLink = screen.getByText('next');
    const prevLink = screen.getByText('prev');

    expect(prevLink).toHaveAttribute('href', '/?');
    expect(nextLink).toHaveAttribute('href', '/?page=2');

    fireEvent.click(nextLink);

    waitFor(() => {
      expect(prevLink).toHaveAttribute('href', '/?page=1');
      expect(nextLink).toHaveAttribute('href', '/?page=3');
    });

    fireEvent.click(prevLink);

    waitFor(() => {
      expect(prevLink).toHaveAttribute('href', '/?page=1');
      expect(nextLink).toHaveAttribute('href', '/?page=2');
    });
  });
});
