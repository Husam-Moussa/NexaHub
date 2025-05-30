import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import ErrorBoundary from './ErrorBoundary';

const ThrowError = () => {
  throw new Error('Test error');
};

describe('ErrorBoundary Component', () => {
  const consoleError = console.error;
  
  beforeAll(() => {
    console.error = vi.fn();
  });

  afterAll(() => {
    console.error = consoleError;
  });

  it('renders children when there is no error', () => {
    const { container } = render(
      <ErrorBoundary>
        <div>Test content</div>
      </ErrorBoundary>
    );
    expect(container.textContent).toBe('Test content');
  });

  it('renders error UI when there is an error', () => {
    const { container } = render(
      <ErrorBoundary>
        <ThrowError />
      </ErrorBoundary>
    );

    expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();
    expect(screen.getByRole('button')).toHaveTextContent(/refresh page/i);
  });

  it('calls componentDidCatch when there is an error', () => {
    const spy = vi.spyOn(ErrorBoundary.prototype, 'componentDidCatch');
    
    render(
      <ErrorBoundary>
        <ThrowError />
      </ErrorBoundary>
    );

    expect(spy).toHaveBeenCalled();
  });

  it('refreshes the page when refresh button is clicked', () => {
    const { reload } = window.location;
    delete window.location;
    window.location = { reload: vi.fn() };

    render(
      <ErrorBoundary>
        <ThrowError />
      </ErrorBoundary>
    );

    fireEvent.click(screen.getByRole('button'));
    expect(window.location.reload).toHaveBeenCalled();

    window.location.reload = reload;
  });
}); 