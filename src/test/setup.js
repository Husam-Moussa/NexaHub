import '@testing-library/jest-dom';
import { vi } from 'vitest';

// Mock the environment variables
vi.mock('../utils/env', () => ({
  VITE_HUGGINGFACE_API_KEY: 'test-api-key',
}));

// Mock the window.matchMedia function
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
}); 