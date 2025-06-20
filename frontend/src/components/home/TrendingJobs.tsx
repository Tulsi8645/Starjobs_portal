import React from 'react';
import { MapPin, Clock, BriefcaseIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { jobs } from '../../utils/mockData';

const TrendingJobs: React.FC = () => {

  const navigate = useNavigate(); 
  return (
    <div className="bg-secondary py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold text-center mb-8">Trending Jobs currently</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobs.slice(0, 3).map((job) => (
            <div key={job.id} className="bg-white rounded-lg shadow-card hover:shadow-card-hover transition-shadow duration-200 overflow-hidden">
              <div className="p-6 flex flex-col justify-between h-full"> {/* Added flex utilities */}
                <div> {/* Wrap top content */}
                  <div className="flex items-start mb-4">
                    <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
                      <img
                        src={job.companyLogo}
                        alt={job.company}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="ml-4 flex-grow">
                      <h3 className="font-semibold text-lg">{job.title}</h3>
                      <p className="text-primary">{job.company}</p>
                    </div>
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-gray-500">
                      <MapPin size={16} className="mr-2" />
                      <span className="text-sm">{job.location}</span>
                    </div>
                    <div className="flex items-center text-gray-500">
                      <Clock size={16} className="mr-2" />
                      <span className="text-sm">{job.daysLeft} Days left</span>
                    </div>
                    <div className="flex items-center text-gray-500">
                      <BriefcaseIcon size={16} className="mr-2" />
                      <span className="text-sm">{job.type}</span>
                    </div>
                  </div>
                </div>

                {/* Button container to push it to the right */}
                <div className="flex justify-end mt-4"> {/* Use flex and justify-end */}
                  <button
                     className="bg-primary text-white py-2 px-6 rounded-md hover:bg-primary/90 transition-colors duration-200"
                     onClick={() => navigate(`/job/jobdetails`)}
                   >
                     Apply now
                   </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TrendingJobs;