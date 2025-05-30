import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { UserCircleIcon, PencilIcon } from '@heroicons/react/24/outline';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const { user, updateProfile, updateAvatar, signout } = useAuth();
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    email: user?.email || '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateProfile(profileData);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        // TODO: Implement actual file upload to your storage service
        // For now, we'll create a local URL
        const avatarUrl = URL.createObjectURL(file);
        await updateAvatar(avatarUrl);
      } catch (error) {
        console.error('Error uploading avatar:', error);
      }
    }
  };

  const handleSignOut = () => {
    signout();
    navigate('/signin');
  };

  if (!user) {
    return null; // or a loading spinner
  }

  return (
    <div className="min-h-screen bg-black pt-20 pb-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-gray-800 rounded-2xl shadow-xl overflow-hidden"
        >
          {/* Profile Header */}
          <div className="relative h-32 bg-gradient-to-r from-purple-500 to-purple-600">
            <div className="absolute -bottom-12 left-8">
              <div className="relative">
                <div 
                  className="h-24 w-24 rounded-full bg-gray-800 border-4 border-gray-800 overflow-hidden cursor-pointer"
                  onClick={handleAvatarClick}
                >
                  {user.avatar ? (
                    <img 
                      src={user.avatar} 
                      alt="Profile" 
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <UserCircleIcon className="h-full w-full text-purple-500" />
                  )}
                </div>
                <button 
                  className="absolute bottom-0 right-0 bg-purple-500 rounded-full p-1.5 text-white hover:bg-purple-600 transition-colors duration-300"
                  onClick={handleAvatarClick}
                >
                  <PencilIcon className="h-4 w-4" />
                </button>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  accept="image/*"
                  className="hidden"
                />
              </div>
            </div>
          </div>

          {/* Profile Content */}
          <div className="pt-16 pb-8 px-8">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h1 className="text-2xl font-bold text-white">{profileData.name}</h1>
                <p className="text-purple-300">{profileData.email}</p>
              </div>
              <div className="space-x-4">
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors duration-300"
                >
                  {isEditing ? 'Cancel' : 'Edit Profile'}
                </button>
                <button
                  onClick={handleSignOut}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-300"
                >
                  Sign Out
                </button>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-purple-300">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={profileData.name}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className="mt-1 block w-full px-4 py-2 bg-gray-700 border border-purple-500/20 rounded-lg text-white placeholder-purple-300/50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 disabled:opacity-50"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-purple-300">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={profileData.email}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className="mt-1 block w-full px-4 py-2 bg-gray-700 border border-purple-500/20 rounded-lg text-white placeholder-purple-300/50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 disabled:opacity-50"
                  />
                </div>
              </div>

              {isEditing && (
                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="px-6 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors duration-300"
                  >
                    Save Changes
                  </button>
                </div>
              )}
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Profile; 