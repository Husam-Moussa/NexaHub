import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Loading from './Loading';

describe('Loading Component', () => {
  it('renders with default props', () => {
    render(<Loading />);
    const loadingElement = screen.getByRole('status');
    expect(loadingElement).toBeInTheDocument();
  });

  it('renders with custom size', () => {
    render(<Loading size="lg" />);
    const loadingElement = screen.getByRole('status');
    expect(loadingElement).toHaveClass('w-12 h-12');
  });

  it('renders with custom text', () => {
    const text = 'Loading...';
    render(<Loading text={text} />);
    expect(screen.getByText(text)).toBeInTheDocument();
  });

  it('renders with different sizes', () => {
    const { rerender } = render(<Loading size="sm" />);
    expect(screen.getByRole('status')).toHaveClass('w-4 h-4');

    rerender(<Loading size="md" />);
    expect(screen.getByRole('status')).toHaveClass('w-8 h-8');

    rerender(<Loading size="lg" />);
    expect(screen.getByRole('status')).toHaveClass('w-12 h-12');
  });
}); 