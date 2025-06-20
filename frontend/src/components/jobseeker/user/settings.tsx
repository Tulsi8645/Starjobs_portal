import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

const UserSettings = () => {
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [notifications, setNotifications] = useState({
    allNotifications: true,
    newInternship: true,
    newEvent: true,
    applicationInvitation: true,
    jobMatched: true,
    preferredJob: true
  });

  const handleNotificationChange = (key: keyof typeof notifications) => {
    setNotifications(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50 overflow-auto p-6" style={{ maxHeight: 'calc(100vh - 50px)' }}>
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm p-8">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-2xl font-bold">Settings</h1>
            <div className="flex items-center space-x-3">
              <img
                src="https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=32&h=32&dpr=1"
                alt="Profile"
                className="w-8 h-8 rounded-full"
              />
              <span>Seth Prajapati</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Password Change Section */}
            <div>
              <h2 className="text-lg font-semibold mb-4">Change your Password</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-gray-600 mb-1">
                    Enter your old password
                  </label>
                  <div className="relative">
                    <input
                      type={showOldPassword ? 'text' : 'password'}
                      className="w-full px-3 py-2 border rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => setShowOldPassword(!showOldPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                    >
                      {showOldPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-gray-600 mb-1">
                    Enter your new password
                  </label>
                  <div className="relative">
                    <input
                      type={showNewPassword ? 'text' : 'password'}
                      className="w-full px-3 py-2 border rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                    >
                      {showNewPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-gray-600 mb-1">
                    Confirm your password
                  </label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      className="w-full px-3 py-2 border rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                    >
                      {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                </div>

                <button className="w-full bg-primary text-white py-2 rounded-lg hover:bg-primary/90">
                  Save Changes
                </button>
              </div>
            </div>

            {/* Notification Settings */}
            <div>
              <h2 className="text-lg font-semibold mb-4">Notification Setting</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span>All notifications</span>
                  <button
                    onClick={() => handleNotificationChange('allNotifications')}
                    className={`w-12 h-6 rounded-full transition-colors duration-200 ${
                      notifications.allNotifications ? 'bg-primary' : 'bg-gray-300'
                    }`}
                  >
                    <div
                      className={`w-4 h-4 bg-white rounded-full transform transition-transform duration-200 ${
                        notifications.allNotifications ? 'translate-x-7' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <span>Notify me on new internship post</span>
                  <button
                    onClick={() => handleNotificationChange('newInternship')}
                    className={`w-12 h-6 rounded-full transition-colors duration-200 ${
                      notifications.newInternship ? 'bg-primary' : 'bg-gray-300'
                    }`}
                  >
                    <div
                      className={`w-4 h-4 bg-white rounded-full transform transition-transform duration-200 ${
                        notifications.newInternship ? 'translate-x-7' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <span>Notify me on new event post</span>
                  <button
                    onClick={() => handleNotificationChange('newEvent')}
                    className={`w-12 h-6 rounded-full transition-colors duration-200 ${
                      notifications.newEvent ? 'bg-primary' : 'bg-gray-300'
                    }`}
                  >
                    <div
                      className={`w-4 h-4 bg-white rounded-full transform transition-transform duration-200 ${
                        notifications.newEvent ? 'translate-x-7' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <span>Notify me on application invitation</span>
                  <button
                    onClick={() => handleNotificationChange('applicationInvitation')}
                    className={`w-12 h-6 rounded-full transition-colors duration-200 ${
                      notifications.applicationInvitation ? 'bg-primary' : 'bg-gray-300'
                    }`}
                  >
                    <div
                      className={`w-4 h-4 bg-white rounded-full transform transition-transform duration-200 ${
                        notifications.applicationInvitation ? 'translate-x-7' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <span>Notify me on job matched internship</span>
                  <button
                    onClick={() => handleNotificationChange('jobMatched')}
                    className={`w-12 h-6 rounded-full transition-colors duration-200 ${
                      notifications.jobMatched ? 'bg-primary' : 'bg-gray-300'
                    }`}
                  >
                    <div
                      className={`w-4 h-4 bg-white rounded-full transform transition-transform duration-200 ${
                        notifications.jobMatched ? 'translate-x-7' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <span>Notify me on preferred job</span>
                  <button
                    onClick={() => handleNotificationChange('preferredJob')}
                    className={`w-12 h-6 rounded-full transition-colors duration-200 ${
                      notifications.preferredJob ? 'bg-primary' : 'bg-gray-300'
                    }`}
                  >
                    <div
                      className={`w-4 h-4 bg-white rounded-full transform transition-transform duration-200 ${
                        notifications.preferredJob ? 'translate-x-7' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Danger Zone */}
          <div className="mt-8 pt-8 border-t">
            <h2 className="text-lg font-semibold text-red-600 mb-4">Danger Zone</h2>
            <div>
              <h3 className="font-medium mb-2">Deactivate Account</h3>
              <p className="text-gray-600 mb-4">
                Once you deactivate this account, there is no going back. Please be certain.
              </p>
              <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">
                Deactivate Account
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserSettings;