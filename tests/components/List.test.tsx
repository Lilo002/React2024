import { fireEvent, screen, waitFor } from '@testing-library/react';
import { ListItem } from '../../src/components/listItem/listItem';
import { List } from '../../src/components/list/list';
import { BrowserRouter } from 'react-router-dom';
import { handlers, resultsMock } from '../mocks';
import { App } from '../../src/app/App';
import { setupServer } from 'msw/node';
import { renderWithProviders } from '../test-utils';

const server = setupServer(...handlers);

describe('Navigation and Details Rendering', () => {
  beforeAll(() => server.listen());

  afterEach(() => server.resetHandlers());

  afterAll(() => server.close());

  it('should navigate to Details and render data on link click', async () => {
    renderWithProviders(<App />);

    const listItemLink = await screen.findByText(resultsMock[0].name);

    fireEvent.click(listItemLink);

    expect(screen.queryByText('details')).toBeNull();
  });
});

describe('ListItem render', () => {
  beforeAll(() => server.listen());

  afterEach(() => server.resetHandlers());

  afterAll(() => server.close());
  it('should render listItem with data', async () => {
    renderWithProviders(
      <BrowserRouter>
        <ListItem data={resultsMock[0]} />
      </BrowserRouter>,
    );

    await waitFor(() => {
      const item = screen.getByRole('listitem');
      expect(item).toBeInTheDocument();
      expect(screen.getByText(resultsMock[0].name)).toBeInTheDocument;

      const link = screen.getByRole('link');
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute('href', expect.stringContaining(`/pokemon/${resultsMock[0].name}`));
    });
  });
});

describe('List render', () => {
  beforeAll(() => server.listen());

  afterEach(() => server.resetHandlers());

  afterAll(() => server.close());

  it('should render list item', async () => {
    renderWithProviders(
      <BrowserRouter>
        <List results={resultsMock} />
      </BrowserRouter>,
    );

    await waitFor(() => {
      const list = screen.getByRole('list');
      const items = screen.getAllByRole('listitem');
      expect(list).toBeInTheDocument();
      expect(items.length).equal(resultsMock.length);
    });

    resultsMock.forEach((result) => {
      const link = screen.getByRole('link', { name: result.name });
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute('href', expect.stringContaining(`/pokemon/${result.name}`));
    });
  });

  it('should render loader if there is no data', async () => {
    renderWithProviders(
      <BrowserRouter>
        <List results={null} />
      </BrowserRouter>,
    );

    await waitFor(() => {
      const list = screen.getByRole('list');
      const items = screen.queryAllByRole('listitem');
      const errorMessage = screen.getByText(/Oops, this Pokémon doesn't exist yet/i);

      expect(list).toBeInTheDocument();
      expect(items.length).toEqual(0);
      expect(errorMessage).toBeInTheDocument();
    });
  });
});
