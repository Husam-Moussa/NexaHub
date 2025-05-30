const express = require('express');
const cors = require('cors');
const axios = require('axios');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// Deep AI API configuration
const DEEP_AI_API_KEY = process.env.DEEP_AI_API_KEY;
const DEEP_AI_BASE_URL = 'https://api.deepai.org/api';

// Email configuration
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_APP_PASSWORD,
  },
});

// Store verification codes (in production, use a proper database)
const verificationCodes = new Map();

// Generate verification code
const generateVerificationCode = () => {
  return crypto.randomInt(100000, 999999).toString();
};

// Send verification email
const sendVerificationEmail = async (email, code) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Verify Your NexaHub Account',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #8B5CF6;">Welcome to NexaHub!</h2>
        <p>Thank you for signing up. Please use the following verification code to complete your registration:</p>
        <div style="background-color: #1F2937; padding: 20px; border-radius: 8px; text-align: center; margin: 20px 0;">
          <h1 style="color: #8B5CF6; margin: 0; font-size: 32px;">${code}</h1>
        </div>
        <p>This code will expire in 10 minutes.</p>
        <p>If you didn't request this verification, please ignore this email.</p>
        <p style="color: #6B7280; font-size: 12px; margin-top: 20px;">
          This is an automated message, please do not reply to this email.
        </p>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    return true;
  } catch (error) {
    console.error('Error sending verification email:', error);
    return false;
  }
};

