const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

const API_BASE_URL = 'http://localhost:3001/api';

// Test data
const testText = "Artificial Intelligence (AI) is transforming the world in unprecedented ways. One major benefit is AI's ability to analyze massive amounts of data quickly. This rapid growth also raises ethical concerns, including job displacement and bias in algorithms.";
const testEmail = 'test@example.com';

async function testEndpoint(endpoint, data) {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();
    return result;
  } catch (error) {
    console.error(`Error calling ${endpoint}:`, error.message);
    throw error;
  }
}

async function runTests() {
  console.log('Starting API Tests...\n');

  // Test Chat
  console.log('Testing Chat:');
  try {
    const chatResult = await testEndpoint('/chat', {
      message: 'What is artificial intelligence?'
    });
    console.log('Chat Response:', chatResult.response);
  } catch (error) {
    console.log('Chat test failed\n');
  }

  // Test Summarization
  console.log('\nTesting Summarization:');
  try {
    const summaryResult = await testEndpoint('/text', {
      operation: 'summarize',
      text: 'Artificial Intelligence (AI) is transforming the world in unprecedented ways. From healthcare to transportation, AI is revolutionizing how we live and work. Machine learning algorithms can now diagnose diseases, predict weather patterns, and even drive cars. However, this rapid advancement also raises important ethical concerns, including job displacement and bias in algorithms.'
    });
    console.log('Summarization Result:', summaryResult.result);
  } catch (error) {
    console.log('Summarization test failed\n');
  }

  // Test Translation
  console.log('\nTesting Translation:');
  try {
    const translationResult = await testEndpoint('/text', {
      operation: 'translate',
      text: 'Hello, how are you?',
      targetLanguage: 'es'
    });
    console.log('Translation Result:', translationResult.result);
  } catch (error) {
    console.log('Translation test failed\n');
  }

  // Test Resume Generation
  console.log('\nTesting Resume Generation:');
  try {
    const resumeResult = await testEndpoint('/tools/generate', {
      type: 'resume',
      data: {
        name: 'John Doe',
        education: 'Bachelor in Computer Science',
        experience: '5 years as a Software Developer',
        skills: ['JavaScript', 'React', 'Node.js']
      }
    });
    console.log('Resume Result:', resumeResult.result);
  } catch (error) {
    console.log('Resume generation test failed\n');
  }

  // Test Study Content Generation
  console.log('\nTesting Study Content Generation:');
  try {
    const studyResult = await testEndpoint('/tools/generate', {
      type: 'study',
      data: {
        topic: 'Introduction to React',
        level: 'Beginner',
        keyPoints: ['Components', 'Props', 'State', 'Hooks']
      }
    });
    console.log('Study Content Result:', studyResult.result);
  } catch (error) {
    console.log('Study content generation test failed\n');
  }

  // Test Text Enhancement
  console.log('\nTesting Text Enhancement:');
  try {
    const enhanceResult = await testEndpoint('/tools/generate', {
      type: 'text_enhance',
      data: {
        text: 'The project was good and we finished it on time.'
      }
    });
    console.log('Enhanced Text Result:', enhanceResult.result);
  } catch (error) {
    console.log('Text enhancement test failed\n');
  }

  console.log('\nAll tests completed!');
}

runTests(); 