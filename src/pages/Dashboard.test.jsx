import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Dashboard from './Dashboard';

describe('Dashboard Component', () => {
  it('renders the dashboard with welcome message', () => {
    render(
      <BrowserRouter>
        <Dashboard />
      </BrowserRouter>
    );

    expect(screen.getByText('Welcome to NexaHub')).toBeInTheDocument();
    expect(screen.getByText('Your AI-powered productivity platform')).toBeInTheDocument();
  });

  it('renders feature cards', () => {
    render(
      <BrowserRouter>
        <Dashboard />
      </BrowserRouter>
    );

    expect(screen.getByText('Resume & Portfolio Builder')).toBeInTheDocument();
    expect(screen.getByText('StudyGPT')).toBeInTheDocument();
    expect(screen.getByText('Text Toolkit')).toBeInTheDocument();
  });

  it('navigates to resume builder when card is clicked', () => {
    render(
      <BrowserRouter>
        <Dashboard />
      </BrowserRouter>
    );

    const resumeCard = screen.getByText('Resume & Portfolio Builder').closest('a');
    fireEvent.click(resumeCard);

    expect(window.location.pathname).toBe('/resume');
  });

  it('navigates to study gpt when card is clicked', () => {
    render(
      <BrowserRouter>
        <Dashboard />
      </BrowserRouter>
    );

    const studyCard = screen.getByText('StudyGPT').closest('a');
    fireEvent.click(studyCard);

    expect(window.location.pathname).toBe('/study');
  });

  it('navigates to text toolkit when card is clicked', () => {
    render(
      <BrowserRouter>
        <Dashboard />
      </BrowserRouter>
    );

    const textCard = screen.getByText('Text Toolkit').closest('a');
    fireEvent.click(textCard);

    expect(window.location.pathname).toBe('/text');
  });

  it('displays feature descriptions', () => {
    render(
      <BrowserRouter>
        <Dashboard />
      </BrowserRouter>
    );

    expect(screen.getByText(/Create professional resumes/i)).toBeInTheDocument();
    expect(screen.getByText(/Generate study materials/i)).toBeInTheDocument();
    expect(screen.getByText(/Transform your text/i)).toBeInTheDocument();
  });

  it('displays feature icons', () => {
    render(
      <BrowserRouter>
        <Dashboard />
      </BrowserRouter>
    );

    expect(screen.getByTestId('resume-icon')).toBeInTheDocument();
    expect(screen.getByTestId('study-icon')).toBeInTheDocument();
    expect(screen.getByTestId('text-icon')).toBeInTheDocument();
  });
}); 