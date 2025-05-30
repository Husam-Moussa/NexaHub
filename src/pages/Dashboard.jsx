import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import {
  SparklesIcon,
  DocumentTextIcon,
  AcademicCapIcon,
  BriefcaseIcon,
  UserCircleIcon,
  ArrowRightOnRectangleIcon,
  LanguageIcon,
  ChatBubbleLeftRightIcon,
  KeyIcon,
} from '@heroicons/react/24/outline';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    name: user?.displayName || 'User',
    email: user?.email || '',
    lastLogin: new Date().toLocaleDateString(),
  });

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/account');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.3,
      },
    },
  };

  const tools = [
    {
      name: 'Summarize',
      description: 'Transform your text with AI-powered tools',
      icon: DocumentTextIcon,
      href: '/summarize',
      color: 'purple',
      logo: (
        <div className="relative">
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-purple-500 rounded-full animate-pulse" />
          <DocumentTextIcon className="h-5 w-5 sm:h-6 sm:w-6 text-purple-500" />
        </div>
      ),
    },
    {
      name: 'NexaHub Chat',
      description: 'Your AI-powered chat assistant',
      icon: ChatBubbleLeftRightIcon,
      href: '/nexahub-chat',
      color: 'purple',
      logo: (
        <div className="relative">
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-purple-500 rounded-full animate-pulse" />
          <ChatBubbleLeftRightIcon className="h-5 w-5 sm:h-6 sm:w-6 text-purple-500" />
        </div>
      ),
    },
    {
      name: 'Translate',
      description: 'Translate text between multiple languages',
      icon: LanguageIcon,
      href: '/translate',
      color: 'purple',
      logo: (
        <div className="relative">
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-purple-500 rounded-full animate-pulse" />
          <LanguageIcon className="h-5 w-5 sm:h-6 sm:w-6 text-purple-500" />
        </div>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-black">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 md:py-10">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="space-y-6 sm:space-y-8 md:space-y-10"
        >
          {/* Welcome Section */}
          <motion.div
            variants={itemVariants}
            className="bg-gray-900 rounded-xl sm:rounded-2xl shadow-lg border border-purple-500/20 p-4 sm:p-6 lg:p-8"
          >
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-purple-500 mb-2">
                  Welcome back, {userData.name}!
                </h1>
                <p className="text-sm sm:text-base text-purple-300">
                  Last login: {userData.lastLogin}
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <UserCircleIcon className="h-6 w-6 sm:h-8 sm:w-8 text-purple-500" />
                <span className="text-sm sm:text-base text-purple-300 truncate max-w-[200px] sm:max-w-none">
                  {userData.email}
                </span>
              </div>
            </div>
          </motion.div>

          {/* Tools Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {tools.map((tool) => (
              <motion.div
                key={tool.name}
                variants={itemVariants}
                className="bg-gray-900 rounded-xl sm:rounded-2xl shadow-lg border border-purple-500/20 p-4 sm:p-6 hover:border-purple-500/40 transition-all duration-300"
              >
                <Link to={tool.href} className="block h-full">
                  <div className="flex items-start space-x-4 h-full">
                    <div className={`p-2 rounded-lg bg-${tool.color}-500/10 flex-shrink-0`}>
                      {tool.logo || <tool.icon className={`h-5 w-5 sm:h-6 sm:w-6 text-${tool.color}-500`} />}
                    </div>
                    <div className="flex-grow">
                      <h2 className="text-base sm:text-lg font-semibold text-purple-300 mb-1">
                        {tool.name}
                      </h2>
                      <p className="text-xs sm:text-sm text-purple-400">
                        {tool.description}
                      </p>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Quick Actions */}
          <motion.div
            variants={itemVariants}
            className="bg-gray-900 rounded-xl sm:rounded-2xl shadow-lg border border-purple-500/20 p-4 sm:p-6 lg:p-8"
          >
            <h2 className="text-lg sm:text-xl font-semibold text-purple-300 mb-4">
              Quick Actions
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
              <Link
                to="/account"
                className="flex items-center space-x-3 p-3 rounded-lg bg-purple-500/10 hover:bg-purple-500/20 transition-all duration-300"
              >
                <UserCircleIcon className="h-5 w-5 text-purple-500 flex-shrink-0" />
                <span className="text-sm sm:text-base text-purple-300">View Profile</span>
              </Link>
              <Link
                to="/account"
                className="flex items-center space-x-3 p-3 rounded-lg bg-purple-500/10 hover:bg-purple-500/20 transition-all duration-300"
              >
                <KeyIcon className="h-5 w-5 text-purple-500 flex-shrink-0" />
                <span className="text-sm sm:text-base text-purple-300">Reset Password</span>
              </Link>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-3 p-3 rounded-lg bg-red-500/10 hover:bg-red-500/20 transition-all duration-300"
              >
                <ArrowRightOnRectangleIcon className="h-5 w-5 text-red-500 flex-shrink-0" />
                <span className="text-sm sm:text-base text-red-300">Sign Out</span>
              </button>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard; 