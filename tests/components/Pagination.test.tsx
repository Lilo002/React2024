import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Buttons } from '../../src/components/buttons/buttons';

describe('Buttons', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('buttons should change page value', async () => {
    render(
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
