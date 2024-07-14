import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { ListItem } from '../../src/components/listItem/listItem';
import { List } from '../../src/components/list/list';
import { BrowserRouter } from 'react-router-dom';
import { detailedDataMock, resultsMock } from '../mocks';
import { App } from '../../src/app/App';

describe('ListItem render', () => {
  it('should render listItem with data', () => {
    render(
      <BrowserRouter>
        <ListItem data={resultsMock[0]} />
      </BrowserRouter>,
    );

    const item = screen.getByRole('listitem');
    expect(item).toBeInTheDocument();
    expect(screen.getByText(resultsMock[0].name)).toBeInTheDocument;

    const link = screen.getByRole('link');
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', `/pokemon/${resultsMock[0].name}`);
  });
});

describe('List render', () => {
  it('should render list item', () => {
    render(
      <BrowserRouter>
        <List results={resultsMock} />
      </BrowserRouter>,
    );

    const list = screen.getByRole('list');
    const items = screen.getAllByRole('listitem');
    expect(list).toBeInTheDocument();
    expect(items.length).equal(resultsMock.length);

    resultsMock.forEach((result) => {
      const link = screen.getByRole('link', { name: result.name });
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute('href', `/pokemon/${result.name}`);
    });
  });

  it('should render loader if there is no data', () => {
    render(
      <BrowserRouter>
        <List results={null} />
      </BrowserRouter>,
    );

    const list = screen.getByRole('list');
    const items = screen.queryAllByRole('listitem');
    const errorMessage = screen.getByText(/Oops, this Pokémon doesn't exist yet/i);

    expect(list).toBeInTheDocument();
    expect(items.length).toEqual(0);
    expect(errorMessage).toBeInTheDocument();
  });
});

// Мокируем метод навигации и useParams
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useParams: () => ({ id: detailedDataMock.name }),
    useNavigate: () => vi.fn(),
  };
});

describe('Navigation and Details Rendering', () => {
  const mockFetch = vi.fn();

  beforeEach(() => {
    globalThis.fetch = mockFetch;
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  it('should navigate to Details and render data on link click', async () => {
    mockFetch.mockResolvedValueOnce({
      json: () => Promise.resolve({ results: [resultsMock[0]] }),
    });

    render(<App />);

    const listItemLink = await screen.findByText(resultsMock[0].name); // замените на актуальное имя элемента
    expect(listItemLink).toBeDefined();

    fireEvent.click(listItemLink);

    await waitFor(() => {
      expect(screen.getByTestId('details')).toBeDefined();
    });
  });

  it('should navigate to Details and start fetch data and render component with this data', async () => {
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
      expect(screen.getByTestId('card')).toBeDefined();
    });

    expect(screen.getByText('pikachu')).toBeDefined();
    expect(screen.getByText('electric')).toBeDefined();
  });
});
