import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderWithProviders } from "./test/utils"
import App from './App'

beforeAll(() => {
  global.IntersectionObserver = class IntersectionObserver {
    constructor(callback, options) {
      this.callback = callback;
      this.options = options;
    }

    observe(target) {
      this.callback([{ isIntersecting: true, target }]);
    }

    unobserve() {}

    disconnect() {}
  };
});

it('renders watch later link', () => {
  renderWithProviders(<App />)
  const linkElement = screen.getByText(/watch later/i)
  expect(linkElement).toBeInTheDocument()
})

it('search for movies', async () => {
  renderWithProviders(<App />)
  await userEvent.type(screen.getByPlaceholderText('Search movies...'), 'Forrest Gump')
  await waitFor(() => {
    expect(screen.getAllByText((content, element) => {
      return element.textContent === 'Forrest Gump'
    })[0]).toBeInTheDocument()
  }, { timeout: 2000});
})

it('renders watch later component', async() => {
  renderWithProviders(<App />)
  const user = userEvent.setup()
  await user.click(screen.getByText(/watch later/i))
  expect(screen.getByText(/You have no movies saved to watch later/i)).toBeInTheDocument()
})


it('renders starred component', async() => {
  renderWithProviders(<App />)
  const user = userEvent.setup()
  await user.click(screen.getByTestId('nav-starred'))
  expect(screen.getByText(/There are no starred movies/i)).toBeInTheDocument()
  await waitFor(() => {
    expect(screen.getByTestId('starred')).toBeInTheDocument()
  })  
})
