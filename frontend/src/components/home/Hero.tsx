import React from 'react';
import { Search, SlidersHorizontal } from 'lucide-react';
import { popularJobs } from '../../utils/mockData';

const Hero: React.FC = () => {
  return (
    <div className="bg-primary text-white py-16 md:py-20">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">Welcome.</h1>
        <p className="text-xl md:text-2xl mb-8">Best portal to find jobs of your choice.</p>
        
        <div className="max-w-3xl mx-auto">
          <div className="flex flex-col md:flex-row gap-3">
            <div className="relative flex-grow">
              <input 
                type="text" 
                placeholder="Search for jobs or internship" 
                className="w-full p-3 pl-10 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            </div>
            <button className="bg-secondary text-primary p-3 rounded-lg hover:bg-opacity-90 transition-colors duration-200">
              <SlidersHorizontal size={20} />
            </button>
          </div>
          
          <div className="mt-4 flex flex-wrap justify-center gap-2">
            <span className="text-white/80 mr-2">Popular Jobs:</span>
            {popularJobs.map((job, index) => (
              <a 
                key={index} 
                href={`/jobs?q=${job}`} 
                className="text-white hover:underline text-sm hover:text-white/90 transition-colors duration-200"
              >
                {job}{index < popularJobs.length - 1 && ","}&nbsp;
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;