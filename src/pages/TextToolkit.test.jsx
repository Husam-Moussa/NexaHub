import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TextToolkit from './TextToolkit';
import * as api from '../utils/api';

// Mock the API functions
vi.mock('../utils/api', () => ({
  generateText: vi.fn(),
  summarizeText: vi.fn(),
  rewriteText: vi.fn(),
  translateText: vi.fn(),
  simplifyText: vi.fn(),
}));

describe('TextToolkit Component', () => {
  const mockText = 'This is a test text.';
  const mockResponse = 'Processed text';

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders the component with all actions', () => {
    render(<TextToolkit />);
    
    expect(screen.getByText('Text Toolkit')).toBeInTheDocument();
    expect(screen.getByText('Transform your text with AI-powered tools')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter your text here...')).toBeInTheDocument();
    expect(screen.getByText('Summarize')).toBeInTheDocument();
    expect(screen.getByText('Rewrite')).toBeInTheDocument();
    expect(screen.getByText('Translate')).toBeInTheDocument();
    expect(screen.getByText('Simplify')).toBeInTheDocument();
  });

  it('handles text input', async () => {
    render(<TextToolkit />);
    const textarea = screen.getByPlaceholderText('Enter your text here...');
    
    await userEvent.type(textarea, mockText);
    expect(textarea).toHaveValue(mockText);
  });

  it('changes selected action when clicking action buttons', async () => {
    render(<TextToolkit />);
    
    const rewriteButton = screen.getByText('Rewrite');
    await userEvent.click(rewriteButton);
    expect(rewriteButton).toHaveClass('bg-indigo-500');
    
    const translateButton = screen.getByText('Translate');
    await userEvent.click(translateButton);
    expect(translateButton).toHaveClass('bg-indigo-500');
  });

  it('processes text with summarize action', async () => {
    api.summarizeText.mockResolvedValueOnce(mockResponse);
    
    render(<TextToolkit />);
    const textarea = screen.getByPlaceholderText('Enter your text here...');
    const processButton = screen.getByText('Process Text');
    
    await userEvent.type(textarea, mockText);
    await userEvent.click(processButton);
    
    await waitFor(() => {
      expect(screen.getByText(mockResponse)).toBeInTheDocument();
    });
    expect(api.summarizeText).toHaveBeenCalledWith(mockText);
  });

  it('processes text with rewrite action', async () => {
    api.rewriteText.mockResolvedValueOnce(mockResponse);
    
    render(<TextToolkit />);
    const textarea = screen.getByPlaceholderText('Enter your text here...');
    const rewriteButton = screen.getByText('Rewrite');
    const processButton = screen.getByText('Process Text');
    
    await userEvent.type(textarea, mockText);
    await userEvent.click(rewriteButton);
    await userEvent.click(processButton);
    
    await waitFor(() => {
      expect(screen.getByText(mockResponse)).toBeInTheDocument();
    });
    expect(api.rewriteText).toHaveBeenCalledWith(mockText);
  });

  it('shows loading state while processing', async () => {
    api.summarizeText.mockImplementation(() => new Promise(resolve => setTimeout(() => resolve(mockResponse), 100)));
    
    render(<TextToolkit />);
    const textarea = screen.getByPlaceholderText('Enter your text here...');
    const processButton = screen.getByText('Process Text');
    
    await userEvent.type(textarea, mockText);
    await userEvent.click(processButton);
    
    expect(screen.getByText('Processing your text...')).toBeInTheDocument();
    
    await waitFor(() => {
      expect(screen.getByText(mockResponse)).toBeInTheDocument();
    });
  });

  it('handles API errors gracefully', async () => {
    const error = new Error('API Error');
    api.summarizeText.mockRejectedValueOnce(error);
    
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    
    render(<TextToolkit />);
    const textarea = screen.getByPlaceholderText('Enter your text here...');
    const processButton = screen.getByText('Process Text');
    
    await userEvent.type(textarea, mockText);
    await userEvent.click(processButton);
    
    await waitFor(() => {
      expect(consoleSpy).toHaveBeenCalledWith('Error processing text:', error);
    });
    
    consoleSpy.mockRestore();
  });
}); 