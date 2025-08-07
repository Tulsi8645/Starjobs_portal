import { useState, useEffect } from 'react';
import { Eye } from 'lucide-react';
import { getAdminProfile, makeAnnouncement } from './adminApi/api';
import { changePassword } from '../auth/authApi/authApi';

const MEDIA_URL = import.meta.env.VITE_MEDIA_URL || "";

const AdminSettings = () => {
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const [user, setUser] = useState<{ name: string; profilePic: string } | null>(null);


  const [announcementMessage, setAnnouncementMessage] = useState('');
  const [announcementRole, setAnnouncementRole] = useState<'all' | 'jobseeker' | 'employer'>('all');
  const [announcementLoading, setAnnouncementLoading] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getAdminProfile();
        setUser({ name: data.name, profilePic: data.profilePic });
      } catch (err) {
        console.error('Error fetching user profile:', err);
      }
    };

    fetchProfile();
  }, []);

  const handleChangePassword = async () => {
    if (newPassword !== confirmPassword) {
      alert('New password and confirmation do not match');
      return;
    }

    try {
      setLoading(true);
      await changePassword({ currentPassword: oldPassword, newPassword });
      alert('Password updated successfully');
      setOldPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (err: any) {
      alert(err?.message || 'Failed to update password');
    } finally {
      setLoading(false);
    }
  };


  const handleMakeAnnouncement = async () => {
    if (!announcementMessage.trim()) {
      alert("Please enter an announcement message.");
      return;
    }

    try {
      setAnnouncementLoading(true);
      await makeAnnouncement({
        message: announcementMessage,
        targetRole: announcementRole,
      });
      alert("Announcement sent successfully.");
      setAnnouncementMessage('');
      setAnnouncementRole('all');
    } catch (err: any) {
      console.error(err);
      alert(err?.response?.data?.message || "Failed to send announcement.");
    } finally {
      setAnnouncementLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 overflow-auto p-6" style={{ maxHeight: 'calc(100vh - 50px)' }}>
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm p-8">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-2xl font-bold">Settings</h1>
            <div className="flex items-center space-x-3">
              {user?.profilePic ? (
                <img
                  src={`${MEDIA_URL.replace(/\/$/, "")}/${user.profilePic.replace(/^\//, "")}`}
                  alt={user.name}
                  className="w-8 h-8 rounded-full object-cover"
                />
              ) : (
                <span className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-300 text-3xl font-bold text-gray-500">
                  {user?.name?.charAt(0).toUpperCase() || 'U'}
                </span>
              )}
              <span>{user?.name || 'Loading...'}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Password Change Section */}
            <div>
              <h2 className="text-lg font-semibold mb-4">Change your Password</h2>
              <div className="space-y-4">
                {/* Old Password */}
                <div>
                  <label className="block text-sm text-gray-600 mb-1">
                    Enter your old password
                  </label>
                  <div className="relative">
                    <input
                      type={showOldPassword ? 'text' : 'password'}
                      value={oldPassword}
                      onChange={(e) => setOldPassword(e.target.value)}
                      className="w-full px-3 py-2 border rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => setShowOldPassword(!showOldPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                      aria-label="Toggle old password visibility"
                    >
                      <Eye size={20} />
                    </button>
                  </div>
                </div>

                {/* New Password */}
                <div>
                  <label className="block text-sm text-gray-600 mb-1">
                    Enter your new password
                  </label>
                  <div className="relative">
                    <input
                      type={showNewPassword ? 'text' : 'password'}
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="w-full px-3 py-2 border rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                      aria-label="Toggle new password visibility"
                    >
                      <Eye size={20} />
                    </button>
                  </div>
                </div>

                {/* Confirm Password */}
                <div>
                  <label className="block text-sm text-gray-600 mb-1">
                    Confirm your password
                  </label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="w-full px-3 py-2 border rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                      aria-label="Toggle confirm password visibility"
                    >
                      <Eye size={20} />
                    </button>
                  </div>
                </div>

                <button
                  onClick={handleChangePassword}
                  disabled={loading}
                  className="w-full bg-primary text-white py-2 rounded-lg hover:bg-primary/90"
                >
                  {loading ? 'Updating...' : 'Change Password'}
                </button>
              </div>
            </div>

            {/* General Announcement Section */}
            <div>
              <h2 className="text-lg font-semibold mb-4">Make General Announcements</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Target Audience</label>
                  <select
                    value={announcementRole}
                    onChange={(e) => setAnnouncementRole(e.target.value as any)}
                    className="w-full px-3 py-2 border rounded-lg"
                  >
                    <option value="all">All Users</option>
                    <option value="jobseeker">Jobseekers</option>
                    <option value="employer">Employers</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm text-gray-600 mb-1">Announcement Message</label>
                  <textarea
                    value={announcementMessage}
                    onChange={(e) => setAnnouncementMessage(e.target.value)}
                    rows={4}
                    className="w-full px-3 py-2 border rounded-lg"
                    placeholder="Write your message here..."
                  />
                </div>
                <div className="flex justify-end">
                  <button
                    onClick={handleMakeAnnouncement}
                    disabled={announcementLoading}
                    className="bg-primary p-4 text-white py-2 rounded-lg"
                  >
                    {announcementLoading ? 'Sending...' : 'Send Announcement'}
                  </button>
                </div>

              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSettings;
