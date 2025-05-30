import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import NotFound from './NotFound';

describe('NotFound Component', () => {
  it('renders the 404 page with error message', () => {
    render(
      <BrowserRouter>
        <NotFound />
      </BrowserRouter>
    );

    expect(screen.getByText('404')).toBeInTheDocument();
    expect(screen.getByText('Page not found')).toBeInTheDocument();
    expect(screen.getByText(/The page you are looking for does not exist/i)).toBeInTheDocument();
  });

  it('renders a back to home button', () => {
    render(
      <BrowserRouter>
        <NotFound />
      </BrowserRouter>
    );

    const backButton = screen.getByRole('button', { name: /back to home/i });
    expect(backButton).toBeInTheDocument();
  });

  it('navigates to home when back button is clicked', () => {
    render(
      <BrowserRouter>
        <NotFound />
      </BrowserRouter>
    );

    const backButton = screen.getByRole('button', { name: /back to home/i });
    fireEvent.click(backButton);

    expect(window.location.pathname).toBe('/');
  });

  it('displays an error illustration', () => {
    render(
      <BrowserRouter>
        <NotFound />
      </BrowserRouter>
    );

    expect(screen.getByTestId('error-illustration')).toBeInTheDocument();
  });
}); 