import { fireEvent, screen, waitFor } from '@testing-library/dom';
import { detailedDataMock } from '../mocks';
import { renderWithProviders } from '../test-utils';
import { Checkbox } from '../../src/components/listItem/ui/checkbox';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { store } from '../../src/app/GlobalRedux/store';
import { Flyout } from '../../src/components/flyout/flyout';
import configureStore from 'redux-mock-store';

describe('Details', () => {
  it('Add item details after clicked on checkbox', async () => {
    renderWithProviders(<Checkbox data={detailedDataMock} />, store);

    const checkbox = screen.getByTestId('checkbox');
    expect(checkbox).not.toBeChecked();

    fireEvent.click(checkbox);

    await screen.findByRole('checkbox', { checked: true });
    fireEvent.click(checkbox);
  });

  it('Add item details was in store remove it after clicked on checkbox', async () => {
    const { store: testStore } = renderWithProviders(<Checkbox data={detailedDataMock} />, store);

    const checkbox = screen.getByTestId('checkbox');
    await waitFor(() => {
      expect(checkbox).not.toBeChecked();
    });

    fireEvent.click(checkbox);
    expect(checkbox).toBeChecked();

    fireEvent.click(checkbox);

    waitFor(() => {
      screen.findByRole('checkbox', { checked: false });
      const state = testStore.getState().flyout;
      expect(state.some((pokemon) => pokemon.name === detailedDataMock.name)).toBe(false);
    });
  });

  it('Show flyout component after checked item checkbox', async () => {
    const { store: testStore } = renderWithProviders(<Checkbox data={detailedDataMock} />, store);

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
      const state = testStore.getState().flyout;
      expect(state.some((pokemon) => pokemon.name === detailedDataMock.name)).toBe(true);
      expect(screen.getByTestId('flyout')).toBeInTheDocument();
      expect(screen.getByText('Unselect all')).toBeInTheDocument();
      expect(screen.getByText('Download')).toBeInTheDocument();
    });
  });

  it('Remove flyout after clicking unselect all button', async () => {
    const { store: testStore } = renderWithProviders(<Checkbox data={detailedDataMock} />, store);

    expect(screen.queryByTestId('flyout')).not.toBeInTheDocument();

    waitFor(() => {
      const checkbox = screen.getAllByTestId('checkbox')[1];
      expect(checkbox).not.toBeChecked();

      fireEvent.click(checkbox);
    });

    waitFor(() => {
      const state = testStore.getState().flyout;
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

vi.mock('./utils', () => ({
  convertToCSV: vi.fn(() => 'mockedCSVString'),
}));

const mockStore = configureStore([]);

describe('Flyout render', async () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      flyout: [detailedDataMock],
    });
    store.dispatch = vi.fn();
  });

  it('Add item details was in store remove it after clicked on checkbox', async () => {
    renderWithProviders(<Flyout />, store);

    expect(screen.getByTestId('flyout')).toBeInTheDocument();
    expect(screen.getByText('1 items are selected')).toBeInTheDocument();
    expect(screen.getByText('Unselect all')).toBeInTheDocument();
    expect(screen.getByText('Download')).toBeInTheDocument();
  });
});
