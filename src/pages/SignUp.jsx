import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { SparklesIcon } from '@heroicons/react/24/outline';
import { useAuth } from '../context/AuthContext';
import {
  UserCircleIcon,
  EnvelopeIcon,
  LockClosedIcon,
  ExclamationCircleIcon,
  EyeIcon,
  EyeSlashIcon,
  ArrowRightIcon,
} from '@heroicons/react/24/outline';

const SignUp = () => {
  const navigate = useNavigate();
  const { signup } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [verificationStep, setVerificationStep] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [isSendingCode, setIsSendingCode] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSendVerificationCode = async () => {
    if (!formData.email) {
      setError('Please enter your email address');
      return;
    }

    setIsSendingCode(true);
    setError('');

    try {
      const response = await fetch('http://localhost:3001/api/send-verification', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: formData.email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to send verification code');
      }

      setVerificationStep(true);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsSendingCode(false);
    }
  };

  const handleVerifyCode = async () => {
    if (!verificationCode) {
      setError('Please enter the verification code');
      return;
    }

    setIsVerifying(true);
    setError('');

    try {
      const response = await fetch('http://localhost:3001/api/verify-code', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          code: verificationCode,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to verify code');
      }

      // If verification successful, proceed with signup
      await handleSubmit();
    } catch (error) {
      setError(error.message);
    } finally {
      setIsVerifying(false);
    }
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    try {
      await signup(formData.email, formData.password, formData.name);
      navigate('/account');
    } catch (error) {
      setError(error.message);
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
              Create your account
            </h2>
            <p className="mt-2 text-center text-sm sm:text-base text-purple-300">
              Or{' '}
              <Link
                to="/signin"
                className="font-medium text-purple-400 hover:text-purple-300 transition-colors duration-300"
              >
                sign in to your account
              </Link>
            </p>
          </div>

          {!verificationStep ? (
            <form className="mt-6 sm:mt-8 space-y-4 sm:space-y-6" onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div>
                  <label htmlFor="name" className="sr-only">
                    Name
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <UserCircleIcon className="h-5 w-5 text-purple-500" />
                    </div>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="appearance-none relative block w-full pl-10 pr-3 py-2.5 sm:py-3 border border-purple-500/20 placeholder-purple-300/50 text-white rounded-lg bg-gray-900/50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 text-sm sm:text-base"
                      placeholder="Full name"
                    />
                  </div>
                </div>

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
                      value={formData.email}
                      onChange={handleChange}
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
                      autoComplete="new-password"
                      required
                      value={formData.password}
                      onChange={handleChange}
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

                <div>
                  <label htmlFor="confirmPassword" className="sr-only">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <LockClosedIcon className="h-5 w-5 text-purple-500" />
                    </div>
                    <input
                      id="confirmPassword"
                      name="confirmPassword"
                      type={showConfirmPassword ? 'text' : 'password'}
                      autoComplete="new-password"
                      required
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className="appearance-none relative block w-full pl-10 pr-10 py-2.5 sm:py-3 border border-purple-500/20 placeholder-purple-300/50 text-white rounded-lg bg-gray-900/50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 text-sm sm:text-base"
                      placeholder="Confirm password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    >
                      {showConfirmPassword ? (
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
                  type="button"
                  onClick={handleSendVerificationCode}
                  disabled={isSendingCode}
                  className="group relative w-full flex justify-center py-2.5 sm:py-3 px-4 border border-transparent text-sm sm:text-base font-medium rounded-lg text-white bg-purple-500 hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                    <ArrowRightIcon className="h-5 w-5 text-purple-300 group-hover:text-purple-200" />
                  </span>
                  {isSendingCode ? 'Sending Code...' : 'Continue'}
                </button>
              </div>
            </form>
          ) : (
            <div className="mt-6 sm:mt-8 space-y-4 sm:space-y-6">
              <div>
                <label htmlFor="verificationCode" className="sr-only">
                  Verification Code
                </label>
                <div className="relative">
                  <input
                    id="verificationCode"
                    type="text"
                    value={verificationCode}
                    onChange={(e) => setVerificationCode(e.target.value)}
                    className="appearance-none relative block w-full px-3 py-2.5 sm:py-3 border border-purple-500/20 placeholder-purple-300/50 text-white rounded-lg bg-gray-900/50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 text-sm sm:text-base"
                    placeholder="Enter verification code"
                  />
                </div>
              </div>

              {error && (
                <div className="flex items-center space-x-2 text-red-500 bg-red-500/10 p-3 rounded-lg text-sm sm:text-base">
                  <ExclamationCircleIcon className="h-5 w-5 flex-shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              <div className="flex space-x-4">
                <button
                  type="button"
                  onClick={() => setVerificationStep(false)}
                  className="flex-1 py-2.5 sm:py-3 px-4 border border-purple-500/20 text-sm sm:text-base font-medium rounded-lg text-purple-400 hover:text-purple-300 hover:border-purple-400 transition-all duration-300"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={handleVerifyCode}
                  disabled={isVerifying}
                  className="flex-1 py-2.5 sm:py-3 px-4 border border-transparent text-sm sm:text-base font-medium rounded-lg text-white bg-purple-500 hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isVerifying ? 'Verifying...' : 'Verify Code'}
                </button>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default SignUp; 