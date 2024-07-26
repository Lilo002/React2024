import { fireEvent, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Buttons } from '../../src/components/buttons/buttons';
import { setupServer } from 'msw/node';
import { handlers } from '../mocks';
import { renderWithProviders } from '../test-utils';

const server = setupServer(...handlers);

describe('Buttons', () => {
  beforeAll(() => server.listen());

  afterEach(() => server.resetHandlers());

  afterAll(() => server.close());
  it('buttons should change page value', async () => {
    renderWithProviders(
      <BrowserRouter>
        <Buttons isPrevBtnDisabled={false} isNextBtnDisabled={false} />
      </BrowserRouter>,
    );

    const nextLink = screen.getByText('next');
    const prevLink = screen.getByText('prev');

    expect(prevLink).toHaveAttribute('href', '/');
    expect(nextLink).toHaveAttribute('href', '/?page=2');

    fireEvent.click(nextLink);

    await waitFor(() => {
      expect(prevLink).toHaveAttribute('href', '/?page=1');
      expect(nextLink).toHaveAttribute('href', '/?page=3');
    });

    fireEvent.click(prevLink);

    await waitFor(() => {
      expect(prevLink).toHaveAttribute('href', '/?page=1');
      expect(nextLink).toHaveAttribute('href', '/?page=2');
    });
  });
});
