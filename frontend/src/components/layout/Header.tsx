import React, { useState, useEffect, useRef } from 'react';
import { Menu, Home, BriefcaseIcon, Info, FileText, BookOpen, ChevronDown, SparkleIcon } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import StarLogo from '../../assets/quickjobs.png';
import { jwtDecode } from 'jwt-decode';


interface DecodedToken {
  id: string;
  role: 'jobseeker' | 'employer' | 'admin';
  exp: number;
}

const Header: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isJobsDropdownOpen, setIsJobsDropdownOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(() => !!localStorage.getItem('token'));
  const location = useLocation();
  const navigate = useNavigate();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const jobCategories = [
    'Accounting / Finance',
    'Architecture / Interior Designing',
    'Banking / Insurance / Financial Services',
    'Commercial / Logistics / Supply Chain',
    'Construction / Engineering / Architects',
    'Creative / Graphics / Designing',
    'Education Counseling / Career Counseling',
    'Fashion / Textile Designing',
    'General Mgmt. / Administration / Operation',
    'Healthcare / Pharma / Biotech / Medical',
    'Hospitality',
    'Human Resource / Org. Development',
    'IT & Telecommunication',
    'Journalism / Editor / Media',
    'Legal Services',
    'Marketing / Advertising / Customer Service',
    'NGO / INGO / Social work',
    'Production / Maintenance / Quality',
    'Research and Development',
    'Sales / Public Relations',
    'Secretarial / Frontdesk Officer / Data-Entry',
    'Teaching / Education',
    'Others',
  ];


  const handleCategoryClick = (categoryName: string) => {
    const query = encodeURIComponent(categoryName);
    navigate(`/jobs?q=${query}`);
    setIsJobsDropdownOpen(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsJobsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const checkAuth = () => setIsLoggedIn(!!localStorage.getItem('token'));
    window.addEventListener('authChange', checkAuth);
    return () => window.removeEventListener('authChange', checkAuth);
  }, []);

  const toggleSidebar = () => {
    const token = localStorage.getItem('token');

    if (token) {
      try {
        const decoded: DecodedToken = jwtDecode(token);
        const role = decoded.role;

        if (role === 'employer') {
          navigate('/employer/profile');
        } else if (role === 'admin') {
          navigate('/admin/dashboard');
        } else if (role === 'jobseeker') {
          setIsSidebarOpen((open) => !open);
        }
      } catch (error) {
        console.error('Invalid token format', error);
      }
    }
  };

  const navItems = [
    { name: 'Home', icon: <Home size={22} />, path: '/' },
    { name: 'Job Listings', icon: <BriefcaseIcon size={22} />, path: '/jobs' },
    // { name: 'Feeds', icon: <BookOpen size={22} />, path: '/blog' },
    { name: 'Resume Builder', icon: <FileText size={22} />, path: '/resume' },
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
            const isHome = item.path === '/';
            const isActive = isHome
              ? location.pathname === '/'
              : location.pathname.startsWith(item.path);

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

          {/* Browse Jobs Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsJobsDropdownOpen(!isJobsDropdownOpen)}
              className="flex items-center px-3 py-1 rounded-md text-md font-medium text-brown hover:text-primary transition duration-200"
            >
              <span className="mr-1"><SparkleIcon size={22} /></span>
              Browse Jobs
              <ChevronDown size={18} className="ml-1" />
            </button>

            {isJobsDropdownOpen && (
              <div className="fixed left-0 right-0 mt-2 bg-white shadow-lg p-4 z-50 w-full">
                <div className="container mx-auto">
                  <div className="px-2 py-1 text-sm text-gray-700 mb-2">
                    <p className="font-medium text-lg">Browse Job Categories</p>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                    {jobCategories.map((category) => (
                      <button
                        key={category}
                        onClick={() => handleCategoryClick(category)}
                        className="text-left px-3 py-1.5 text-md text-gray-700 hover:bg-primary hover:text-white rounded whitespace-nowrap"
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>


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

      {/* Sidebar (only for jobseeker) */}
      {isLoggedIn && isSidebarOpen && (
        <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      )}
    </header>
  );
};

export default Header;
