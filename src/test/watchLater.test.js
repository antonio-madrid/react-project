import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderWithProviders } from './utils'
import App from '../App'

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

// Repeated test
it('Watch Later movies page', async () => {
    renderWithProviders(<App />)

    await userEvent.type(screen.getByPlaceholderText('Search movies...'), 'Forrest Gump')
    await waitFor(() => {
        expect(screen.getAllByText((content, element) => {
            return element.textContent === 'Forrest Gump'
        })[0]).toBeInTheDocument()
    }, { timeout: 2000});

    const watchLaterLink = screen.getAllByTestId('watch-later')[0]
    await waitFor(() => {
        expect(watchLaterLink).toBeInTheDocument()
    })

    await userEvent.click(watchLaterLink)
    await waitFor(() => {
        expect(screen.getByTestId('remove-watch-later')).toBeInTheDocument()
    })

    await userEvent.click(screen.getAllByTestId('remove-watch-later')[0])
})