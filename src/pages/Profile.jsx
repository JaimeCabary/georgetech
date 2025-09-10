// src/pages/Profile.jsx
import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import Navbar from '../components/ui/Navbar';
import Footer from '../components/ui/Footer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faUser, 
  faLock, 
  faBell, 
  faPalette, 
  faCamera, 
  faSave, 
  faEdit,
  faTimesCircle
} from '@fortawesome/free-solid-svg-icons';
import { showNotification } from '../utils/notifications';
import AvatarEditor from 'react-avatar-editor';

const Profile = () => {
  const { user, updateProfile, updatePassword, reauthenticate, uploadAvatar } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [activeTab, setActiveTab] = useState('personal');
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [avatarFile, setAvatarFile] = useState(null);
  const [avatarEditor, setAvatarEditor] = useState(null);
  const [scale, setScale] = useState(1);
  const [rotate, setRotate] = useState(0);
  const [showAvatarEditor, setShowAvatarEditor] = useState(false);
  
  const fileInputRef = useRef(null);
  const editorRef = useRef(null);

  const [userData, setUserData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    country: '',
    bio: '',
    dateOfBirth: '',
    gender: ''
  });

  const [securityData, setSecurityData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    promotionalEmails: false,
    orderUpdates: true,
    priceAlerts: true,
    stockNotifications: true
  });

  // Initialize user data
  useEffect(() => {
    if (user) {
      setUserData({
        name: user.displayName || '',
        email: user.email || '',
        phone: user.phoneNumber || '',
        address: user.address || '',
        city: user.city || '',
        state: user.state || '',
        country: user.country || '',
        bio: user.bio || '',
        dateOfBirth: user.dateOfBirth || '',
        gender: user.gender || ''
      });

      // Load saved notification settings from localStorage
      const savedNotifications = localStorage.getItem('notificationSettings');
      if (savedNotifications) {
        setNotificationSettings(JSON.parse(savedNotifications));
      }
    }
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (activeTab === 'personal') {
      setUserData(prev => ({
        ...prev,
        [name]: value
      }));
    } else if (activeTab === 'security') {
      setSecurityData(prev => ({
        ...prev,
        [name]: value
      }));
    } else if (activeTab === 'notifications') {
      setNotificationSettings(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }));
    }
  };

  const handleSaveProfile = async () => {
    setIsLoading(true);
    try {
      await updateProfile(userData);
      
      // Log to backend
      await fetch('/api/user/profile-update', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: user.uid,
          updates: userData,
          timestamp: new Date().toISOString()
        })
      });

      showNotification('Profile updated successfully!', 'success');
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating profile:', error);
      showNotification('Failed to update profile. Please try again.', 'error');
    }
    setIsLoading(false);
  };

  const handleChangePassword = async () => {
    if (securityData.newPassword !== securityData.confirmPassword) {
      showNotification('New passwords do not match', 'error');
      return;
    }

    setIsLoading(true);
    try {
      // Reauthenticate user first
      await reauthenticate(securityData.currentPassword);
      
      // Update password
      await updatePassword(securityData.newPassword);
      
      // Log to backend
      await fetch('/api/user/password-change', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: user.uid,
          timestamp: new Date().toISOString()
        })
      });

      showNotification('Password updated successfully!', 'success');
      setSecurityData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
    } catch (error) {
      console.error('Error changing password:', error);
      showNotification('Failed to change password. Please check your current password.', 'error');
    }
    setIsLoading(false);
  };

  const handleSaveNotificationSettings = () => {
    localStorage.setItem('notificationSettings', JSON.stringify(notificationSettings));
    showNotification('Notification settings saved!', 'success');
    
    // Log to backend
    fetch('/api/user/notification-settings', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId: user.uid,
        settings: notificationSettings,
        timestamp: new Date().toISOString()
      })
    });
  };

  const handleAvatarUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatarFile(file);
      setShowAvatarEditor(true);
    }
  };

  const handleSaveAvatar = async () => {
    if (avatarEditor) {
      const canvas = avatarEditor.getImageScaledToCanvas();
      canvas.toBlob(async (blob) => {
        try {
          // Use the uploadAvatar function from AuthContext
          await uploadAvatar(blob);
          showNotification('Profile picture updated successfully!', 'success');
          setShowAvatarEditor(false);
          setAvatarFile(null);
        } catch (error) {
          console.error('Error uploading avatar:', error);
          showNotification('Failed to update profile picture', 'error');
        }
      }, 'image/jpeg', 0.9);
    }
  };

  const setEditorRef = (editor) => {
    if (editor) {
      setAvatarEditor(editor);
      editorRef.current = editor;
    }
  };

  const tabs = [
    { id: 'personal', label: 'Personal Info', icon: faUser },
    { id: 'security', label: 'Security', icon: faLock },
    { id: 'notifications', label: 'Notifications', icon: faBell },
    { id: 'appearance', label: 'Appearance', icon: faPalette }
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-dark-100 transition-colors duration-300">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="bg-white dark:bg-dark-200 rounded-xl shadow-md p-6 mb-8">
          <div className="flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-8">
            <div className="relative">
              <div className="w-32 h-32 rounded-full bg-gradient-to-r from-primary-dark to-secondary flex items-center justify-center relative overflow-hidden">
                {user?.photoURL ? (
                  <img 
                    src={user.photoURL} 
                    alt="Profile" 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-white text-4xl">
                    {userData.name ? userData.name.charAt(0).toUpperCase() : 'U'}
                  </span>
                )}
                
                <button 
                  onClick={() => fileInputRef.current?.click()}
                  className="absolute bottom-2 right-2 bg-[#FF4500] text-white p-2 rounded-full hover:bg-[#E03E00] transition"
                >
                  <FontAwesomeIcon icon={faCamera} size="sm" />
                </button>
                
                <input
                  type="file"
                  ref={fileInputRef}
                  className="hidden"
                  accept="image/*"
                  onChange={handleAvatarUpload}
                />
              </div>
            </div>
            
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                {userData.name || 'User'}
              </h1>
              <p className="text-gray-600 dark:text-gray-300 mb-4">{userData.email}</p>
              
              <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                <div className="bg-gray-100 dark:bg-dark-300 px-3 py-1 rounded-full text-sm">
                  <span className="text-gray-600 dark:text-gray-300">Member since: </span>
                  <span className="font-medium">{new Date(user?.metadata.creationTime).toLocaleDateString()}</span>
                </div>
                
                <div className="bg-gray-100 dark:bg-dark-300 px-3 py-1 rounded-full text-sm">
                  <span className="text-gray-600 dark:text-gray-300">Last login: </span>
                  <span className="font-medium">{new Date(user?.metadata.lastSignInTime).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:w-1/4">
            <div className="bg-white dark:bg-dark-200 rounded-xl shadow-md p-4 sticky top-24">
              <nav className="space-y-2">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition ${
                      activeTab === tab.id
                        ? 'bg-[#FF4500] text-white'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-dark-300'
                    }`}
                  >
                    <FontAwesomeIcon icon={tab.icon} />
                    <span>{tab.label}</span>
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Content Area */}
          <div className="lg:w-3/4">
            <div className="bg-white dark:bg-dark-200 rounded-xl shadow-md p-6">
              {/* Personal Info Tab */}
              {activeTab === 'personal' && (
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Personal Information</h2>
                    {!isEditing ? (
                      <button
                        onClick={() => setIsEditing(true)}
                        className="flex items-center space-x-2 bg-[#FF4500] text-white px-4 py-2 rounded-lg hover:bg-[#E03E00] transition"
                      >
                        <FontAwesomeIcon icon={faEdit} />
                        <span>Edit Profile</span>
                      </button>
                    ) : (
                      <div className="flex space-x-2">
                        <button
                          onClick={handleSaveProfile}
                          disabled={isLoading}
                          className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition disabled:opacity-50"
                        >
                          <FontAwesomeIcon icon={faSave} />
                          <span>{isLoading ? 'Saving...' : 'Save Changes'}</span>
                        </button>
                        <button
                          onClick={() => setIsEditing(false)}
                          className="flex items-center space-x-2 bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition"
                        >
                          <FontAwesomeIcon icon={faTimesCircle} />
                          <span>Cancel</span>
                        </button>
                      </div>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Full Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={userData.name}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#FF4500] focus:border-transparent dark:bg-dark-300 dark:text-white disabled:bg-gray-100 dark:disabled:bg-dark-400"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Email Address
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={userData.email}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#FF4500] focus:border-transparent dark:bg-dark-300 dark:text-white disabled:bg-gray-100 dark:disabled:bg-dark-400"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={userData.phone}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#FF4500] focus:border-transparent dark:bg-dark-300 dark:text-white disabled:bg-gray-100 dark:disabled:bg-dark-400"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Date of Birth
                      </label>
                      <input
                        type="date"
                        name="dateOfBirth"
                        value={userData.dateOfBirth}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#FF4500] focus:border-transparent dark:bg-dark-300 dark:text-white disabled:bg-gray-100 dark:disabled:bg-dark-400"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Gender
                      </label>
                      <select
                        name="gender"
                        value={userData.gender}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#FF4500] focus:border-transparent dark:bg-dark-300 dark:text-white disabled:bg-gray-100 dark:disabled:bg-dark-400"
                      >
                        <option value="">Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                        <option value="prefer-not-to-say">Prefer not to say</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Address
                      </label>
                      <input
                        type="text"
                        name="address"
                        value={userData.address}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#FF4500] focus:border-transparent dark:bg-dark-300 dark:text-white disabled:bg-gray-100 dark:disabled:bg-dark-400"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        City
                      </label>
                      <input
                        type="text"
                        name="city"
                        value={userData.city}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#FF4500] focus:border-transparent dark:bg-dark-300 dark:text-white disabled:bg-gray-100 dark:disabled:bg-dark-400"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        State
                      </label>
                      <input
                        type="text"
                        name="state"
                        value={userData.state}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#FF4500] focus:border-transparent dark:bg-dark-300 dark:text-white disabled:bg-gray-100 dark:disabled:bg-dark-400"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Country
                      </label>
                      <input
                        type="text"
                        name="country"
                        value={userData.country}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#FF4500] focus:border-transparent dark:bg-dark-300 dark:text-white disabled:bg-gray-100 dark:disabled:bg-dark-400"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Bio
                      </label>
                      <textarea
                        name="bio"
                        value={userData.bio}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        rows={3}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#FF4500] focus:border-transparent dark:bg-dark-300 dark:text-white disabled:bg-gray-100 dark:disabled:bg-dark-400"
                        placeholder="Tell us a bit about yourself..."
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Security Tab */}
              {activeTab === 'security' && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Security Settings</h2>
                  
                  <div className="space-y-6">
                    <div className="bg-gray-50 dark:bg-dark-300 p-6 rounded-lg">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Change Password</h3>
                      
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Current Password
                          </label>
                          <input
                            type="password"
                            name="currentPassword"
                            value={securityData.currentPassword}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#FF4500] focus:border-transparent dark:bg-dark-400 dark:text-white"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            New Password
                          </label>
                          <input
                            type="password"
                            name="newPassword"
                            value={securityData.newPassword}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#FF4500] focus:border-transparent dark:bg-dark-400 dark:text-white"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Confirm New Password
                          </label>
                          <input
                            type="password"
                            name="confirmPassword"
                            value={securityData.confirmPassword}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#FF4500] focus:border-transparent dark:bg-dark-400 dark:text-white"
                          />
                        </div>
                        
                        <button
                          onClick={handleChangePassword}
                          disabled={isLoading || !securityData.currentPassword || !securityData.newPassword || !securityData.confirmPassword}
                          className="bg-[#FF4500] text-white px-6 py-2 rounded-lg hover:bg-[#E03E00] transition disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {isLoading ? 'Updating...' : 'Update Password'}
                        </button>
                      </div>
                    </div>
                    
                    <div className="bg-gray-50 dark:bg-dark-300 p-6 rounded-lg">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Two-Factor Authentication</h3>
                      <p className="text-gray-600 dark:text-gray-300 mb-4">
                        Add an extra layer of security to your account by enabling two-factor authentication.
                      </p>
                      <button className="bg-[#FF4500] text-white px-6 py-2 rounded-lg hover:bg-[#E03E00] transition">
                        Enable 2FA
                      </button>
                    </div>
                    
                    <div className="bg-gray-50 dark:bg-dark-300 p-6 rounded-lg">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Active Sessions</h3>
                      <p className="text-gray-600 dark:text-gray-300 mb-4">
                        View and manage your active login sessions across different devices.
                      </p>
                      <button className="bg-gray-200 dark:bg-dark-400 text-gray-800 dark:text-white px-6 py-2 rounded-lg hover:bg-gray-300 dark:hover:bg-dark-500 transition">
                        View Active Sessions
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Notifications Tab */}
              {activeTab === 'notifications' && (
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Notification Preferences</h2>
                    <button
                      onClick={handleSaveNotificationSettings}
                      className="bg-[#FF4500] text-white px-4 py-2 rounded-lg hover:bg-[#E03E00] transition"
                    >
                      Save Preferences
                    </button>
                  </div>
                  
                  <div className="space-y-6">
                    <div className="bg-gray-50 dark:bg-dark-300 p-6 rounded-lg">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Email Notifications</h3>
                      
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium text-gray-900 dark:text-white">Email Notifications</h4>
                            <p className="text-sm text-gray-600 dark:text-gray-300">Receive important account notifications via email</p>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              name="emailNotifications"
                              checked={notificationSettings.emailNotifications}
                              onChange={handleInputChange}
                              className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-[#FF4500]"></div>
                          </label>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium text-gray-900 dark:text-white">Promotional Emails</h4>
                            <p className="text-sm text-gray-600 dark:text-gray-300">Receive emails about new products, offers and discounts</p>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              name="promotionalEmails"
                              checked={notificationSettings.promotionalEmails}
                              onChange={handleInputChange}
                              className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-[#FF4500]"></div>
                          </label>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium text-gray-900 dark:text-white">Order Updates</h4>
                            <p className="text-sm text-gray-600 dark:text-gray-300">Get notified about your order status and delivery updates</p>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              name="orderUpdates"
                              checked={notificationSettings.orderUpdates}
                              onChange={handleInputChange}
                              className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-[#FF4500]"></div>
                          </label>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium text-gray-900 dark:text-white">Price Alerts</h4>
                            <p className="text-sm text-gray-600 dark:text-gray-300">Receive notifications when products on your wishlist go on sale</p>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              name="priceAlerts"
                              checked={notificationSettings.priceAlerts}
                              onChange={handleInputChange}
                              className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-[#FF4500]"></div>
                          </label>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium text-gray-900 dark:text-white">Stock Notifications</h4>
                            <p className="text-sm text-gray-600 dark:text-gray-300">Get notified when out-of-stock items become available</p>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              name="stockNotifications"
                              checked={notificationSettings.stockNotifications}
                              onChange={handleInputChange}
                              className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-[#FF4500]"></div>
                          </label>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-gray-50 dark:bg-dark-300 p-6 rounded-lg">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Push Notifications</h3>
                      <p className="text-gray-600 dark:text-gray-300">
                        Configure how you receive push notifications on your devices.
                      </p>
                      <button className="mt-4 bg-gray-200 dark:bg-dark-400 text-gray-800 dark:text-white px-6 py-2 rounded-lg hover:bg-gray-300 dark:hover:bg-dark-500 transition">
                        Configure Push Settings
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Appearance Tab */}
              {activeTab === 'appearance' && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Appearance Settings</h2>
                  
                  <div className="space-y-6">
                    <div className="bg-gray-50 dark:bg-dark-300 p-6 rounded-lg">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Theme Preferences</h3>
                      
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h4 className="font-medium text-gray-900 dark:text-white">Dark Mode</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-300">Switch between light and dark theme</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={theme === 'dark'}
                            onChange={toggleTheme}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-[#FF4500]"></div>
                        </label>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                        <div className={`p-4 rounded-lg border-2 ${theme === 'light' ? 'border-[#FF4500]' : 'border-gray-300 dark:border-gray-600'}`}>
                          <div className="bg-white p-3 rounded shadow">
                            <div className="h-4 bg-gray-200 rounded mb-2"></div>
                            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                          </div>
                          <div className="mt-3 text-center">
                            <button
                              onClick={() => document.documentElement.classList.remove('dark')}
                              className="text-sm text-[#FF4500] font-medium"
                            >
                              Light Theme
                            </button>
                          </div>
                        </div>
                        
                        <div className={`p-4 rounded-lg border-2 ${theme === 'dark' ? 'border-[#FF4500]' : 'border-gray-300 dark:border-gray-600'}`}>
                          <div className="bg-gray-800 p-3 rounded shadow">
                            <div className="h-4 bg-gray-700 rounded mb-2"></div>
                            <div className="h-4 bg-gray-700 rounded w-3/4"></div>
                          </div>
                          <div className="mt-3 text-center">
                            <button
                              onClick={() => document.documentElement.classList.add('dark')}
                              className="text-sm text-[#FF4500] font-medium"
                            >
                              Dark Theme
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-gray-50 dark:bg-dark-300 p-6 rounded-lg">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Language & Region</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Language
                          </label>
                          <select className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#FF4500] focus:border-transparent dark:bg-dark-400 dark:text-white">
                                                        <option>English</option>
                            <option>Spanish</option>
                            <option>French</option>
                            <option>German</option>
                          </select>
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Time Zone
                          </label>
                          <select className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#FF4500] focus:border-transparent dark:bg-dark-400 dark:text-white">
                            <option>UTC-05:00 Eastern Time (US & Canada)</option>
                            <option>UTC-08:00 Pacific Time (US & Canada)</option>
                            <option>UTC+00:00 Greenwich Mean Time</option>
                            <option>UTC+01:00 Central European Time</option>
                          </select>
                        </div>
                      </div>
                      <button className="mt-4 bg-[#FF4500] text-white px-4 py-2 rounded-lg hover:bg-[#E03E00] transition">
                        Save Preferences
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Avatar Editor Modal */}
      {showAvatarEditor && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-dark-200 rounded-xl p-6 max-w-md w-full">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Edit Profile Picture</h3>
            
            <div className="flex justify-center mb-4">
              <AvatarEditor
                ref={setEditorRef}
                image={avatarFile}
                width={250}
                height={250}
                border={50}
                borderRadius={125}
                color={[0, 0, 0, 0.6]} // RGBA
                scale={scale}
                rotate={rotate}
              />
            </div>
            
            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Zoom: {scale.toFixed(1)}
                </label>
                <input
                  type="range"
                  min="1"
                  max="3"
                  step="0.1"
                  value={scale}
                  onChange={(e) => setScale(parseFloat(e.target.value))}
                  className="w-full"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Rotate: {rotate}°
                </label>
                <input
                  type="range"
                  min="0"
                  max="360"
                  value={rotate}
                  onChange={(e) => setRotate(parseInt(e.target.value))}
                  className="w-full"
                />
              </div>
            </div>
            
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => {
                  setShowAvatarEditor(false);
                  setAvatarFile(null);
                }}
                className="px-4 py-2 bg-gray-300 dark:bg-dark-400 text-gray-800 dark:text-white rounded-lg hover:bg-gray-400 dark:hover:bg-dark-500 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveAvatar}
                className="px-4 py-2 bg-[#FF4500] text-white rounded-lg hover:bg-[#E03E00] transition"
              >
                Save Avatar
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default Profile;