import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import Loading from '../components/common/Loading';
import {
  UserCircleIcon,
  LockClosedIcon,
  ExclamationCircleIcon,
  EyeIcon,
  EyeSlashIcon,
  KeyIcon,
  CheckCircleIcon,
  XCircleIcon,
  ShieldCheckIcon,
  ArrowPathIcon,
  EnvelopeIcon,
} from '@heroicons/react/24/outline';

const Account = () => {
  const { user, updatePassword, resetPassword, updateProfile, sendVerificationEmail } = useAuth();
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState({
    profile: false,
    password: false,
    verification: false
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (formData.newPassword !== formData.confirmPassword) {
      setError('New passwords do not match');
      return;
    }

    if (formData.newPassword.length < 6) {
      setError('New password must be at least 6 characters long');
      return;
    }

    setIsLoading(true);
    try {
      await updatePassword(formData.currentPassword, formData.newPassword);
      setSuccess('Password updated successfully');
      setFormData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      });
    } catch (err) {
      setError(err.message || 'Failed to update password');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleResetPassword = async () => {
    if (!user?.email) {
      setError('No email address found');
      return;
    }

    try {
      setLoading(prev => ({ ...prev, password: true }));
      setError('');
      setSuccess('');
      await resetPassword(user.email);
      setSuccess('Password reset email sent. Please check your inbox.');
    } catch (error) {
      console.error('Error sending reset email:', error);
      setError('Failed to send reset email');
    } finally {
      setLoading(prev => ({ ...prev, password: false }));
    }
  };

  const handleSendVerificationEmail = async () => {
    if (!user?.email) {
      setError('No email address found');
      return;
    }

    try {
      setLoading(prev => ({ ...prev, verification: true }));
      setError('');
      setSuccess('');
      await sendVerificationEmail();
      setSuccess('Verification email sent. Please check your inbox.');
    } catch (error) {
      console.error('Error sending verification email:', error);
      setError('Failed to send verification email');
    } finally {
      setLoading(prev => ({ ...prev, verification: false }));
    }
  };

  // Clear success message after 5 seconds
  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        setSuccess('');
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [success]);

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
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
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
              <UserCircleIcon className="h-8 w-8 text-purple-500" />
              <div>
                <h1 className="text-xl sm:text-2xl font-bold text-purple-500">
                  Account Settings
                </h1>
                <p className="text-sm text-purple-300">
                  Manage your account preferences and security
                </p>
              </div>
            </div>
          </motion.div>

          <div className="lg:grid lg:grid-cols-2 lg:gap-6">
            {/* Profile Section */}
            <motion.div
              variants={itemVariants}
              className="bg-gray-900 rounded-xl sm:rounded-2xl shadow-lg border border-purple-500/20 p-4 sm:p-6"
            >
              <h2 className="text-lg font-semibold text-purple-500 mb-4">Profile Information</h2>
              <div className="space-y-6">
                <div className="flex flex-col items-center space-y-4">
                  <div className="w-32 h-32 rounded-full bg-gray-800 border-2 border-purple-500/20 flex items-center justify-center">
                    <UserCircleIcon className="w-full h-full text-purple-500/50" />
                  </div>
                  <p className="text-sm text-purple-300">
                    {user?.displayName || 'Not set'}
                  </p>
                  <p className="text-sm text-purple-400">
                    {user?.email || 'No email address'}
                  </p>
                </div>

                {/* Status Messages */}
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center space-x-2 text-red-500 bg-red-500/10 p-3 rounded-lg"
                  >
                    <XCircleIcon className="h-5 w-5" />
                    <span>{error}</span>
                  </motion.div>
                )}
                {success && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center space-x-2 text-green-500 bg-green-500/10 p-3 rounded-lg"
                  >
                    <CheckCircleIcon className="h-5 w-5" />
                    <span>{success}</span>
                  </motion.div>
                )}
              </div>
            </motion.div>

            {/* Security Section */}
            <motion.div
              variants={itemVariants}
              className="bg-gray-900 rounded-xl sm:rounded-2xl shadow-lg border border-purple-500/20 p-4 sm:p-6"
            >
              <h2 className="text-lg font-semibold text-purple-500 mb-4">Security Settings</h2>
              <div className="space-y-6">
                <div className="bg-gray-800/50 rounded-lg p-4">
                  <h3 className="text-purple-300 font-medium mb-2">Password</h3>
                  <p className="text-sm text-purple-400 mb-4">
                    Reset your password to keep your account secure
                  </p>
                  <button
                    onClick={handleResetPassword}
                    disabled={loading.password}
                    className="flex items-center space-x-2 bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                  >
                    {loading.password ? (
                      <Loading size="sm" />
                    ) : (
                      <>
                        <KeyIcon className="h-5 w-5" />
                        <span>Reset Password</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="bg-gray-800/50 rounded-lg p-4">
                  <h3 className="text-purple-300 font-medium mb-2">Account Status</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-purple-400">Email Verification</span>
                      <span className={`text-sm ${user?.emailVerified ? 'text-green-500' : 'text-yellow-500'}`}>
                        {user?.emailVerified ? 'Verified' : 'Not Verified'}
                      </span>
                    </div>
                    {!user?.emailVerified && (
                      <button
                        onClick={handleSendVerificationEmail}
                        disabled={loading.verification}
                        className="w-full flex items-center justify-center space-x-2 bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                      >
                        {loading.verification ? (
                          <Loading size="sm" />
                        ) : (
                          <>
                            <EnvelopeIcon className="h-5 w-5" />
                            <span>Send Verification Email</span>
                          </>
                        )}
                      </button>
                    )}
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-purple-400">Last Sign In</span>
                      <span className="text-sm text-purple-300">
                        {user?.metadata?.lastSignInTime
                          ? new Date(user.metadata.lastSignInTime).toLocaleDateString()
                          : 'Unknown'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Account; 