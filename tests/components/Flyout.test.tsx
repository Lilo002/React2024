import { fireEvent, screen, waitFor } from '@testing-library/dom';
import { setupServer } from 'msw/node';
import { detailedDataMock, handlers } from '../mocks';
import { renderWithProviders } from '../test-utils';
import { Checkbox } from '../../src/components/listItem/ui/checkbox';
import { describe, beforeAll, afterEach, afterAll, it, expect, vi } from 'vitest';
import { createDynamicRouteParser } from 'next-router-mock/dist/dynamic-routes';
import mockRouter from 'next-router-mock';
import Main from '../../src/pages';

vi.mock('next/router', () => require('next-router-mock'));
const server = setupServer(...handlers);

mockRouter.useParser(createDynamicRouteParser(['/pokemon/[id]']));

describe('Details', () => {
  beforeAll(() => server.listen());

  afterEach(() => server.resetHandlers());

  afterAll(() => server.close());
  it('Add item details after clicked on checkbox', async () => {
    const { store } = renderWithProviders(<Checkbox name={detailedDataMock.name} />);

    const checkbox = screen.getByTestId('checkbox');
    expect(checkbox).not.toBeChecked();

    fireEvent.click(checkbox);

    await screen.findByRole('checkbox', { checked: true });

    await waitFor(() => {
      const state = store.getState().flyout;
      expect(state.some((pokemon) => pokemon.name === detailedDataMock.name)).toBe(true);
    });
  });

  it('Add item details was in store remove it after clicked on checkbox', async () => {
    const { store } = renderWithProviders(<Checkbox name={detailedDataMock.name} />, {
      preloadedState: { flyout: [detailedDataMock] },
    });

    const checkbox = screen.getByTestId('checkbox');
    expect(checkbox).not.toBeChecked();

    fireEvent.click(checkbox);
    expect(checkbox).toBeChecked();

    fireEvent.click(checkbox);

    waitFor(() => {
      screen.findByRole('checkbox', { checked: false });
      const state = store.getState().flyout;
      expect(state.some((pokemon) => pokemon.name === detailedDataMock.name)).toBe(false);
    });
  });

  it('Show flyout component after checked item checkbox', async () => {
    const { store } = renderWithProviders(<Main />);

    expect(screen.queryByTestId('flyout')).not.toBeInTheDocument();

    waitFor(() => {
      const checkbox = screen.getAllByTestId('checkbox')[1];
      expect(checkbox).not.toBeChecked();

      fireEvent.click(checkbox);
    });

    expect(screen.queryByTestId('flyout')).not.toBeInTheDocument();

    waitFor(() => {
      const checkbox = screen.getAllByTestId('checkbox')[1];
      expect(checkbox).toBeChecked();
    });

    waitFor(() => {
      const state = store.getState().flyout;
      expect(state.some((pokemon) => pokemon.name === detailedDataMock.name)).toBe(true);
      expect(screen.getByTestId('flyout')).toBeInTheDocument();
      expect(screen.getByText('Unselect all')).toBeInTheDocument();
      expect(screen.getByText('Download')).toBeInTheDocument();
    });
  });

  it('Remove flyout after clicking unselect all button', async () => {
    const { store } = renderWithProviders(<Main />);

    expect(screen.queryByTestId('flyout')).not.toBeInTheDocument();

    waitFor(() => {
      const checkbox = screen.getAllByTestId('checkbox')[1];
      expect(checkbox).not.toBeChecked();

      fireEvent.click(checkbox);
    });

    waitFor(() => {
      const state = store.getState().flyout;
      expect(state.some((pokemon) => pokemon.name === detailedDataMock.name)).toBe(true);
      expect(screen.queryByTestId('flyout')).toBeInTheDocument();
    });

    waitFor(() => {
      const unselect = screen.getByTestId('unselect');
      expect(unselect).toBeInTheDocument();
      fireEvent.click(unselect);
    });

    waitFor(() => {
      expect(screen.queryByTestId('flyout')).not.toBeInTheDocument();
    });
  });
});
