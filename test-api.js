const axios = require('axios');

const API_URL = 'http://localhost:3001/api/text';

async function testSummarization() {
  console.log('\nTesting Summarization:');
  try {
    const response = await axios.post(API_URL, {
      operation: 'summarize',
      text: 'Artificial Intelligence (AI) is transforming the world in unprecedented ways. One major benefit is AI\'s ability to analyze massive amounts of data quickly. This rapid growth also raises ethical concerns, including job displacement and bias in algorithms. As AI continues to evolve, it is essential to ensure responsible development that benefits society as a whole.'
    });
    console.log('Summarization Result:', response.data.result);
  } catch (error) {
    console.error('Summarization Error:', error.response?.data || error.message);
  }
}

async function testTranslation() {
  console.log('\nTesting Translation:');
  try {
    const response = await axios.post(API_URL, {
      operation: 'translate',
      text: 'Hello, how are you today?',
      targetLanguage: 'zh'
    });
    console.log('Translation Result:', response.data.result);
  } catch (error) {
    console.error('Translation Error:', error.response?.data || error.message);
  }
}

async function runTests() {
  console.log('Starting API Tests...');
  await testSummarization();
  await testTranslation();
  console.log('\nTests completed.');
}

runTests(); 