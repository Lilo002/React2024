import { render, screen, waitFor } from '@testing-library/react';

import { describe, it, expect } from 'vitest';
import { Card } from '../../../components/card/Card';
import { detailedDataMock } from '../../../../tests/mocks';

describe('Card', () => {
  it('render card with data', async () => {
    render(<Card data={detailedDataMock} />);

    waitFor(() => {
      expect(screen.getByTestId('details')).toBeDefined();
      expect(screen.queryByTestId('card')).toBeDefined();
      expect(screen.getByTestId(detailedDataMock.name)).toBeDefined();
      expect(screen.getByTestId('loader')).toBeDefined();
    });
  });
});
