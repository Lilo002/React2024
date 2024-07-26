import { fireEvent, screen, waitFor } from '@testing-library/dom';
import { setupServer } from 'msw/node';
import { detailedDataMock, handlers } from '../mocks';
import { renderWithProviders } from '../test-utils';
import { App } from '../../src/app/App';
import { Checkbox } from '../../src/components/listItem/ui/checkbox';

const server = setupServer(...handlers);

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
    expect(checkbox).toBeChecked();

    fireEvent.click(checkbox);

    await screen.findByRole('checkbox', { checked: false });

    await waitFor(() => {
      const state = store.getState().flyout;
      expect(state.some((pokemon) => pokemon.name === detailedDataMock.name)).toBe(false);
    });
  });

  it('Show flyout component after checked item checkbox', async () => {
    const { store } = renderWithProviders(<App />);

    expect(screen.queryByTestId('flyout')).not.toBeInTheDocument();

    await waitFor(() => {
      const checkbox = screen.getAllByTestId('checkbox')[1];
      expect(checkbox).not.toBeChecked();

      fireEvent.click(checkbox);
    });

    expect(screen.queryByTestId('flyout')).not.toBeInTheDocument();

    await waitFor(() => {
      const checkbox = screen.getAllByTestId('checkbox')[1];
      expect(checkbox).toBeChecked();
    });

    await waitFor(() => {
      const state = store.getState().flyout;
      expect(state.some((pokemon) => pokemon.name === detailedDataMock.name)).toBe(false);
      expect(screen.getByTestId('flyout')).toBeInTheDocument();
    });
  });

  it('Remove flyout after clicking unselect all button', async () => {
    const { store } = renderWithProviders(<App />);

    expect(screen.queryByTestId('flyout')).not.toBeInTheDocument();

    await waitFor(() => {
      const checkbox = screen.getAllByTestId('checkbox')[1];
      expect(checkbox).not.toBeChecked();

      fireEvent.click(checkbox);
    });

    await waitFor(() => {
      const state = store.getState().flyout;
      expect(state.some((pokemon) => pokemon.name === detailedDataMock.name)).toBe(false);
      expect(screen.queryByTestId('flyout')).toBeInTheDocument();
    });

    await waitFor(() => {
      const unselect = screen.getByTestId('unselect');
      expect(unselect).toBeInTheDocument();
      fireEvent.click(unselect);
    });

    await waitFor(() => {
      expect(screen.queryByTestId('flyout')).not.toBeInTheDocument();
    });
  });
});
