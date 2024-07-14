import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { Details } from '../../src/components/details/details';
import { BrowserRouter } from 'react-router-dom';
import { detailedDataMock, resultsMock } from '../mocks';
import { App } from '../../src/app/App';

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useParams: () => ({ id: detailedDataMock.name }),
    useNavigate: () => vi.fn(),
    useLocation: () => ({ pathname: `/pokemon/${detailedDataMock.name}` }),
  };
});

describe('Details', () => {
  const mockFetch = vi.fn();

  beforeEach(() => {
    globalThis.fetch = mockFetch;
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  it('show loader when data is loading', async () => {
    mockFetch.mockImplementation(() => new Promise(() => {}));

    render(
      <BrowserRouter>
        <Details />
      </BrowserRouter>,
    );

    expect(screen.getByTestId('loader')).toBeDefined();
    expect(screen.queryByTestId('card')).toBeNull();
  });

  it('show card when data loaded and remove loader', async () => {
    mockFetch.mockResolvedValueOnce({
      json: () => Promise.resolve(detailedDataMock),
    });

    render(
      <BrowserRouter>
        <Details />
      </BrowserRouter>,
    );

    expect(screen.queryByTestId('detailed-loader')).toBeDefined();

    await waitFor(() => {
      expect(screen.getByTestId('card')).toBeDefined();
      expect(screen.queryByTestId('detailed-loader')).toBeNull();
    });

    expect(screen.getByText(detailedDataMock.name)).toBeDefined();
    expect(screen.getByText(detailedDataMock.types[0].type.name)).toBeDefined();
  });

  it('close details when clicked on close button', async () => {
    mockFetch
      .mockResolvedValueOnce({
        json: () => Promise.resolve({ results: [resultsMock[0]] }),
      })
      .mockResolvedValueOnce({
        json: () => Promise.resolve(detailedDataMock),
      });

    render(<App />);
    const listItemLink = await screen.findByText(resultsMock[0].name);
    expect(listItemLink).toBeDefined();
    fireEvent.click(listItemLink);

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
    mockFetch.mockResolvedValueOnce({
      json: () => Promise.reject(detailedDataMock),
    });

    render(
      <BrowserRouter>
        <Details />
      </BrowserRouter>,
    );

    await waitFor(() => {
      expect(screen.queryByTestId('card')).toBeNull();
      expect(screen.queryByTestId('detailed-loader')).toBeNull();
    });
  });
});
