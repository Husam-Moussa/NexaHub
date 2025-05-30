import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Sidebar from './Sidebar';
import { useStore } from '../../store';

// Mock the store
vi.mock('../../store', () => ({
  useStore: vi.fn(),
}));

describe('Sidebar Component', () => {
  beforeEach(() => {
    useStore.mockImplementation((selector) => ({
      isDarkMode: false,
    }));
  });

  it('renders the sidebar with navigation links', () => {
    render(
      <BrowserRouter>
        <Sidebar />
      </BrowserRouter>
    );

    expect(screen.getByText('Dashboard')).toBeInTheDocument();
    expect(screen.getByText('Resume Builder')).toBeInTheDocument();
    expect(screen.getByText('StudyGPT')).toBeInTheDocument();
    expect(screen.getByText('Text Toolkit')).toBeInTheDocument();
  });

  it('navigates to dashboard when clicked', () => {
    render(
      <BrowserRouter>
        <Sidebar />
      </BrowserRouter>
    );

    const dashboardLink = screen.getByText('Dashboard');
    fireEvent.click(dashboardLink);

    expect(window.location.pathname).toBe('/');
  });

  it('navigates to resume builder when clicked', () => {
    render(
      <BrowserRouter>
        <Sidebar />
      </BrowserRouter>
    );

    const resumeLink = screen.getByText('Resume Builder');
    fireEvent.click(resumeLink);

    expect(window.location.pathname).toBe('/resume');
  });

  it('navigates to study gpt when clicked', () => {
    render(
      <BrowserRouter>
        <Sidebar />
      </BrowserRouter>
    );

    const studyLink = screen.getByText('StudyGPT');
    fireEvent.click(studyLink);

    expect(window.location.pathname).toBe('/study');
  });

  it('navigates to text toolkit when clicked', () => {
    render(
      <BrowserRouter>
        <Sidebar />
      </BrowserRouter>
    );

    const textLink = screen.getByText('Text Toolkit');
    fireEvent.click(textLink);

    expect(window.location.pathname).toBe('/text');
  });

  it('highlights active link', () => {
    window.history.pushState({}, '', '/resume');

    render(
      <BrowserRouter>
        <Sidebar />
      </BrowserRouter>
    );

    const resumeLink = screen.getByText('Resume Builder');
    expect(resumeLink).toHaveClass('bg-indigo-500');
  });

  it('applies dark mode styles', () => {
    useStore.mockImplementation((selector) => ({
      isDarkMode: true,
    }));

    render(
      <BrowserRouter>
        <Sidebar />
      </BrowserRouter>
    );

    const sidebar = screen.getByRole('navigation');
    expect(sidebar).toHaveClass('dark:bg-gray-800');
  });
}); 