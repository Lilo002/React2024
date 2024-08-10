import { MemoryRouterProvider } from 'next-router-mock/dist/MemoryRouterProvider';

import { describe, it, expect } from 'vitest';
import Loader from '../../src/app/loading';
import { render, screen, waitFor } from '@testing-library/react';

describe('loader', () => {
  it('Navigate to Loader', async () => {
    render(
      <MemoryRouterProvider url="/">
        <Loader />
      </MemoryRouterProvider>,
    );

    waitFor(() => {
      expect(screen.getByTestId('loader')).toBeDefined();
    });
  });
});
