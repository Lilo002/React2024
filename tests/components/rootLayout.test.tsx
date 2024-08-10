import { waitFor, screen } from '@testing-library/react';
import RootLayout from '../../src/app/layout';
import { describe, expect, it } from 'vitest';
import { store } from '../../src/app/GlobalRedux/store';
import { renderWithProviders } from '../test-utils';

describe('ThemeWrapper', () => {
  it('renders children correctly', () => {
    renderWithProviders(
      <RootLayout>
        <div data-testid="child">Child Component</div>
      </RootLayout>,
      store,
    );

    waitFor(() => {
      expect(screen.getByTestId('child')).toBeDefined();
      expect(screen.getByText('Child Component')).toBeDefined();
    });
  });
});
