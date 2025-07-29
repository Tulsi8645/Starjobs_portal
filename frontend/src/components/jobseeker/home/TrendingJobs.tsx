import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { MapPin, Clock, BriefcaseIcon } from 'lucide-react';
import { fetchTrendingJobs, Job } from '../jobseekerApi/api';

const MEDIA_URL = import.meta.env.VITE_MEDIA_URL || '';

const TrendingJobs: React.FC = () => {
  const navigate = useNavigate();

  const { data: jobs = [], isLoading, isError } = useQuery<Job[]>({
    queryKey: ['trendingJobs'],
    queryFn: fetchTrendingJobs,
  });

  if (isLoading) {
    return (
      <div className="flex bg-secondary justify-center items-center py-20">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="ml-6 text-gray-600">Loading Trending Jobs...</p>
      </div>
    );
  }

  if (isError) {
    return <p className="text-center text-red-500 py-10">Failed to load trending jobs.</p>;
  }

  return (
    <div className="bg-secondary py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold text-center mb-8">Trending Jobs</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobs.map((job: Job) => {
            const deadline = new Date(job.deadline);
            const daysLeft = Math.max(
              0,
              Math.ceil((deadline.getTime() - Date.now()) / (1000 * 60 * 60 * 24))
            );

            return (
              <div
                key={job._id}
                className="bg-white rounded-lg shadow-card hover:shadow-card-hover transition-shadow duration-200 overflow-hidden"
              >
                <div className="p-6 flex flex-col justify-between h-full">
                  <div>
                    <div className="flex items-start mb-4">
                      {job.employer?.companyLogo ? (
                        <img
                          src={`${MEDIA_URL.replace(/\/$/, '')}/${job.employer.companyLogo.replace(
                            /^\//,
                            ''
                          )}`}
                          alt={`${job.employer.name} Logo`}
                          className="w-16 h-16 rounded-full object-cover bg-gray-100"
                        />
                      ) : (
                        <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 text-xl font-semibold">
                          {job.employer?.name?.[0]}
                        </div>
                      )}
                      <div className="ml-4 flex-grow">
                        <h3 className="font-semibold text-lg">{job.title}</h3>
                        <p className="text-primary">{job.employer?.name}</p>
                      </div>
                    </div>

                    <div className="space-y-2 mb-4">
                      <div className="flex items-center text-gray-500">
                        <MapPin size={16} className="mr-2" />
                        <span className="text-sm">{job.location}</span>
                      </div>
                      <div className="flex items-center text-gray-500">
                        <Clock size={16} className="mr-2" />
                        <span className="text-sm">{daysLeft} Days left</span>
                      </div>
                      <div className="flex items-center text-gray-500">
                        <BriefcaseIcon size={16} className="mr-2" />
                        <span className="text-sm">{job.jobtype}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end mt-4">
                    <button
                      onClick={() => navigate(`/job/${job._id}`)}
                      className="bg-primary text-white py-2 px-6 rounded-md hover:bg-primary/90 transition-colors duration-200"
                    >
                      View details
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TrendingJobs;