// Routes
app.post('/api/send-verification', async (req, res) => {
  const { email } = req.body;
  
  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }

  try {
    const code = generateVerificationCode();
    verificationCodes.set(email, {
      code,
      timestamp: Date.now(),
      attempts: 0
    });

    const sent = await sendVerificationEmail(email, code);
    
    if (sent) {
      res.json({ message: 'Verification code sent successfully' });
    } else {
      res.status(500).json({ error: 'Failed to send verification code' });
    }
  } catch (error) {
    console.error('Error in send-verification:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/api/verify-code', (req, res) => {
  const { email, code } = req.body;

  if (!email || !code) {
    return res.status(400).json({ error: 'Email and code are required' });
  }

  const verification = verificationCodes.get(email);

  if (!verification) {
    return res.status(400).json({ error: 'No verification code found for this email' });
  }

  // Check if code has expired (10 minutes)
  if (Date.now() - verification.timestamp > 10 * 60 * 1000) {
    verificationCodes.delete(email);
    return res.status(400).json({ error: 'Verification code has expired' });
  }

  // Check if too many attempts
  if (verification.attempts >= 3) {
    verificationCodes.delete(email);
    return res.status(400).json({ error: 'Too many attempts. Please request a new code.' });
  }

  // Increment attempts
  verification.attempts++;

  if (verification.code === code) {
    verificationCodes.delete(email);
    res.json({ message: 'Code verified successfully' });
  } else {
    res.status(400).json({ error: 'Invalid verification code' });
  }
});

// Helper function for text generation using Deep AI
async function generateText(model, prompt, parameters = {}) {
  try {
    console.log(`Generating text with model: ${model}`);
    console.log(`Prompt: ${prompt}`);

    let endpoint;
    let requestData = {};
    let headers = {
      'Api-Key': DEEP_AI_API_KEY,
      'Content-Type': 'application/x-www-form-urlencoded'
    };

    switch (model) {
      case 'summarize':
        endpoint = '/summarization';
        requestData = new URLSearchParams({ text: prompt });
        break;
      case 'translate':
        endpoint = '/neural-machine-translation';
        requestData = new URLSearchParams({ 
          text: prompt,
          target_language: parameters.targetLanguage || 'en'
        });
        break;
      case 'text-generator':
        endpoint = '/text-generator';
        requestData = new URLSearchParams({ text: prompt });
        break;
      default:
        throw new Error('Unsupported model type');
    }

    const response = await axios.post(
      `${DEEP_AI_BASE_URL}${endpoint}`,
      requestData,
      { headers }
    );

    if (!response.data || !response.data.output) {
      throw new Error('No response from Deep AI');
    }

    console.log(`Generated text: ${response.data.output}`);
    return response.data.output;
  } catch (error) {
    console.error(`Error generating text with model ${model}:`, error.response?.data || error.message);
    if (error.response?.status === 401) {
      throw new Error('Deep AI API key is invalid or out of credits. Please check your API key and credits in the Deep AI dashboard.');
    }
    throw error;
  }
}

// Text processing endpoint (summarize or translate)
app.post('/api/text', async (req, res) => {
  try {
    const { operation, text, targetLanguage, style } = req.body;
    console.log('Received text request:', req.body);

    if (!text) {
      return res.status(400).json({ error: 'Text is required' });
    }

    if (operation === 'summarize') {
      try {
        const summary = await generateText(
          'summarize',
          text
        );
        return res.json({ result: summary });
      } catch (error) {
        console.error('Summarization error:', error);
        return res.status(500).json({ error: 'Summarization failed', details: error.message });
      }
    }

    if (operation === 'translate') {
      if (!targetLanguage) {
        return res.status(400).json({ error: 'Target language is required' });
      }
      try {
        const translation = await generateText(
          'translate',
          text,
          { targetLanguage }
        );
        return res.json({ result: translation });
      } catch (error) {
        console.error('Translation error:', error);
        return res.status(500).json({ error: 'Translation failed', details: error.message });
      }
    }
    return res.status(400).json({ error: 'Invalid operation' });
  } catch (error) {
    console.error('Text processing error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

// Tools generation endpoint
app.post('/api/tools/generate', async (req, res) => {
  try {
    const { type, data } = req.body;
    console.log('Received tools request:', { type, data });

    if (!type || !data) {
      return res.status(400).json({ error: 'Type and data are required' });
    }

    let prompt;
    let model = 'text-generator';
    let parameters = {};

    switch (type) {
      case 'resume':
        prompt = `Generate a professional resume based on the following information. Format it nicely with sections for Education, Experience, and Skills. Make it concise and impactful:\n${JSON.stringify(data, null, 2)}`;
        parameters = { max_length: 1000, temperature: 0.7 };
        break;
      case 'study':
        prompt = `Create comprehensive study materials for the following topic. Include key concepts, examples, and explanations. Make it easy to understand and well-structured:\n${JSON.stringify(data, null, 2)}`;
        parameters = { max_length: 1500, temperature: 0.7 };
        break;
      case 'quiz':
        prompt = `Generate a quiz with questions and answers based on this study material. Include multiple choice questions with 4 options each. Make the questions challenging but fair:\n${JSON.stringify(data, null, 2)}`;
        parameters = { max_length: 1000, temperature: 0.7 };
        break;
      case 'text_enhance':
        const textToEnhance = typeof data.text === 'object' ? data.text.text : data.text;
        if (data.style === 'rewrite') {
          prompt = `Rewrite the following text in a different style, making it clear and engaging:\n${textToEnhance}`;
        } else {
          prompt = `Enhance and improve the following text while maintaining its meaning. Make it more professional, engaging, and well-written:\n${textToEnhance}`;
        }
        parameters = { max_length: 500, temperature: 0.7 };
        break;
      default:
        return res.status(400).json({ error: 'Unsupported tool type' });
    }

    try {
      const generatedContent = await generateText(model, prompt, parameters);
      if (!generatedContent) {
        throw new Error('Empty response received from Deep AI');
      }
      return res.json({ result: generatedContent });
    } catch (error) {
      console.error('Content generation error:', error);
      return res.status(500).json({ 
        error: 'Content generation failed', 
        details: error.message || 'Unknown error occurred'
      });
    }
  } catch (error) {
    console.error('Tools generation error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

// Chat endpoint for NexaHubChat
app.post('/api/chat', async (req, res) => {
  try {
    const { message, history = [] } = req.body;
    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    try {
      const response = await generateText(
        'text-generator',
        message,
        { 
          max_length: 500,
          temperature: 0.7
        }
      );
      
      return res.json({ response });
    } catch (error) {
      console.error('Chat error:', error);
      return res.status(500).json({ 
        error: 'Failed to get chat response', 
        details: error.message 
      });
    }
  } catch (error) {
    console.error('Chat error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
  console.log(`Deep AI API Key: ${process.env.DEEP_AI_API_KEY ? 'Configured' : 'Not configured'}`);
}); 