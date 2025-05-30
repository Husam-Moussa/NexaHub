import { useState, Fragment } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Bars3Icon,
  XMarkIcon,
  UserCircleIcon,
  Cog6ToothIcon,
  ArrowRightOnRectangleIcon,
  SparklesIcon,
  BellIcon,
  CreditCardIcon,
  ShieldCheckIcon,
} from '@heroicons/react/24/outline';
import { Menu, Transition } from '@headlessui/react';
import { useAuth } from '../context/AuthContext';

const navigation = [
  { name: 'Dashboard', href: '/' },
  { name: 'Resume Builder', href: '/resume' },
  { name: 'StudyGPT', href: '/study' },
  { name: 'Text Toolkit', href: '/text-toolkit' },
];

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, signout } = useAuth();

  const isActive = (path) => {
    return location.pathname === path;
  };

  const handleSignOut = async () => {
    try {
      await signout();
      navigate('/signin');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <nav className="bg-black border-b border-purple-500/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Desktop Navigation */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <SparklesIcon className="h-8 w-8 text-purple-500" />
              <span className="text-xl font-bold text-white">NexaHub</span>
            </Link>
            <div className="hidden md:block ml-10">
              <div className="flex items-center space-x-4">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                      isActive(item.href)
                        ? 'text-white bg-purple-500/10'
                        : 'text-purple-300 hover:text-white hover:bg-purple-500/5'
                    }`}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* User Menu and Notifications */}
          <div className="flex items-center space-x-4">
            {/* Notifications */}
            <div className="hidden md:block">
              <button className="relative p-2 text-purple-300 hover:text-white transition-colors duration-300">
                <BellIcon className="h-6 w-6" />
                <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
              </button>
            </div>

            {/* User Menu */}
            {user ? (
              <div className="hidden md:block">
                <Menu as="div" className="relative">
                  <Menu.Button className="flex items-center space-x-2 text-purple-300 hover:text-white transition-colors duration-300">
                    <div className="relative">
                      <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center">
                        {user.avatar ? (
                          <img src={user.avatar} alt={user.name} className="w-8 h-8 rounded-full" />
                        ) : (
                          <UserCircleIcon className="h-6 w-6 text-purple-500" />
                        )}
                      </div>
                      <span className="absolute bottom-0 right-0 h-2 w-2 bg-green-500 rounded-full border-2 border-black"></span>
                    </div>
                    <span className="text-sm font-medium">{user.name || 'User'}</span>
                  </Menu.Button>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right rounded-xl bg-gray-800 shadow-lg border border-purple-500/20 focus:outline-none">
                      <div className="p-2">
                        <div className="px-4 py-2 border-b border-purple-500/20">
                          <p className="text-sm font-medium text-white">{user.name || 'User'}</p>
                          <p className="text-xs text-purple-300">{user.email}</p>
                        </div>
                        <div className="py-1">
                          <Menu.Item>
                            {({ active }) => (
                              <Link
                                to="/profile"
                                className={`flex items-center px-4 py-2 text-sm rounded-lg ${
                                  active ? 'bg-purple-500/10 text-white' : 'text-purple-300'
                                }`}
                              >
                                <UserCircleIcon className="h-5 w-5 mr-2" />
                                Profile
                              </Link>
                            )}
                          </Menu.Item>
                          <Menu.Item>
                            {({ active }) => (
                              <Link
                                to="/settings"
                                className={`flex items-center px-4 py-2 text-sm rounded-lg ${
                                  active ? 'bg-purple-500/10 text-white' : 'text-purple-300'
                                }`}
                              >
                                <Cog6ToothIcon className="h-5 w-5 mr-2" />
                                Settings
                              </Link>
                            )}
                          </Menu.Item>
                          <Menu.Item>
                            {({ active }) => (
                              <Link
                                to="/billing"
                                className={`flex items-center px-4 py-2 text-sm rounded-lg ${
                                  active ? 'bg-purple-500/10 text-white' : 'text-purple-300'
                                }`}
                              >
                                <CreditCardIcon className="h-5 w-5 mr-2" />
                                Billing
                              </Link>
                            )}
                          </Menu.Item>
                          <Menu.Item>
                            {({ active }) => (
                              <Link
                                to="/security"
                                className={`flex items-center px-4 py-2 text-sm rounded-lg ${
                                  active ? 'bg-purple-500/10 text-white' : 'text-purple-300'
                                }`}
                              >
                                <ShieldCheckIcon className="h-5 w-5 mr-2" />
                                Security
                              </Link>
                            )}
                          </Menu.Item>
                          <div className="border-t border-purple-500/20 my-1"></div>
                          <Menu.Item>
                            {({ active }) => (
                              <button
                                onClick={handleSignOut}
                                className={`flex w-full items-center px-4 py-2 text-sm rounded-lg ${
                                  active ? 'bg-purple-500/10 text-white' : 'text-purple-300'
                                }`}
                              >
                                <ArrowRightOnRectangleIcon className="h-5 w-5 mr-2" />
                                Sign out
                              </button>
                            )}
                          </Menu.Item>
                        </div>
                      </div>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            ) : (
              <div className="hidden md:block">
                <Link
                  to="/signin"
                  className="text-purple-300 hover:text-white transition-colors duration-300"
                >
                  Sign in
                </Link>
              </div>
            )}

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-purple-300 hover:text-white transition-colors duration-300"
              >
                {isMobileMenuOpen ? (
                  <XMarkIcon className="h-6 w-6" />
                ) : (
                  <Bars3Icon className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden border-t border-purple-500/20"
          >
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`block px-3 py-2 rounded-lg text-base font-medium ${
                    isActive(item.href)
                      ? 'text-white bg-purple-500/10'
                      : 'text-purple-300 hover:text-white hover:bg-purple-500/5'
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              {user ? (
                <>
                  <div className="pt-4 pb-3 border-t border-purple-500/20">
                    <div className="flex items-center px-5">
                      <div className="flex-shrink-0">
                        <div className="relative">
                          <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center">
                            {user.avatar ? (
                              <img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-full" />
                            ) : (
                              <UserCircleIcon className="h-8 w-8 text-purple-500" />
                            )}
                          </div>
                          <span className="absolute bottom-0 right-0 h-2 w-2 bg-green-500 rounded-full border-2 border-black"></span>
                        </div>
                      </div>
                      <div className="ml-3">
                        <div className="text-base font-medium text-white">{user.name || 'User'}</div>
                        <div className="text-sm font-medium text-purple-300">{user.email}</div>
                      </div>
                    </div>
                    <div className="mt-3 px-2 space-y-1">
                      <Link
                        to="/profile"
                        className="flex items-center px-3 py-2 rounded-lg text-base font-medium text-purple-300 hover:text-white hover:bg-purple-500/5"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <UserCircleIcon className="h-5 w-5 mr-2" />
                        Profile
                      </Link>
                      <Link
                        to="/settings"
                        className="flex items-center px-3 py-2 rounded-lg text-base font-medium text-purple-300 hover:text-white hover:bg-purple-500/5"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <Cog6ToothIcon className="h-5 w-5 mr-2" />
                        Settings
                      </Link>
                      <Link
                        to="/billing"
                        className="flex items-center px-3 py-2 rounded-lg text-base font-medium text-purple-300 hover:text-white hover:bg-purple-500/5"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <CreditCardIcon className="h-5 w-5 mr-2" />
                        Billing
                      </Link>
                      <Link
                        to="/security"
                        className="flex items-center px-3 py-2 rounded-lg text-base font-medium text-purple-300 hover:text-white hover:bg-purple-500/5"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <ShieldCheckIcon className="h-5 w-5 mr-2" />
                        Security
                      </Link>
                      <button
                        onClick={() => {
                          handleSignOut();
                          setIsMobileMenuOpen(false);
                        }}
                        className="flex w-full items-center px-3 py-2 rounded-lg text-base font-medium text-purple-300 hover:text-white hover:bg-purple-500/5"
                      >
                        <ArrowRightOnRectangleIcon className="h-5 w-5 mr-2" />
                        Sign out
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <Link
                  to="/signin"
                  className="block px-3 py-2 rounded-lg text-base font-medium text-purple-300 hover:text-white hover:bg-purple-500/5"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Sign in
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar; 