import { screen, waitFor, fireEvent } from '@testing-library/react';
import { Details } from '../../src/components/details/details';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { handlers, resultsMock } from '../mocks';
import { App } from '../../src/app/App';
import { setupServer } from 'msw/node';
import { renderWithProviders } from '../test-utils';

const server = setupServer(...handlers);

describe('Details', () => {
  beforeAll(() => server.listen());

  afterEach(() => server.resetHandlers());

  afterAll(() => server.close());
  it('show loader when data is loading', async () => {
    renderWithProviders(<App />);

    const listItemLink = await screen.findByText(resultsMock[0].name);
    expect(screen.queryByTestId('card')).toBeNull();
    expect(listItemLink).toBeDefined();

    fireEvent.click(listItemLink);

    expect(screen.getByTestId('loader')).toBeDefined();
    expect(screen.queryByTestId('card')).toBeNull();
  });

  it('close details when clicked on close button', async () => {
    renderWithProviders(<App />);

    const listItemLink = await screen.findAllByText(resultsMock[0].name);
    expect(listItemLink).toBeDefined();
    fireEvent.click(listItemLink[0]);

    await waitFor(() => {
      expect(screen.getByTestId('details')).toBeDefined();
    });

    const closeButton = screen.getByTestId('card-close');
    fireEvent.click(closeButton);

    await waitFor(() => {
      expect(screen.queryByTestId('details')).toBeNull();
    });
  });

  it('render empty block if  there is an Error in fetch', async () => {
    renderWithProviders(
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Details />} />
        </Routes>
      </BrowserRouter>,
    );

    await waitFor(() => {
      expect(screen.queryByTestId('card')).toBeNull();
      expect(screen.queryByTestId('detailed-loader')).toBeNull();
    });
  });
});
