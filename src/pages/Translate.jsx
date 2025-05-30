import { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import Loading from '../components/common/Loading';
import { textAPI } from '../utils/api';
import {
  LanguageIcon,
  ArrowPathIcon,
  ClipboardDocumentIcon,
  ArrowsRightLeftIcon,
  TrashIcon,
  ClockIcon,
} from '@heroicons/react/24/outline';

const Translate = () => {
  const { user } = useAuth();
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [sourceLanguage, setSourceLanguage] = useState('en');
  const [targetLanguage, setTargetLanguage] = useState('es');
  const [translationHistory, setTranslationHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);
  const [error, setError] = useState('');

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'es', name: 'Spanish' },
    { code: 'fr', name: 'French' },
    { code: 'de', name: 'German' },
    { code: 'it', name: 'Italian' },
    { code: 'pt', name: 'Portuguese' },
    { code: 'ru', name: 'Russian' },
    { code: 'zh', name: 'Chinese' },
    { code: 'ja', name: 'Japanese' },
    { code: 'ko', name: 'Korean' },
    { code: 'ar', name: 'Arabic' },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    setIsLoading(true);
    setError('');
    try {
      const result = await textAPI.translate(input, targetLanguage);
      setOutput(result);
      // Add to translation history
      const newHistoryItem = {
        id: Date.now(),
        sourceText: input,
        translatedText: result,
        sourceLang: sourceLanguage,
        targetLang: targetLanguage,
        timestamp: new Date().toISOString(),
      };
      setTranslationHistory(prev => [newHistoryItem, ...prev].slice(0, 10));
    } catch (error) {
      setError(error.message || 'Sorry, I encountered an error. Please try again.');
      setOutput('');
    } finally {
      setIsLoading(false);
    }
  };

  const swapLanguages = () => {
    setSourceLanguage(targetLanguage);
    setTargetLanguage(sourceLanguage);
  };

  const clearAll = () => {
    setInput('');
    setOutput('');
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(output);
  };

  const loadFromHistory = (item) => {
    setInput(item.sourceText);
    setSourceLanguage(item.sourceLang);
    setTargetLanguage(item.targetLang);
    setOutput(item.translatedText);
    setShowHistory(false);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
      },
    },
  };

  return (
    <div className="min-h-screen bg-black">
      <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="space-y-6"
        >
          {/* Header */}
          <motion.div
            variants={itemVariants}
            className="bg-gray-900 rounded-xl sm:rounded-2xl shadow-lg border border-purple-500/20 p-4 sm:p-6"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <LanguageIcon className="h-8 w-8 text-purple-500" />
                <div>
                  <h1 className="text-xl sm:text-2xl font-bold text-purple-500">
                    Translate
                  </h1>
                  <p className="text-sm text-purple-300">
                    Translate text between multiple languages
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowHistory(!showHistory)}
                className="flex items-center space-x-2 text-purple-300 hover:text-purple-500 transition-colors duration-200"
              >
                <ClockIcon className="h-5 w-5" />
                <span>History</span>
              </button>
            </div>
          </motion.div>

          {/* Language Selection */}
          <motion.div
            variants={itemVariants}
            className="bg-gray-900 rounded-xl sm:rounded-2xl shadow-lg border border-purple-500/20 p-4 sm:p-6"
          >
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-end">
              <div>
                <label className="block text-sm font-medium text-purple-300 mb-2">
                  From
                </label>
                <select
                  value={sourceLanguage}
                  onChange={(e) => setSourceLanguage(e.target.value)}
                  className="w-full bg-gray-800 text-purple-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  {languages.map((language) => (
                    <option key={language.code} value={language.code}>
                      {language.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex justify-center">
                <button
                  onClick={swapLanguages}
                  className="p-2 text-purple-300 hover:text-purple-500 transition-colors duration-200"
                >
                  <ArrowsRightLeftIcon className="h-6 w-6" />
                </button>
              </div>
              <div>
                <label className="block text-sm font-medium text-purple-300 mb-2">
                  To
                </label>
                <select
                  value={targetLanguage}
                  onChange={(e) => setTargetLanguage(e.target.value)}
                  className="w-full bg-gray-800 text-purple-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  {languages.map((language) => (
                    <option key={language.code} value={language.code}>
                      {language.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </motion.div>

          {/* Input Form */}
          <motion.form
            variants={itemVariants}
            onSubmit={handleSubmit}
            className="bg-gray-900 rounded-xl sm:rounded-2xl shadow-lg border border-purple-500/20 p-4 sm:p-6"
          >
            <div className="relative">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Enter text to translate..."
                className="w-full h-32 bg-gray-800 text-purple-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
                disabled={isLoading}
              />
              <div className="absolute bottom-2 right-2 text-xs text-purple-400">
                {input.length} characters
              </div>
            </div>
            <div className="mt-4 flex justify-end space-x-2">
              <button
                type="button"
                onClick={clearAll}
                className="bg-gray-700 text-purple-300 rounded-lg px-4 py-2 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-colors duration-200"
                disabled={isLoading}
              >
                <TrashIcon className="h-5 w-5 inline-block mr-1" />
                Clear
              </button>
              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="bg-purple-500 text-white rounded-lg px-4 py-2 hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
              >
                {isLoading ? (
                  <Loading size="sm" />
                ) : (
                  <span>Translate</span>
                )}
              </button>
            </div>
          </motion.form>

          {/* Error Message */}
          {error && (
            <motion.div
              variants={itemVariants}
              className="bg-red-500/10 border border-red-500/20 rounded-xl p-4"
            >
              <p className="text-red-500">{error}</p>
            </motion.div>
          )}

          {/* Output */}
          {output && (
            <motion.div
              variants={itemVariants}
              className="bg-gray-900 rounded-xl sm:rounded-2xl shadow-lg border border-purple-500/20 p-4 sm:p-6"
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-purple-500">Translation</h2>
                <button
                  onClick={copyToClipboard}
                  className="text-purple-300 hover:text-purple-500 transition-colors duration-200"
                >
                  <ClipboardDocumentIcon className="h-5 w-5" />
                </button>
              </div>
              <div className="bg-gray-800 rounded-lg p-4">
                <p className="text-purple-300 whitespace-pre-wrap">{output}</p>
              </div>
            </motion.div>
          )}

          {/* History */}
          {showHistory && (
            <motion.div
              variants={itemVariants}
              className="bg-gray-900 rounded-xl sm:rounded-2xl shadow-lg border border-purple-500/20 p-4 sm:p-6"
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-purple-500">History</h2>
                <button
                  onClick={() => setShowHistory(false)}
                  className="text-purple-300 hover:text-purple-500 transition-colors duration-200"
                >
                  Close
                </button>
              </div>
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {translationHistory.length === 0 ? (
                  <p className="text-purple-300">No history yet.</p>
                ) : (
                  translationHistory.map((item) => (
                    <div
                      key={item.id}
                      className="bg-gray-800 rounded-lg p-3 flex justify-between items-center cursor-pointer hover:bg-gray-700 transition-colors duration-200"
                      onClick={() => loadFromHistory(item)}
                    >
                      <div>
                        <p className="text-purple-300 text-sm">{item.sourceText}</p>
                        <p className="text-purple-400 text-xs mt-1">
                          {item.sourceLang} → {item.targetLang} | {new Date(item.timestamp).toLocaleString()}
                        </p>
                      </div>
                      <ClipboardDocumentIcon className="h-5 w-5 text-purple-400" />
                    </div>
                  ))
                )}
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Translate; 