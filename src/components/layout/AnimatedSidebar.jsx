import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  HomeIcon,
  DocumentTextIcon,
  SparklesIcon,
  LanguageIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline';

const AnimatedSidebar = () => {
  const location = useLocation();
  const [isHovered, setIsHovered] = useState(null);

  const navItems = [
    {
      name: 'Dashboard',
      icon: HomeIcon,
      path: '/',
    },
    {
      name: 'Summarize',
      icon: DocumentTextIcon,
      path: '/summarize',
    },
    {
      name: 'NexaHub Chat',
      icon: SparklesIcon,
      path: '/nexahub-chat',
    },
    {
      name: 'Translate',
      icon: LanguageIcon,
      path: '/translate',
    },
    {
      name: 'Account',
      icon: UserCircleIcon,
      path: '/account',
    },
  ];

  return (
    <motion.div
      initial={{ x: -300 }}
      animate={{ x: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="fixed left-0 top-16 h-[calc(100vh-4rem)] w-64 bg-gray-900 border-r border-purple-500/20"
    >
      <nav className="p-4 space-y-2">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className="block"
            onMouseEnter={() => setIsHovered(item.path)}
            onMouseLeave={() => setIsHovered(null)}
          >
            <motion.div
              className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors duration-200 ${
                location.pathname === item.path
                  ? 'bg-purple-500/20 text-purple-500'
                  : 'text-purple-300 hover:bg-purple-500/10'
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <item.icon className="h-5 w-5" />
              <span className="font-medium">{item.name}</span>
              {isHovered === item.path && (
                <motion.div
                  layoutId="activeIndicator"
                  className="absolute right-4 w-1.5 h-1.5 rounded-full bg-purple-500"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                />
              )}
            </motion.div>
          </Link>
        ))}
      </nav>
    </motion.div>
  );
};

export default AnimatedSidebar; 