import logo from '../../../assets/star 1.svg';
import { Link, useLocation, Outlet, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Users, FileText, Settings, LogOut } from 'lucide-react';
import { useState } from 'react';

const UserDashboardLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.dispatchEvent(new Event('authChange'));
    setShowLogoutModal(false);
    navigate('/');
  };

  const menuItems = [
    { path: '/user/profile', icon: <Users size={20} />, label: 'PROFILE' },
    { path: '/user/dashboard', icon: <LayoutDashboard size={20} />, label: 'DASHBOARD' },
    { path: '/user/savedjobs', icon: <FileText size={20} />, label: 'Saved Jobs' },
    { path: '/user/settings', icon: <Settings size={20} />, label: 'Settings' }
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      <aside className="w-64 bg-white border-r flex flex-col">
        {/* Logo */}
        <div className="p-4 border-b">
          <div
            className="flex items-center cursor-pointer"
            onClick={() => navigate('/')}
          >
            <img src={logo} alt="Logo" className="w-30 h-30 mr-2" />
          </div>
        </div>

        {/* Navigation */}
        <nav className="p-4 flex-1">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center space-x-3 px-4 py-3 rounded-lg mb-1 ${location.pathname === item.path
                  ? 'bg-primary text-white'
                  : 'text-gray-600 font-semibold hover:bg-gray-100'
                }`}
            >
              {item.icon}
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>

        {/* Logout button at the bottom */}
        <div className="p-4 border-t">
          <button
            onClick={() => setShowLogoutModal(true)}
            className="flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-600 font-semibold hover:bg-red-600 hover:text-white w-full"
          >
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Logout Modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl max-w-sm w-full">
            <h2 className="text-lg font-semibold mb-4">Confirm Logout</h2>
            <p className="mb-4">Are you sure you want to log out?</p>
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setShowLogoutModal(false)}
                className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={handleLogout}
                className="px-3 py-1 rounded bg-red-500 text-white hover:bg-red-700 hover:text-white"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserDashboardLayout;
