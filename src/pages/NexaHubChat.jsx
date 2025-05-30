import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import Loading from '../components/common/Loading';
import { PaperAirplaneIcon, UserCircleIcon } from '@heroicons/react/24/outline';
import { chatAPI } from '../utils/api';

const NexaHubChat = () => {
  const { user } = useAuth();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      const response = await chatAPI.sendMessage(userMessage, messages);
      const aiResponse = {
        id: Date.now() + 1,
        text: response.response,
        sender: 'ai',
        timestamp: new Date().toISOString(),
      };
      setMessages(prev => [...prev, aiResponse]);
    } catch (error) {
      console.error('Chat error:', error);
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: 'Sorry, I\'m having trouble connecting to the server. Please make sure the API server is running and try again.' 
      }]);
    } finally {
      setIsLoading(false);
    }
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
          className="h-[calc(100vh-8rem)] flex flex-col"
        >
          {/* Chat Header */}
          <motion.div
            variants={itemVariants}
            className="bg-gray-900 rounded-xl sm:rounded-2xl shadow-lg border border-purple-500/20 p-4 sm:p-6 mb-4"
          >
            <div className="flex items-center space-x-3">
              <UserCircleIcon className="h-8 w-8 text-purple-500" />
              <div>
                <h1 className="text-xl sm:text-2xl font-bold text-purple-500">
                  NexaHub Chat
                </h1>
                <p className="text-sm text-purple-300">
                  Your AI-powered chat assistant
                </p>
              </div>
            </div>
          </motion.div>

          {/* Chat Messages */}
          <motion.div
            variants={itemVariants}
            className="flex-grow bg-gray-900 rounded-xl sm:rounded-2xl shadow-lg border border-purple-500/20 p-4 sm:p-6 mb-4 overflow-y-auto"
          >
            <div className="space-y-4">
              {messages.length === 0 ? (
                <div className="text-center text-purple-300 py-8">
                  <p className="text-lg">Start a conversation with NexaHub</p>
                  <p className="text-sm mt-2">Ask anything and get AI-powered responses</p>
                </div>
              ) : (
                messages.map((message, index) => (
                  <div
                    key={index}
                    className={`flex ${
                      message.role === 'user' ? 'justify-end' : 'justify-start'
                    }`}
                  >
                    <div
                      className={`max-w-[80%] rounded-lg p-3 ${
                        message.role === 'user'
                          ? 'bg-purple-500 text-white'
                          : 'bg-gray-800 text-purple-300'
                      }`}
                    >
                      <p className="text-sm sm:text-base whitespace-pre-wrap">
                        {message.content}
                      </p>
                    </div>
                  </div>
                ))
              )}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-gray-800 rounded-lg p-3">
                    <Loading size="sm" />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </motion.div>

          {/* Chat Input */}
          <motion.form
            variants={itemVariants}
            onSubmit={handleSubmit}
            className="bg-gray-900 rounded-xl sm:rounded-2xl shadow-lg border border-purple-500/20 p-4"
          >
            <div className="flex space-x-4">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message..."
                className="flex-grow bg-gray-800 text-purple-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="bg-purple-500 text-white rounded-lg px-4 py-2 hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
              >
                {isLoading ? (
                  <Loading size="sm" />
                ) : (
                  <PaperAirplaneIcon className="h-5 w-5" />
                )}
              </button>
            </div>
          </motion.form>
        </motion.div>
      </div>
    </div>
  );
};

export default NexaHubChat; 