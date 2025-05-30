import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

// Mock the components
vi.mock('./components/layout/Navbar', () => ({
  default: () => <div data-testid="navbar">Navbar</div>,
}));

vi.mock('./components/layout/Sidebar', () => ({
  default: () => <div data-testid="sidebar">Sidebar</div>,
}));

vi.mock('./components/common/ErrorBoundary', () => ({
  default: ({ children }) => <div data-testid="error-boundary">{children}</div>,
}));

describe('App Component', () => {
  it('renders the app with layout components', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );

    expect(screen.getByTestId('navbar')).toBeInTheDocument();
    expect(screen.getByTestId('sidebar')).toBeInTheDocument();
    expect(screen.getByTestId('error-boundary')).toBeInTheDocument();
  });

  it('renders the dashboard by default', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );

    expect(screen.getByText('Welcome to NexaHub')).toBeInTheDocument();
  });

  it('renders the resume builder page', () => {
    window.history.pushState({}, '', '/resume');
    
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );

    expect(screen.getByText('Resume Builder')).toBeInTheDocument();
  });

  it('renders the study gpt page', () => {
    window.history.pushState({}, '', '/study');
    
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );

    expect(screen.getByText('StudyGPT')).toBeInTheDocument();
  });

  it('renders the text toolkit page', () => {
    window.history.pushState({}, '', '/text');
    
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );

    expect(screen.getByText('Text Toolkit')).toBeInTheDocument();
  });

  it('renders 404 page for unknown routes', () => {
    window.history.pushState({}, '', '/unknown');
    
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );

    expect(screen.getByText('404')).toBeInTheDocument();
    expect(screen.getByText('Page not found')).toBeInTheDocument();
  });
}); 