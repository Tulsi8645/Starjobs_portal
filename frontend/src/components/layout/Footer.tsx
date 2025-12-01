import React from 'react';
import StarFooter from '../../assets/quickjobs.png';
import { Home, User, BriefcaseIcon, Linkedin, Facebook, Twitter } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

interface DecodedToken {
  id: string;
  role: 'jobseeker' | 'employer' | 'admin';
  exp: number;
}

const Footer: React.FC = () => {
  const navigate = useNavigate();

  // Check authentication and role
  const token = localStorage.getItem('token');
  let role: string | null = null;
  let isAuthenticated = false;

  if (token) {
    try {
      const decoded = jwtDecode<DecodedToken>(token);
      // Check if token expired
      if (decoded.exp * 1000 > Date.now()) {
        isAuthenticated = true;
        role = decoded.role;
      }
    } catch (error) {
      console.error('Invalid token', error);
    }
  }

  const handleProtectedNavigation = (path: string, allowedRole: string) => {
    if (isAuthenticated && role === allowedRole) {
      navigate(path);
    } else {
      alert('Access denied. Please log in with the correct account.');
    }
  };

  return (
    <footer className="bg-primary text-white py-12">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="mb-4 flex items-center">
              <img src={StarFooter} alt="Logo" className="h-28 w-auto" />
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li
                className="text-white hover:text-white flex items-center cursor-pointer"
                onClick={() => navigate('/')}
              >
                <Home size={16} className="mr-2" />
                Home
              </li>
              <li
                className="text-white hover:text-white flex items-center cursor-pointer"
                onClick={() => navigate('/jobs')}
              >
                <BriefcaseIcon size={16} className="mr-2" />
                Job Listings
              </li>
              <li
                className="text-white hover:text-white flex items-center cursor-pointer"
                onClick={() => navigate('/about')}
              >
                <User size={16} className="mr-2" />
                About Us
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">For Job Seekers</h3>
            <ul className="space-y-2">
              <li
                className="text-white hover:text-white cursor-pointer"
                onClick={() => navigate('/resume')}
              >
                Build your CV
              </li>
              <li
                className="text-white hover:text-white cursor-pointer"
                onClick={() => navigate('/jobs')}
              >
                Find Jobs
              </li>
              <li
                className="text-white hover:text-white cursor-pointer"
                onClick={() => handleProtectedNavigation('/user/dashboard', 'jobseeker')}
              >
                Jobseeker Dashboard
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">For Job Provider</h3>
            <ul className="space-y-2">
              <li
                className="text-white hover:text-white cursor-pointer"
                onClick={() => handleProtectedNavigation('/employer/postjob', 'employer')}
              >
                Post Jobs
              </li>
              <li
                className="text-white hover:text-white cursor-pointer"
                onClick={() => handleProtectedNavigation('/employer/insight', 'employer')}
              >
                Insights
              </li>
              <li
                className="text-white hover:text-white cursor-pointer"
                onClick={() => handleProtectedNavigation('/employer/dashboard', 'employer')}
              >
                Employer Dashboard
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-white flex flex-col md:flex-row justify-between items-center">
          <p className="text-white text-sm">© 2025 Star Euro Group. All rights reserved.</p>

          <div className="flex space-x-4 mt-4 md:mt-0">
            <span
              className="text-white hover:text-white transition-colors duration-200 cursor-pointer"
              onClick={() => window.open('#', '_blank')}
            >
              <Linkedin size={20} />
            </span>
            <span
              className="text-white hover:text-white transition-colors duration-200 cursor-pointer"
              onClick={() => window.open('#', '_blank')}
            >
              <Facebook size={20} />
            </span>
            <span
              className="text-white hover:text-white transition-colors duration-200 cursor-pointer"
              onClick={() => window.open('#', '_blank')}
            >
              <Twitter size={20} />
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
