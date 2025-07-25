import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Clock, BriefcaseIcon } from 'lucide-react';
import { fetchTrendingJobs } from '../jobseekerApi/api'; 


interface Job {
  _id: string;
  title: string;
  location: string;
  jobtype: string;
  status: string;
  salary: string;
  experience: string;
  level: string;
  deadline: string;
  istrending: boolean;
  openings: number;
  description: string;
  likeCount: number;
  dislikeCount: number;
  jobseekers: any[];
  jobcategory: string;
  createdAt: string;
  updatedAt?: string;
  employer?: {
    _id: string;
    name: string;
    email?: string;
    companyLogo?: string;
  };
}


const MEDIA_URL = import.meta.env.VITE_MEDIA_URL || '';

const TrendingJobs: React.FC = () => {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getTrendingJobs = async () => {
      try {
        const data = await fetchTrendingJobs();
        setJobs(data);
      } catch (error) {
        console.error('Failed to fetch trending jobs:', error);
      } finally {
        setLoading(false);
      }
    };

    getTrendingJobs();
  }, []);

  if (loading) {
    return <div className="text-center py-12">Loading trending jobs...</div>;
  }

  return (
    <div className="bg-secondary py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold text-center mb-8">Trending Jobs Currently</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobs.map((job) => {
            const deadline = new Date(job.deadline);
            const daysLeft = Math.max(0, Math.ceil((deadline.getTime() - Date.now()) / (1000 * 60 * 60 * 24)));

            return (
              <div key={job._id} className="bg-white rounded-lg shadow-card hover:shadow-card-hover transition-shadow duration-200 overflow-hidden">
                <div className="p-6 flex flex-col justify-between h-full">
                  <div>
                    <div className="flex items-start mb-4">
                      {job.employer?.companyLogo ? (
                        <img
                          src={`${MEDIA_URL.replace(/\/$/, '')}/${job.employer.companyLogo.replace(/^\//, '')}`}
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
                    <button onClick={() => navigate(`/job/${job._id}`)} className="bg-primary text-white py-2 px-6 rounded-md hover:bg-primary/90 transition-colors duration-200">
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
