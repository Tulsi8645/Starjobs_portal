import React from 'react';
import StarFooter from '../../assets/star 2.svg';
import { Home, User, BriefcaseIcon, Linkedin, Facebook, Twitter } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-dark text-white py-12">
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
              <li>
                <a href="/" className="text-gray-300 hover:text-white flex items-center">
                  <Home size={16} className="mr-2" />
                  Home
                </a>
              </li>
              <li>
                <a href="/candidate" className="text-gray-300 hover:text-white flex items-center">
                  <User size={16} className="mr-2" />
                  Candidate
                </a>
              </li>
              <li>
                <a href="/jobs" className="text-gray-300 hover:text-white flex items-center">
                  <BriefcaseIcon size={16} className="mr-2" />
                  Job Listings
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">For Job Seekers</h3>
            <ul className="space-y-2">
              <li>
                <a href="/build-cv" className="text-gray-300 hover:text-white">
                  Build your CV and Profile
                </a>
              </li>
              <li>
                <a href="/find-jobs" className="text-gray-300 hover:text-white">
                  Find Jobs
                </a>
              </li>
              <li>
                <a href="/dashboard" className="text-gray-300 hover:text-white">
                  Employee Dashboard
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">For Job Provider</h3>
            <ul className="space-y-2">
              <li>
                <a href="/post-jobs" className="text-gray-300 hover:text-white">
                  Post Jobs
                </a>
              </li>
              <li>
                <a href="/reports" className="text-gray-300 hover:text-white">
                  View Report
                </a>
              </li>
              <li>
                <a href="/employer-dashboard" className="text-gray-300 hover:text-white">
                  Employer Dashboard
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-gray-700 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">© 2025 Star Euro Group. All rights reserved.</p>
          
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
              <Linkedin size={20} />
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
              <Facebook size={20} />
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
              <Twitter size={20} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;