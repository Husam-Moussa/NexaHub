import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Navbar from './Navbar';
import { useStore } from '../../store';

// Mock the store
vi.mock('../../store', () => ({
  useStore: vi.fn(),
}));

describe('Navbar Component', () => {
  const mockToggleDarkMode = vi.fn();

  beforeEach(() => {
    useStore.mockImplementation((selector) => ({
      isDarkMode: false,
      toggleDarkMode: mockToggleDarkMode,
    }));
  });

  it('renders the navbar with logo and theme toggle', () => {
    render(
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>
    );

    expect(screen.getByText('NexaHub')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /toggle theme/i })).toBeInTheDocument();
  });

  it('toggles dark mode when theme button is clicked', () => {
    render(
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>
    );

    const themeButton = screen.getByRole('button', { name: /toggle theme/i });
    fireEvent.click(themeButton);

    expect(mockToggleDarkMode).toHaveBeenCalled();
  });

  it('shows sun icon in dark mode', () => {
    useStore.mockImplementation((selector) => ({
      isDarkMode: true,
      toggleDarkMode: mockToggleDarkMode,
    }));

    render(
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>
    );

    expect(screen.getByTestId('sun-icon')).toBeInTheDocument();
  });

  it('shows moon icon in light mode', () => {
    useStore.mockImplementation((selector) => ({
      isDarkMode: false,
      toggleDarkMode: mockToggleDarkMode,
    }));

    render(
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>
    );

    expect(screen.getByTestId('moon-icon')).toBeInTheDocument();
  });

  it('navigates to home when logo is clicked', () => {
    render(
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>
    );

    const logo = screen.getByText('NexaHub');
    fireEvent.click(logo);

    expect(window.location.pathname).toBe('/');
  });
}); 