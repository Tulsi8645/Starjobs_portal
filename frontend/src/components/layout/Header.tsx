import React, { useState, useEffect } from 'react';
import { Menu, Home, BriefcaseIcon, Info, FileText } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import StarLogo from '../../assets/star 1.svg';

const Header: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(() => !!localStorage.getItem('token'));
  const location = useLocation();


  useEffect(() => {
    const checkAuth = () => setIsLoggedIn(!!localStorage.getItem('token'));
    window.addEventListener('authChange', checkAuth);
    return () => window.removeEventListener('authChange', checkAuth);
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen((open) => !open);
  };

  const navItems = [
    { name: 'Home', icon: <Home size={22} />, path: '/' },
    { name: 'Job Listings', icon: <BriefcaseIcon size={22} />, path: '/jobs' },
    { name: 'Resume Builder', icon: <FileText  size={22} />, path: '/resume' },
    { name: 'About Us', icon: <Info size={22} />, path: '/about' },
  ];

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center">
          <Link to="/">
            <img src={StarLogo} alt="Logo" className="h-14 w-auto" />
          </Link>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-6">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.name}
                to={item.path}
                className={`flex items-center px-3 py-1 rounded-md text-md font-medium transition duration-200 ${isActive ? 'bg-primary text-white' : 'text-brown hover:text-primary'
                  }`}
              >
                <span className="mr-1">{item.icon}</span>
                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* Right Side Buttons */}
        <div className="flex items-center space-x-3">
          {!isLoggedIn ? (
            <>
              <Link to="/login" className="text-brown hover:text-primary text-md">
                Login
              </Link>
              <Link
                to="/signup"
                className="bg-brown text-white bg-primary px-4 py-1.5 rounded-md text-md font-medium hover:bg-primary"
              >
                Register
              </Link>
            </>
          ) : (
            <button
              onClick={toggleSidebar}
              className="text-gray-600 hover:text-primary transition-colors duration-200"
              aria-label="Toggle menu"
            >
              <Menu size={24} />
            </button>
          )}
        </div>
      </div>

      {/* Sidebar (only if logged in) */}
      {isLoggedIn && (
        <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      )}
    </header>
  );
};

export default Header;
