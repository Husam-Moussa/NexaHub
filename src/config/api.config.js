export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_URL || 'http://localhost:3001',
  ENDPOINTS: {
    TEXT: '/api/text',
    VERIFICATION: {
      SEND: '/api/send-verification',
      VERIFY: '/api/verify-code'
    },
    TOOLS: '/api/tools/generate'
  },
  SUPPORTED_LANGUAGES: {
    'zh': 'Chinese',
    'es': 'Spanish',
    'fr': 'French',
    'de': 'German',
    'it': 'Italian',
    'pt': 'Portuguese',
    'ru': 'Russian',
    'ja': 'Japanese',
    'ko': 'Korean'
  }
};

export const API_OPERATIONS = {
  SUMMARIZE: 'summarize',
  TRANSLATE: 'translate',
  GENERATE: 'generate'
};

export const TOOL_TYPES = {
  RESUME: 'resume',
  STUDY: 'study',
  QUIZ: 'quiz',
  TEXT_ENHANCE: 'text_enhance'
}; 