import logo from '../../../assets/star 1.svg';
import { Link, useLocation, Outlet } from 'react-router-dom';
import { LayoutDashboard, Users, FileText, Settings } from 'lucide-react';

const UserDashboardLayout = () => {
  const location = useLocation();

  const menuItems = [
    
    { path: '/user/profile', icon: <Users size={20} />, label: 'PROFILE' },
    { path: '/user/dashboard', icon: <LayoutDashboard size={20} />, label: 'DASHBOARD' },
    { path: '/user/savedjobs', icon: <FileText size={20} />, label: 'Saved Jobs' },
    { path: '/user/settings', icon: <Settings size={20} />, label: 'Settings' }
    
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      <aside className="w-64 bg-white border-r">
        <div className="p-4 border-b">
          <div className="flex items-center">
            <img src={logo} alt="Logo" className="w-30 h-30 mr-2" />
          </div>
        </div>
        <nav className="p-4">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center space-x-3 px-4 py-3 rounded-lg mb-1 ${
                location.pathname === item.path
                  ? 'bg-primary text-white '
                  : 'text-gray-600 text-bold hover:bg-gray-100'
              }`}
            >
              {item.icon}
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>
      </aside>
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
};

export default UserDashboardLayout;
