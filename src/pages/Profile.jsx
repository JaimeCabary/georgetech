// src/pages/Profile.jsx
import React, { useState } from 'react';
import Navbar from '../components/ui/Navbar';
import { useAuth } from '../contexts/AuthContext';
import CustomIcon from '../components/ui/FontAwesomeIcon';

const Profile = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('personal');

  const userData = {
    name: user?.displayName || 'John Doe',
    email: user?.email || 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    address: '123 Tech Street, Silicon Valley, CA 94301',
    joinDate: 'January 15, 2023',
    orders: 12,
    totalSpent: 4567.89
  };

  return (
    <div className="min-h-screen bg-white dark:bg-dark-100">
      <Navbar />
      
      <div className="container mx-auto px-6 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="bg-white dark:bg-dark-200 rounded-lg shadow-md p-6 mb-6">
            <div className="flex items-center space-x-6">
              <div className="w-24 h-24 bg-gradient-to-r from-primary-dark to-secondary rounded-full flex items-center justify-center">
                <CustomIcon icon="fa-user" className="text-white text-4xl" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                  {userData.name}
                </h1>
                <p className="text-gray-600 dark:text-gray-300">{userData.email}</p>
                <p className="text-gray-500 dark:text-gray-400 text-sm mt-2">
                  Member since {userData.joinDate}
                </p>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="bg-white dark:bg-dark-200 rounded-lg shadow-md mb-6">
            <div className="flex border-b border-gray-200 dark:border-gray-700">
              {['personal', 'security', 'notifications', 'preferences'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-4 font-medium text-sm capitalize ${
                    activeTab === tab
                      ? 'text-primary-dark border-b-2 border-primary-dark'
                      : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
                  }`}
                >
                  {tab.replace('-', ' ')}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="p-6">
              {activeTab === 'personal' && (
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Personal Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Full Name
                      </label>
                      <input
                        type="text"
                        defaultValue={userData.name}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-primary-dark focus:border-transparent dark:bg-dark-300 dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Email Address
                      </label>
                      <input
                        type="email"
                        defaultValue={userData.email}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-primary-dark focus:border-transparent dark:bg-dark-300 dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        defaultValue={userData.phone}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-primary-dark focus:border-transparent dark:bg-dark-300 dark:text-white"
                      />
                    </div>
                  </div>
                  <button className="bg-primary-dark text-white px-6 py-2 rounded-md hover:bg-primary-light transition-colors">
                    Save Changes
                  </button>
                </div>
              )}

              {activeTab === 'security' && (
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Security Settings
                  </h3>
                  <div className="space-y-4">
                    <div className="p-4 bg-gray-50 dark:bg-dark-300 rounded-md">
                      <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                        Change Password
                      </h4>
                      <div className="space-y-3">
                        <input
                          type="password"
                          placeholder="Current Password"
                          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-dark-200 dark:text-white"
                        />
                        <input
                          type="password"
                          placeholder="New Password"
                          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-dark-200 dark:text-white"
                        />
                        <input
                          type="password"
                          placeholder="Confirm New Password"
                          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-dark-200 dark:text-white"
                        />
                      </div>
                      <button className="mt-3 bg-primary-dark text-white px-4 py-2 rounded-md text-sm hover:bg-primary-light">
                        Update Password
                      </button>
                    </div>

                    <div className="p-4 bg-gray-50 dark:bg-dark-300 rounded-md">
                      <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                        Two-Factor Authentication
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                        Add an extra layer of security to your account
                      </p>
                      <button className="bg-primary-dark text-white px-4 py-2 rounded-md text-sm hover:bg-primary-light">
                        Enable 2FA
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;