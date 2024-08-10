import { describe, it, expect } from 'vitest';
import { ThemeWrapper } from '../../src/components/themeProvider/themeWrapper';
import { renderWithProviders } from '../test-utils';
import { store } from '../../src/app/GlobalRedux/store';
import { waitFor } from '@testing-library/react';

describe('ThemeWrapper', () => {
  it('renders children correctly', () => {
    renderWithProviders(
      <ThemeWrapper searchParams={{ theme: 'light', page: '1', search: '' }}>
        <div data-testid="child">Child Component</div>
      </ThemeWrapper>,
      store,
    );

    waitFor(() => {
      expect(screen.getByTestId('child')).toBeDefined();
      expect(screen.getByText('Child Component')).toBeDefined();
    });
  });
});
