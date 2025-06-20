import  { useState } from 'react';
import { Eye, EyeOff, Bell } from 'lucide-react';

const Settings = () => {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
     <div className="p-6 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 50px)' }} >
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Settings</h1>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <button className="p-2 relative">
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">
                2
              </span>
              <Bell size={20} />
            </button>
          </div>
          <div className="flex items-center space-x-2">
            <img
              src="https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=32&h=32&dpr=1"
              alt="Admin"
              className="w-8 h-8 rounded-full"
            />
            <span>Riya Neupane Admin</span>
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h2 className="text-lg font-semibold mb-4">Profile Information</h2>
          <div className="flex items-center space-x-4">
            <img
              src="https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=64&h=64&dpr=1"
              alt="Profile"
              className="w-16 h-16 rounded-full"
            />
            <div>
              <h3 className="font-medium">Azmart Mart</h3>
              <p className="text-sm text-gray-500">Super Administrator</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h2 className="text-lg font-semibold mb-4">Email Settings</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-gray-600 mb-1">
                Current Email
              </label>
              <p className="text-gray-800">azmart123@gmail.com</p>
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">
                New Email
              </label>
              <input
                type="email"
                className="w-full px-3 py-2 border rounded-lg"
                placeholder="Enter new email"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">
                Confirm New Email
              </label>
              <input
                type="email"
                className="w-full px-3 py-2 border rounded-lg"
                placeholder="Confirm new email"
              />
            </div>
            <button className="px-4 py-2 bg-primary text-white rounded-lg">
              Update email
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h2 className="text-lg font-semibold mb-4">Password Settings</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-gray-600 mb-1">
                Current Password
              </label>
              <div className="relative">
                <input
                  type={showCurrentPassword ? 'text' : 'password'}
                  className="w-full px-3 py-2 border rounded-lg pr-10"
                  placeholder="Enter current password"
                />
                <button
                  type="button"
                  onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2"
                >
                  {showCurrentPassword ? (
                    <EyeOff size={20} className="text-gray-400" />
                  ) : (
                    <Eye size={20} className="text-gray-400" />
                  )}
                </button>
              </div>
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">
                New Password
              </label>
              <div className="relative">
                <input
                  type={showNewPassword ? 'text' : 'password'}
                  className="w-full px-3 py-2 border rounded-lg pr-10"
                  placeholder="Enter new password"
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2"
                >
                  {showNewPassword ? (
                    <EyeOff size={20} className="text-gray-400" />
                  ) : (
                    <Eye size={20} className="text-gray-400" />
                  )}
                </button>
              </div>
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">
                Confirm New Password
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  className="w-full px-3 py-2 border rounded-lg pr-10"
                  placeholder="Confirm new password"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2"
                >
                  {showConfirmPassword ? (
                    <EyeOff size={20} className="text-gray-400" />
                  ) : (
                    <Eye size={20} className="text-gray-400" />
                  )}
                </button>
              </div>
            </div>
            <button className="px-4 py-2 bg-primary text-white rounded-lg">
              Change Password
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-lg font-semibold">Two-Factor Authentication</h2>
              <p className="text-sm text-gray-500">
                Add an extra layer to your account
              </p>
            </div>
            <button className="px-4 py-2 bg-primary text-white rounded-lg">
              Enable 2FA
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;