import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { SparklesIcon } from '@heroicons/react/24/outline';
import { useAuth } from '../context/AuthContext';
import {
  EnvelopeIcon,
  LockClosedIcon,
  ExclamationCircleIcon,
  EyeIcon,
  EyeSlashIcon,
  ArrowRightIcon,
} from '@heroicons/react/24/outline';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      await login(email, password);
      navigate('/account');
    } catch (err) {
      setError(err.message || 'Failed to sign in');
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center py-6 sm:py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="w-full max-w-md space-y-6 sm:space-y-8"
      >
        <div className="bg-gray-900/50 backdrop-blur-sm p-6 sm:p-8 rounded-2xl shadow-xl border border-purple-500/20">
          <div>
            <div className="flex justify-center">
              <SparklesIcon className="h-10 w-10 sm:h-12 sm:w-12 text-purple-500" />
            </div>
            <h2 className="mt-4 sm:mt-6 text-center text-2xl sm:text-3xl font-extrabold text-white">
              Sign in to your account
            </h2>
            <p className="mt-2 text-center text-sm sm:text-base text-purple-300">
              Or{' '}
              <Link
                to="/signup"
                className="font-medium text-purple-400 hover:text-purple-300 transition-colors duration-300"
              >
                create a new account
              </Link>
            </p>
          </div>

          <form className="mt-6 sm:mt-8 space-y-4 sm:space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <label htmlFor="email" className="sr-only">
                  Email address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <EnvelopeIcon className="h-5 w-5 text-purple-500" />
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="appearance-none relative block w-full pl-10 pr-3 py-2.5 sm:py-3 border border-purple-500/20 placeholder-purple-300/50 text-white rounded-lg bg-gray-900/50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 text-sm sm:text-base"
                    placeholder="Email address"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <LockClosedIcon className="h-5 w-5 text-purple-500" />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="current-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="appearance-none relative block w-full pl-10 pr-10 py-2.5 sm:py-3 border border-purple-500/20 placeholder-purple-300/50 text-white rounded-lg bg-gray-900/50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 text-sm sm:text-base"
                    placeholder="Password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    {showPassword ? (
                      <EyeSlashIcon className="h-5 w-5 text-purple-500" />
                    ) : (
                      <EyeIcon className="h-5 w-5 text-purple-500" />
                    )}
                  </button>
                </div>
              </div>
            </div>

            {error && (
              <div className="flex items-center space-x-2 text-red-500 bg-red-500/10 p-3 rounded-lg text-sm sm:text-base">
                <ExclamationCircleIcon className="h-5 w-5 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2.5 sm:py-3 px-4 border border-transparent text-sm sm:text-base font-medium rounded-lg text-white bg-purple-500 hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-all duration-300"
              >
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                  <ArrowRightIcon className="h-5 w-5 text-purple-300 group-hover:text-purple-200" />
                </span>
                Sign in
              </button>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default SignIn; 