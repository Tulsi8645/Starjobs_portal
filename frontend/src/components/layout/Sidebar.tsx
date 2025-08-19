import React, { useState } from 'react';
import {Link, useNavigate } from 'react-router-dom';
import {
  X,
  User,
  LayoutDashboard,
  Bookmark,
  Settings,
  LogOut,
  BookOpen,
  PlusCircle
} from 'lucide-react';

interface SidebarItem {
  id: string;
  name: string;
  icon: React.ReactNode;
  path: string;
}

const sidebarItems: SidebarItem[] = [
  { id: '1', name: 'Profile', icon: <User size={24} />, path: '/user/profile' },
  { id: '2', name: 'Dashboard', icon: <LayoutDashboard size={24} />, path: '/user/dashboard' },
  { id: '3', name: 'Saved Jobs', icon: <Bookmark size={24} />, path: '/user/savedjobs' },
  { id: '4', name: 'My Blogs', icon: <BookOpen size={24} />, path: '/blog?user=true' },
  { id: '5', name: 'Create Blog', icon: <PlusCircle size={24} />, path: '/blog/create' },
  { id: '6', name: 'Settings', icon: <Settings size={24} />, path: '/user/settings' },
  { id: '7', name: 'Logout', icon: <LogOut size={24} />, path: '/logout' }
];

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear auth token from localStorage
    localStorage.removeItem('token');
    window.dispatchEvent(new Event('authChange'));
    setShowLogoutModal(false);
    onClose();
    navigate('/');
  };


  return (
    <div className={`fixed inset-0 z-50 transform ${isOpen ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-300 ease-in-out`}>
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={onClose}></div>

      <div className="absolute right-0 top-0 h-full w-64 md:w-80 bg-white shadow-lg">
        <div className="p-4 border-b flex justify-between items-center">
          <h2 className="text-xl font-semibold text-primary">Menu</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-primary" aria-label="Close menu">
            <X size={24} />
          </button>
        </div>

        <nav className="p-4">
          <ul className="space-y-2">
            {sidebarItems.map((item) => (
              <li key={item.id}>
                {item.name === 'Logout' ? (
                  <button
                    onClick={() => setShowLogoutModal(true)}
                    className="w-full flex items-center p-3 text-gray-600 hover:text-primary hover:bg-secondary rounded-lg transition-colors duration-200"
                  >
                    <span className="mr-3 text-primary">{item.icon}</span>
                    <span className="font-medium">{item.name}</span>
                  </button>
                ) : (
                    <Link
                      to={item.path}
                      onClick={onClose}
                      className="flex items-center p-3 text-gray-600 hover:text-primary hover:bg-secondary rounded-lg transition-colors duration-200"
                    >
                      <span className="mr-3 text-primary">{item.icon}</span>
                      <span className="font-medium">{item.name}</span>
                    </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {showLogoutModal && (
        <div className="fixed inset-0 z-10000 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-6 shadow-lg w-80">
            <h2 className="text-lg font-semibold mb-4 text-center">
              Are you sure you want to logout?
            </h2>
            <div className="flex justify-center space-x-3">
              <button
                onClick={() => setShowLogoutModal(false)}
                className="px-4 py-2 bg-gray-200 text-primary rounded hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-primary text-white rounded hover:bg-red-600"
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

export default Sidebar;
