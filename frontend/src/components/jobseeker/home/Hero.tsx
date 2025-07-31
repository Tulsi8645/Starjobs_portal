import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, SlidersHorizontal } from 'lucide-react';

const Hero: React.FC = () => {
  const navigate = useNavigate();
  const [searchInput, setSearchInput] = useState('');
  const staticPopularJobs = [
    'Frontend Developer',
    'QA Engineer',
    'UI/UX Designer',
    'Data Analyst',
  ];

  const handleSearch = () => {
    const trimmedQuery = searchInput.trim();
    if (trimmedQuery) {
      navigate(`/jobs?q=${encodeURIComponent(trimmedQuery)}`);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handlePopularJobClick = (job: string) => {
    navigate(`/jobs?q=${encodeURIComponent(job)}`);
  };

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
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                onKeyDown={handleKeyDown}
                className="w-full p-3 pl-10 pr-10 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-primary"
              />
              {/* Left icon */}
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />

              {/* Right icon */}
              <button
                onClick={handleSearch}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-primary hover:opacity-80 transition-colors duration-200"
              >
                <SlidersHorizontal size={20} />
              </button>
            </div>
          </div>

          <div className="mt-4 flex flex-wrap justify-center gap-2">
            <span className="text-white/80 mr-2">Popular Jobs:</span>
            {staticPopularJobs.map((job, index) => (
              <button
                key={index}
                onClick={() => handlePopularJobClick(job)}
                className="text-white hover:underline text-sm hover:text-white/90 transition-colors duration-200 bg-transparent border-none p-0"
              >
                {job}{index < staticPopularJobs.length - 1 && ","}&nbsp;
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
