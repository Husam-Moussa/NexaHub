import { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import Loading from '../components/common/Loading';
import { textAPI, toolsAPI } from '../utils/api';
import {
  DocumentTextIcon,
  SparklesIcon,
  ArrowPathIcon,
  ClipboardDocumentIcon,
} from '@heroicons/react/24/outline';

const Summarize = () => {
  const { user } = useAuth();
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedTool, setSelectedTool] = useState('enhance');

  const tools = [
    {
      id: 'enhance',
      name: 'Enhance Writing',
      description: 'Improve your text with better vocabulary and structure',
      icon: SparklesIcon,
    },
    {
      id: 'grammar',
      name: 'Grammar Check',
      description: 'Fix grammar and punctuation errors',
      icon: DocumentTextIcon,
    },
    {
      id: 'rewrite',
      name: 'Rewrite',
      description: 'Rephrase your text in different styles',
      icon: ArrowPathIcon,
    },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    setIsLoading(true);
    setError('');
    try {
      let result;
      
      switch (selectedTool) {
        case 'enhance':
          result = await toolsAPI.enhanceText({ text: input });
          break;
        case 'grammar':
          result = await textAPI.summarize(input); // Using summarize endpoint for grammar check
          break;
        case 'rewrite':
          result = await toolsAPI.enhanceText({ 
            text: input,
            style: 'rewrite'
          });
          break;
        default:
          throw new Error('Invalid tool selected');
      }

      setOutput(result);
    } catch (error) {
      console.error('Error:', error);
      setError(error.message || 'Sorry, I encountered an error. Please try again.');
      setOutput('');
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(output);
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
            <div className="flex items-center space-x-3">
              <DocumentTextIcon className="h-8 w-8 text-purple-500" />
              <div>
                <h1 className="text-xl sm:text-2xl font-bold text-purple-500">
                  Summarize
                </h1>
                <p className="text-sm text-purple-300">
                  Transform your text with AI-powered tools
                </p>
              </div>
            </div>
          </motion.div>

          {/* Tools Selection */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-1 sm:grid-cols-3 gap-4"
          >
            {tools.map((tool) => (
              <button
                key={tool.id}
                onClick={() => setSelectedTool(tool.id)}
                className={`p-4 rounded-xl border transition-all duration-200 ${
                  selectedTool === tool.id
                    ? 'bg-purple-500/20 border-purple-500 text-purple-500'
                    : 'bg-gray-900 border-purple-500/20 text-purple-300 hover:border-purple-500/40'
                }`}
              >
                <tool.icon className="h-6 w-6 mb-2" />
                <h3 className="font-semibold">{tool.name}</h3>
                <p className="text-sm opacity-75">{tool.description}</p>
              </button>
            ))}
          </motion.div>

          {/* Input Form */}
          <motion.form
            variants={itemVariants}
            onSubmit={handleSubmit}
            className="bg-gray-900 rounded-xl sm:rounded-2xl shadow-lg border border-purple-500/20 p-4 sm:p-6"
          >
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Enter your text here..."
              className="w-full h-32 bg-gray-800 text-purple-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
              disabled={isLoading}
            />
            <div className="mt-4 flex justify-end">
              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="bg-purple-500 text-white rounded-lg px-4 py-2 hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
              >
                {isLoading ? (
                  <Loading size="sm" />
                ) : (
                  <span>Process Text</span>
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
                <h2 className="text-lg font-semibold text-purple-500">Result</h2>
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
        </motion.div>
      </div>
    </div>
  );
};

export default Summarize; 