import { fireEvent, screen, waitFor } from '@testing-library/react';
import { Buttons } from '../../src/components/buttons/buttons';
import { renderWithProviders } from '../test-utils';
import { describe, it, expect } from 'vitest';
import { MemoryRouterProvider } from 'next-router-mock/dist/MemoryRouterProvider';
import { store } from '../../src/app/GlobalRedux/store';

const props = {
  searchParams: { page: '1', search: '', theme: 'light' },
};

describe('Buttons', () => {
  it('buttons should change page value', async () => {
    renderWithProviders(
      <MemoryRouterProvider url="/">
        <Buttons searchParams={props.searchParams} />
      </MemoryRouterProvider>,
      store,
    );

    const nextLink = screen.getByText('next');
    const prevLink = screen.getByText('prev');

    expect(prevLink).toHaveAttribute('href', '/?page=0&search=&theme=light');
    expect(nextLink).toHaveAttribute('href', '/?page=2&search=&theme=light');

    fireEvent.click(nextLink);

    waitFor(() => {
      expect(prevLink).toHaveAttribute('href', '/?page=1&search=&theme=light');
      expect(nextLink).toHaveAttribute('href', '/?page=3&search=&theme=light');
    });

    fireEvent.click(prevLink);

    waitFor(() => {
      expect(prevLink).toHaveAttribute('href', '/?page=1&search=&theme=light');
      expect(nextLink).toHaveAttribute('href', '/?page=2&search=&theme=light');
    });
  });
});
