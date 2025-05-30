import axios from 'axios';
import { API_CONFIG, TOOL_TYPES } from '../config/api.config';

const API_BASE_URL = 'http://localhost:3001/api';

// Helper function for making API calls
const apiCall = async (endpoint, options = {}) => {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    // Check if the response is JSON
    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      throw new Error(`Expected JSON response but got ${contentType}`);
    }

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || `HTTP error! status: ${response.status}`);
    }

    return data;
  } catch (error) {
    console.error('API Error:', {
      endpoint,
      error: error.message,
      status: error.status,
      stack: error.stack
    });
    throw error;
  }
};

// Authentication API calls
export const auth = {
  signup: async (email, password, name) => {
    return apiCall('/auth/signup', {
      method: 'POST',
      body: JSON.stringify({ email, password, name }),
    });
  },

  signin: async (email, password) => {
    return apiCall('/auth/signin', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  },

  signout: async () => {
    return apiCall('/auth/signout', {
      method: 'POST',
    });
  },
};

// Verification API calls
export const verification = {
  sendCode: async (email) => {
    return apiCall('/send-verification', {
      method: 'POST',
      body: JSON.stringify({ email }),
    });
  },

  verifyCode: async (email, code) => {
    return apiCall('/verify-code', {
      method: 'POST',
      body: JSON.stringify({ email, code }),
    });
  },
};

// Text processing API calls
export const textProcessing = {
  summarize: async (text) => {
    return apiCall('/text', {
      method: 'POST',
      body: JSON.stringify({ operation: 'summarize', text }),
    });
  },

  translate: async (text, targetLanguage) => {
    return apiCall('/text', {
      method: 'POST',
      body: JSON.stringify({ operation: 'translate', text, targetLanguage }),
    });
  },
};

// Tools generation API calls
export const tools = {
  generateResume: async (data) => {
    return apiCall('/tools/generate', {
      method: 'POST',
      body: JSON.stringify({ type: 'resume', data }),
    });
  },

  generateStudyContent: async (data) => {
    return apiCall('/tools/generate', {
      method: 'POST',
      body: JSON.stringify({ type: 'study', data }),
    });
  },

  generateQuiz: async (data) => {
    return apiCall('/tools/generate', {
      method: 'POST',
      body: JSON.stringify({ type: 'quiz', data }),
    });
  },

  enhanceText: async (text) => {
    return apiCall('/tools/generate', {
      method: 'POST',
      body: JSON.stringify({ type: 'text_enhance', data: { text } }),
    });
  },
};

// Chat API calls
export const chat = {
  sendMessage: async (message, history = []) => {
    return apiCall('/chat', {
      method: 'POST',
      body: JSON.stringify({ message, history }),
    });
  },
};

// User profile API calls
export const profile = {
  updateProfile: async (data) => {
    return apiCall('/profile', {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },

  getProfile: async () => {
    return apiCall('/profile', {
      method: 'GET',
    });
  },
};

export const textAPI = textProcessing;
export const toolsAPI = tools;
export const chatAPI = chat;

export default {
  auth,
  verification,
  textProcessing,
  tools,
  chat,
  profile,
}; 