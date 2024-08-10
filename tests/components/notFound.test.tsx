import { describe, expect, it } from 'vitest';
import { MemoryRouterProvider } from 'next-router-mock/dist/MemoryRouterProvider';

import { render, screen, waitFor } from '@testing-library/react';
import ErrorPage from '../../src/app/not-found';

describe('404', () => {
  it('Navigate to not-found', async () => {
    render(
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
